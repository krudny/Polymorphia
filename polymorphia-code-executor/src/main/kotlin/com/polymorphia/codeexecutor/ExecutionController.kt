package com.polymorphia.codeexecutor

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/executions")
class ExecutionController(private val service: ExecutionService) {

    @PostMapping("/sync")
    fun executeSync(@RequestBody request: ExecutionRequest): ExecutionResponse =
        service.run(request)
}