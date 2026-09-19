package com.polymorphia.codeexecutor

data class ExecutionResponse(
    val stdout: String,
    val stderr: String,
    val exitCode: Int,
    val durationMs: Int,
    val timedOut: Boolean = false,
)