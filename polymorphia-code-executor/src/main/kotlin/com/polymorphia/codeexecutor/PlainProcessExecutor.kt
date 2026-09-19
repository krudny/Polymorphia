package com.polymorphia.codeexecutor

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.io.InputStream
import java.nio.file.Files
import java.util.concurrent.TimeUnit

private const val DEFAULT_WALL_TIME_LIMIT_MS = 5_000
private const val MAX_WALL_TIME_LIMIT_MS = 20_000
private const val GRACEFUL_SHUTDOWN_GRACE_MS = 500L
private const val STREAM_DRAIN_TIMEOUT_MS = 2_000L

@Component
class PlainProcessExecutor : CodeExecutor {

    override val strategy = ExecutionStrategy.PLAIN_PROCESS
    private val log = LoggerFactory.getLogger(PlainProcessExecutor::class.java)


    override fun execute(request: ExecutionRequest): ExecutionResult {
        val workDir = Files.createTempDirectory("polymorphia-exec-")
        log.info("Starting plain process execution in {}", workDir)
        val startedAt = System.nanoTime()
        try {
            Files.write(workDir.resolve(request.language.fileName), request.sourceCode.toByteArray())

            val process = ProcessBuilder(plainCommand(request.language))
                .directory(workDir.toFile())
                .start()
            log.info("Spawned pid={} cmd={}", process.pid(), plainCommand(request.language))

            return handleProcess(process, request, startedAt)
        } finally {
            workDir.toFile().deleteRecursively()
        }
    }

    private fun plainCommand(language: SupportedLanguage): List<String> {
        val interpreter = language.command.first()
        return listOf(interpreter, language.fileName)
    }

    private fun handleProcess(process: Process, request: ExecutionRequest, startedAt: Long): ExecutionResult {
        val wallTimeLimitMs = resolveWallTimeLimitMs(request.wallTimeLimitMs)

        val stdout = StreamGobbler(process.inputStream).apply { start() }
        val stderr = StreamGobbler(process.errorStream).apply { start() }

        if (request.stdin != null) {
            process.outputStream.use { it.write(request.stdin.toByteArray()) }
        } else {
            process.outputStream.close()
        }

        val finished = process.waitFor(wallTimeLimitMs.toLong(), TimeUnit.MILLISECONDS)
        if (!finished) {
            process.destroy()
            if (!process.waitFor(GRACEFUL_SHUTDOWN_GRACE_MS, TimeUnit.MILLISECONDS)) {
                process.destroyForcibly()
            }
        }

        stdout.join(STREAM_DRAIN_TIMEOUT_MS)
        stderr.join(STREAM_DRAIN_TIMEOUT_MS)

        val exitCode = if (process.isAlive) -1 else process.exitValue()
        val durationMs = ((System.nanoTime() - startedAt) / 1_000_000).toInt()

        log.info("Finished pid={} exitCode={} timedOut={} durationMs={}", process.pid(), exitCode, !finished, durationMs)

        return ExecutionResult(
            exitCode = exitCode,
            stdout = stdout.output(),
            stderr = stderr.output(),
            durationMs = durationMs,
            timedOut = !finished,
        )
    }

    private fun resolveWallTimeLimitMs(requested: Int?): Int =
        (requested ?: DEFAULT_WALL_TIME_LIMIT_MS).coerceIn(1, MAX_WALL_TIME_LIMIT_MS)
}

private class StreamGobbler(private val stream: InputStream) : Thread("stream-gobbler") {
    @Volatile private var content: String = ""

    init {
        isDaemon = true
    }

    override fun run() {
        content = stream.readBytes().toString(Charsets.UTF_8)
    }

    fun output(): String = content
}