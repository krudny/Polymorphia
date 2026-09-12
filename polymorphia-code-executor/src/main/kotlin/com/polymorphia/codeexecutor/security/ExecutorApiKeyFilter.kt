package com.polymorphia.codeexecutor.security

import jakarta.annotation.PostConstruct
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.nio.charset.StandardCharsets
import java.security.MessageDigest

@Component
class ExecutorApiKeyFilter(
    @Value("\${executor.auth-secret:}")
    private val expectedSecret: String
) : OncePerRequestFilter() {

    private val log = LoggerFactory.getLogger(ExecutorApiKeyFilter::class.java)

    @PostConstruct
    fun validateConfiguration() {
        if (expectedSecret.isBlank()) {
            throw IllegalStateException("executor.auth-secret must be set and not empty!")
        }
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val path = request.requestURI

        if (path.startsWith("/actuator/health") || "OPTIONS".equals(request.method, ignoreCase = true)) {
            filterChain.doFilter(request, response)
            return
        }

        val providedSecret = request.getHeader("X-Executor-Secret")
        if (providedSecret != null && MessageDigest.isEqual(
                expectedSecret.toByteArray(StandardCharsets.UTF_8),
                providedSecret.toByteArray(StandardCharsets.UTF_8)
            )
        ) {
            filterChain.doFilter(request, response)
        } else {
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.contentType = "application/json"
            response.writer.write("{\"error\": \"Unauthorized: Missing or invalid X-Executor-Secret\"}")
        }
    }
}
