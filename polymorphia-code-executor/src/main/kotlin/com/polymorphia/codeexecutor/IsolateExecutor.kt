package com.polymorphia.codeexecutor

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.Locale
import java.util.concurrent.ArrayBlockingQueue
import java.util.concurrent.TimeUnit

private const val DEFAULT_WALL_TIME_LIMIT_MS = 5_000
private const val MAX_WALL_TIME_LIMIT_MS = 20_000
private const val DEFAULT_MEMORY_LIMIT_MB = 256
private const val MAX_PROCESSES = 32
private const val BOX_ACQUIRE_TIMEOUT_MS = 20_000L
private const val PROCESS_WAIT_BUFFER_MS = 2_000L
private const val GRACEFUL_SHUTDOWN_GRACE_MS = 500L
private const val STREAM_DRAIN_TIMEOUT_MS = 2_000L
private const val INIT_CLEANUP_TIMEOUT_SECONDS = 10L
private const val SANDBOX_PATH_ENV = "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
private const val SANDBOX_BOX_DIR = "/box"

@Component
class IsolateExecutor(
    private val properties: CodeExecutorProperties,
) : CodeExecutor {

    override val strategy: ExecutionStrategy = ExecutionStrategy.SAFE_PROCESS
    private val log = LoggerFactory.getLogger(IsolateExecutor::class.java)

    private val boxPool: ArrayBlockingQueue<Int> = run {
        val count = properties.isolate.numBoxes.coerceAtLeast(1)
        ArrayBlockingQueue<Int>(count).apply {
            for (boxId in 0 until count) {
                add(boxId)
            }
        }
    }

    override fun execute(request: ExecutionRequest): ExecutionResult {
        val boxId = boxPool.poll(BOX_ACQUIRE_TIMEOUT_MS, TimeUnit.MILLISECONDS)
            ?: throw ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No isolate box available")

        try {
            val metaFile = Files.createTempFile("isolate-meta-$boxId-", ".txt")
            try {
                val boxRoot = initBox(boxId)
                val sourcePath = boxRoot.resolve("box").resolve(request.language.fileName)
                Files.write(sourcePath, request.sourceCode.toByteArray())

                return runInBox(boxId, metaFile, request)
            } finally {
                runCatching { Files.deleteIfExists(metaFile) }
                cleanupBox(boxId)
            }
        } finally {
            boxPool.offer(boxId)
        }
    }

    private fun initBox(boxId: Int): Path {
        val cmd = listOf(properties.isolate.binaryPath, "--init", "-b", boxId.toString())
        val process = ProcessBuilder(cmd)
            .redirectErrorStream(true)
            .start()

        val output = process.inputStream.readBytes().toString(Charsets.UTF_8).trim()
        val finished = process.waitFor(INIT_CLEANUP_TIMEOUT_SECONDS, TimeUnit.SECONDS)
        if (!finished) {
            process.destroyForcibly()
            throw IllegalStateException("isolate --init timed out for box $boxId")
        }
        if (process.exitValue() != 0 || output.isEmpty()) {
            throw IllegalStateException("isolate --init failed for box $boxId (exit=${process.exitValue()}): $output")
        }

        val boxPath = Paths.get(output.lines().first().trim())
        log.info("Initialized isolate box={} at {}", boxId, boxPath)
        return boxPath
    }

    private fun runInBox(boxId: Int, metaFile: Path, request: ExecutionRequest): ExecutionResult {
        val wallTimeLimitMs = resolveWallTimeLimitMs(request.wallTimeLimitMs)
        val cmd = buildRunCommand(boxId, metaFile, request, wallTimeLimitMs)
        val startedAt = System.nanoTime()

        val process = ProcessBuilder(cmd).start()
        log.info("Spawned isolate pid={} box={} cmd={}", process.pid(), boxId, cmd)

        val stdout = StreamGobbler(process.inputStream).apply { start() }
        val stderr = StreamGobbler(process.errorStream).apply { start() }

        if (request.stdin != null) {
            process.outputStream.use { it.write(request.stdin.toByteArray()) }
        } else {
            process.outputStream.close()
        }

        val finished = process.waitFor(wallTimeLimitMs + PROCESS_WAIT_BUFFER_MS, TimeUnit.MILLISECONDS)
        if (!finished) {
            process.destroy()
            if (!process.waitFor(GRACEFUL_SHUTDOWN_GRACE_MS, TimeUnit.MILLISECONDS)) {
                process.destroyForcibly()
            }
        }

        stdout.join(STREAM_DRAIN_TIMEOUT_MS)
        stderr.join(STREAM_DRAIN_TIMEOUT_MS)

        val elapsedWallMs = ((System.nanoTime() - startedAt) / 1_000_000).toInt()
        val meta = parseMetaFile(metaFile)
        val status = meta["status"]

        if (status == "XX") {
            throw IllegalStateException("Isolate internal error: ${meta["message"] ?: "unknown"}")
        }

        val timedOut = status == "TO" || !finished
        val exitCode = meta["exitcode"]?.toIntOrNull()
            ?: if (status == "SG" || timedOut || process.isAlive) -1 else process.exitValue()
        val durationMs = meta["time-wall"]?.toDoubleOrNull()?.let { (it * 1000).toInt() } ?: elapsedWallMs

        log.info(
            "Finished isolate box={} status={} exitCode={} timedOut={} durationMs={}",
            boxId, status ?: "OK", exitCode, timedOut, durationMs
        )

        return ExecutionResult(
            exitCode = exitCode,
            stdout = stdout.output(),
            stderr = stderr.output(),
            durationMs = durationMs,
            timedOut = timedOut,
        )
    }

    private fun buildRunCommand(
        boxId: Int,
        metaFile: Path,
        request: ExecutionRequest,
        wallTimeLimitMs: Int,
    ): List<String> {
        val wallTimeSec = String.format(Locale.US, "%.3f", wallTimeLimitMs / 1000.0)
        val interpreter = request.language.command.first()
        val scriptPath = "$SANDBOX_BOX_DIR/${request.language.fileName}"

        return buildList {
            add(properties.isolate.binaryPath)
            add("--run")
            add("--silent")
            add("-b")
            add(boxId.toString())
            add("--meta=${metaFile.toAbsolutePath()}")
            add("--wall-time=$wallTimeSec")
            request.cpuTimeLimitMs?.let { cpuMs ->
                val cpuSec = String.format(Locale.US, "%.3f", cpuMs.coerceAtLeast(1) / 1000.0)
                add("--time=$cpuSec")
            }
            if (request.language != SupportedLanguage.JAVASCRIPT) {
                val memoryLimitKb = (request.memoryLimitMb ?: DEFAULT_MEMORY_LIMIT_MB) * 1024
                add("--mem=$memoryLimitKb")
            }
            add("--processes=$MAX_PROCESSES")
            add("--env=$SANDBOX_PATH_ENV")
            add("--")
            add(interpreter)
            add(scriptPath)
        }
    }

    private fun parseMetaFile(metaFile: Path): Map<String, String> {
        if (!Files.exists(metaFile)) return emptyMap()
        return runCatching {
            Files.readAllLines(metaFile)
                .mapNotNull { line ->
                    val idx = line.indexOf(':')
                    if (idx > 0) line.substring(0, idx).trim() to line.substring(idx + 1).trim() else null
                }
                .toMap()
        }.getOrDefault(emptyMap())
    }

    private fun cleanupBox(boxId: Int) {
        runCatching {
            val cmd = listOf(properties.isolate.binaryPath, "--cleanup", "-b", boxId.toString())
            val process = ProcessBuilder(cmd)
                .redirectErrorStream(true)
                .start()
            if (!process.waitFor(INIT_CLEANUP_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
                process.destroyForcibly()
            }
        }.onFailure { ex ->
            log.warn("Failed to cleanup isolate box={}: {}", boxId, ex.message)
        }
    }

    private fun resolveWallTimeLimitMs(requested: Int?): Int =
        (requested ?: DEFAULT_WALL_TIME_LIMIT_MS).coerceIn(1, MAX_WALL_TIME_LIMIT_MS)
}
