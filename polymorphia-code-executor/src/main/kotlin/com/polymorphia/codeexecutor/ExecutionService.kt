package com.polymorphia.codeexecutor

import org.springframework.stereotype.Service

@Service
class ExecutionService(private val executorsRegistry: ExecutorRegistry) {

    fun run(request: ExecutionRequest): ExecutionResponse {
        val result = executorsRegistry.resolve(request.strategy).execute(request);
        return ExecutionResponse(
            stdout = result.stdout,
            stderr = result.stderr,
            exitCode = result.exitCode,
            durationMs = result.durationMs,
            timedOut = result.timedOut,
        )
    }
}