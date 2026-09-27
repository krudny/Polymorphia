package com.polymorphia.codeexecutor

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "code-executor")
data class CodeExecutorProperties(
    var defaultStrategy: ExecutionStrategy = ExecutionStrategy.DOCKER,
    var allowedStrategies: List<ExecutionStrategy> = listOf(ExecutionStrategy.DOCKER),
    var isolate: IsolateProperties = IsolateProperties(),
)

data class IsolateProperties(
    var enabled: Boolean = false,
    var numBoxes: Int = 1,
)
