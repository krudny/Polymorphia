package com.polymorphia.codeexecutor

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(properties = ["executor.auth-secret=test-secret"])
class PolymorphiaCodeExecutorApplicationTests {

    @Test
    fun contextLoads() {
    }

}
