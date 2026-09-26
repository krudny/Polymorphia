package com.polymorphia.codeexecutor

import jakarta.annotation.PostConstruct
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException

@Component
class ExecutorRegistry(
    executors: List<CodeExecutor>,
    private val properties: CodeExecutorProperties,
) {
    private val log = LoggerFactory.getLogger(ExecutorRegistry::class.java)

    private val executorsByStrategy: Map<ExecutionStrategy, CodeExecutor> = executors
        .filter { executor ->
            if (executor.strategy == ExecutionStrategy.SAFE_PROCESS && !properties.isolate.enabled) {
                log.info("Excluding SAFE_PROCESS executor because polymorphia.code-executor.isolate.enabled is false")
                false
            } else {
                true
            }
        }
        .associateBy { it.strategy }

    @PostConstruct
    fun validateConfiguration() {
        val osName = System.getProperty("os.name") ?: "unknown"
        if (properties.isolate.enabled && !osName.contains("linux", ignoreCase = true)) {
            throw IllegalStateException("SAFE_PROCESS requires Linux (current: $osName)")
        }

        if (!properties.allowedStrategies.contains(properties.defaultStrategy)) {
            throw IllegalStateException("default-strategy ${properties.defaultStrategy} not in allowed-strategies ${properties.allowedStrategies}")
        }

        log.info("Executors: default={}, allowed={}, registered={}",
            properties.defaultStrategy, properties.allowedStrategies, executorsByStrategy.keys)
    }

    fun resolve(requested: ExecutionStrategy?): CodeExecutor {
        val strategy = requested ?: properties.defaultStrategy

        if (!properties.allowedStrategies.contains(strategy)) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Strategy $strategy not allowed")
        }

        return executorsByStrategy[strategy]
            ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Strategy $strategy unavailable")
    }

    fun getAllowedStrategies(): List<ExecutionStrategy> =
        properties.allowedStrategies.filter { executorsByStrategy.containsKey(it) }
}