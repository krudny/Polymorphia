package com.polymorphia.codeexecutor

interface CodeExecutor {
    val strategy: ExecutionStrategy

    fun execute(request: ExecutionRequest): ExecutionResult
}