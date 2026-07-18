package com.polymorphia.codeexecutor

import org.springframework.stereotype.Service

@Service
class ExecutionService(private val executor: DockerExecutor) {
    fun run(language: SupportedLanguage, code: String): ExecutionResult =
        executor.execute(language, code)
}