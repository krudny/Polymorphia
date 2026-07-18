package com.polymorphia.codeexecutor

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.api.async.ResultCallback
import com.github.dockerjava.api.model.Frame
import com.github.dockerjava.api.model.PullResponseItem
import com.github.dockerjava.api.model.StreamType
import com.github.dockerjava.api.model.WaitResponse
import org.apache.commons.compress.archivers.tar.TarArchiveEntry
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream
import org.springframework.stereotype.Component
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.util.concurrent.TimeUnit

@Component
class DockerExecutor(private val docker: DockerClient) {

    fun execute(language: SupportedLanguage, code: String): ExecutionResult {
        ensureImage(language.image)

        val id = docker.createContainerCmd(language.image)
            .withWorkingDir("/app")
            .withCmd(language.command)
            .exec()
            .id

        try {
            docker.copyArchiveToContainerCmd(id)
                .withTarInputStream(tarOf(language.fileName, code.toByteArray()))
                .withRemotePath("/app")
                .exec()

            docker.startContainerCmd(id).exec()

            val stdout = StringBuilder()
            val stderr = StringBuilder()

            docker.logContainerCmd(id)
                .withStdOut(true)
                .withStdErr(true)
                .withFollowStream(true)
                .exec(object : ResultCallback.Adapter<Frame>() {
                    override fun onNext(item: Frame) {
                        val text = String(item.payload)
                        if (item.streamType == StreamType.STDERR) stderr.append(text)
                        else stdout.append(text)
                    }
                })
                .awaitCompletion(30, TimeUnit.SECONDS)

            var exit = -1
            docker.waitContainerCmd(id)
                .exec(object : ResultCallback.Adapter<WaitResponse>() {
                    override fun onNext(item: WaitResponse) {
                        exit = item.statusCode
                    }
                })
                .awaitCompletion(30, TimeUnit.SECONDS)

            return ExecutionResult(exit, stdout.toString(), stderr.toString())
        } finally {
            docker.removeContainerCmd(id).withForce(true).exec()
        }
    }

    private fun ensureImage(image: String) {
        val present = docker.listImagesCmd()
            .withFilter("reference", listOf(image))
            .exec()
            .isNotEmpty()
        if (!present) {
            docker.pullImageCmd(image)
                .exec(object : ResultCallback.Adapter<PullResponseItem>() {})
                .awaitCompletion()
        }
    }


    private fun tarOf(fileName: String, content: ByteArray): ByteArrayInputStream {
        val bos = ByteArrayOutputStream()
        TarArchiveOutputStream(bos).use { tar ->
            val entry = TarArchiveEntry(fileName).apply {
                size = content.size.toLong()
                mode = 493
            }
            tar.putArchiveEntry(entry)
            tar.write(content)
            tar.closeArchiveEntry()
        }
        return ByteArrayInputStream(bos.toByteArray())
    }
}