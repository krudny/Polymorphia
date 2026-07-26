package com.polymorphia.codeexecutor

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.api.async.ResultCallback
import com.github.dockerjava.api.model.Frame
import com.github.dockerjava.api.model.HostConfig
import com.github.dockerjava.api.model.PullResponseItem
import com.github.dockerjava.api.model.StreamType
import com.github.dockerjava.api.model.WaitResponse
import org.apache.commons.compress.archivers.tar.TarArchiveEntry
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream
import org.springframework.stereotype.Component
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.util.concurrent.TimeUnit

private const val WORK_DIR = "/app"
private const val STDIN_FILE = "input.txt"
private const val DEFAULT_WALL_TIME_LIMIT_MS = 30_000
private const val DEFAULT_MEMORY_LIMIT_MB = 256
private const val FILE_MODE = 493

@Component
class DockerExecutor(private val docker: DockerClient) {

    fun execute(request: ExecuteRequest): ExecutionResult {
        val language = request.language
        ensureImage(language.image)

        val wallTimeLimitMs = request.wallTimeLimitMs ?: DEFAULT_WALL_TIME_LIMIT_MS
        val memoryLimitMb = request.memoryLimitMb ?: DEFAULT_MEMORY_LIMIT_MB

        val id = docker.createContainerCmd(language.image)
            .withWorkingDir(WORK_DIR)
            .withEntrypoint("sh", "-c")
            .withCmd(buildShellCommand(language, request.stdin != null))
            .withHostConfig(buildHostConfig(memoryLimitMb, request.cpuTimeLimitMs))
            .withNetworkDisabled(true)
            .exec()
            .id

        try {
            copySources(id, language, request)
            return runContainer(id, wallTimeLimitMs)
        } finally {
            docker.removeContainerCmd(id).withForce(true).exec()
        }
    }

    private fun buildShellCommand(language: SupportedLanguage, hasStdin: Boolean): String {
        val command = language.command.joinToString(" ")
        return if (hasStdin) "$command < $WORK_DIR/$STDIN_FILE" else command
    }

    private fun buildHostConfig(memoryLimitMb: Int, cpuTimeLimitMs: Int?): HostConfig {
        val hostConfig = HostConfig.newHostConfig()
            .withMemory(memoryLimitMb * 1024L * 1024L)
            .withMemorySwap(memoryLimitMb * 1024L * 1024L)
            .withPidsLimit(128L)
            .withReadonlyRootfs(false)

        if (cpuTimeLimitMs != null) {
            hostConfig.withCpuPeriod(100_000L).withCpuQuota(100_000L)
        }
        return hostConfig
    }

    private fun copySources(containerId: String, language: SupportedLanguage, request: ExecuteRequest) {
        val files = buildMap {
            put(language.fileName, request.sourceCode.toByteArray())
            request.stdin?.let { put(STDIN_FILE, it.toByteArray()) }
        }

        docker.copyArchiveToContainerCmd(containerId)
            .withTarInputStream(tarOf(files))
            .withRemotePath(WORK_DIR)
            .exec()
    }

    private fun runContainer(containerId: String, wallTimeLimitMs: Int): ExecutionResult {
        val stdout = StringBuilder()
        val stderr = StringBuilder()
        val startedAt = System.nanoTime()

        docker.startContainerCmd(containerId).exec()

        docker.logContainerCmd(containerId)
            .withStdOut(true)
            .withStdErr(true)
            .withFollowStream(true)
            .exec(object : ResultCallback.Adapter<Frame>() {
                override fun onNext(item: Frame) {
                    val text = String(item.payload)
                    if (item.streamType == StreamType.STDERR) stderr.append(text)
                    else stdout.append(text)
                }
            })
            .awaitCompletion(wallTimeLimitMs.toLong(), TimeUnit.MILLISECONDS)

        var exitCode = -1
        val finished = docker.waitContainerCmd(containerId)
            .exec(object : ResultCallback.Adapter<WaitResponse>() {
                override fun onNext(item: WaitResponse) {
                    exitCode = item.statusCode
                }
            })
            .awaitCompletion(wallTimeLimitMs.toLong(), TimeUnit.MILLISECONDS)

        val timedOut = !finished
        if (timedOut) {
            runCatching { docker.killContainerCmd(containerId).exec() }
        }

        val durationMs = ((System.nanoTime() - startedAt) / 1_000_000).toInt()

        return ExecutionResult(
            exitCode = exitCode,
            stdout = stdout.toString(),
            stderr = stderr.toString(),
            durationMs = durationMs,
            timedOut = timedOut,
        )
    }

    private fun ensureImage(image: String) {
        val present = docker.listImagesCmd()
            .withFilter("reference", listOf(image))
            .exec()
            .isNotEmpty()
        if (!present) {
            docker.pullImageCmd(image)
                .exec(object : ResultCallback.Adapter<PullResponseItem>() {})
                .awaitCompletion()
        }
    }

    private fun tarOf(files: Map<String, ByteArray>): ByteArrayInputStream {
        val bos = ByteArrayOutputStream()
        TarArchiveOutputStream(bos).use { tar ->
            files.forEach { (fileName, content) ->
                val entry = TarArchiveEntry(fileName).apply {
                    size = content.size.toLong()
                    mode = FILE_MODE
                }
                tar.putArchiveEntry(entry)
                tar.write(content)
                tar.closeArchiveEntry()
            }
        }
        return ByteArrayInputStream(bos.toByteArray())
    }
}