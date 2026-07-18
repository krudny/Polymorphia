package com.polymorphia.codeexecutor

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class ExecuteRequest(val language: SupportedLanguage, val code: String)
data class ExecuteResponse(val exitCode: Int, val stdout: String, val stderr: String)

@RestController
@RequestMapping("/execute")
@CrossOrigin(origins = ["http://localhost:3000"])
class ExecutionController(private val service: ExecutionService) {

    @PostMapping
    fun execute(@RequestBody request: ExecuteRequest): ExecuteResponse {
        val result = service.run(request.language, request.code)
        return ExecuteResponse(result.exitCode, result.stdout, result.stderr)
    }
}