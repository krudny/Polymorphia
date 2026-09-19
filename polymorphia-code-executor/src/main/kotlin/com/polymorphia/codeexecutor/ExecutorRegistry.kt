package com.polymorphia.codeexecutor

import org.springframework.stereotype.Component

@Component
class ExecutorRegistry(executors: List<CodeExecutor> ) {
    private val executorsByStrategy: Map<ExecutionStrategy, CodeExecutor> = executors.associateBy { it.strategy }
    private val defaultStrategy: ExecutionStrategy = ExecutionStrategy.DOCKER;

    fun resolve(requested: ExecutionStrategy?): CodeExecutor {
        val strategy = requested ?: defaultStrategy
        return executorsByStrategy[strategy] ?: error("No CodeExecutor registered for strategy $strategy")
    }
}