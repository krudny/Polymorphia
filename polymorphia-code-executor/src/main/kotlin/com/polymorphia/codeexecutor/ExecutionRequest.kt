package com.polymorphia.codeexecutor

data class ExecutionRequest(
    val executionId: Long? = null,
    val language: SupportedLanguage,
    val sourceCode: String,
    val stdin: String? = null,
    val cpuTimeLimitMs: Int? = null,
    val wallTimeLimitMs: Int? = null,
    val memoryLimitMb: Int? = null,
    val callbackUrl: String? = null,
    val strategy: ExecutionStrategy? = null,
)