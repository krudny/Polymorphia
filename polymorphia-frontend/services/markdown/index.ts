import {
  MarkdownParamsRequest,
  MarkdownRequestDTO,
  MarkdownResponseDTO,
  SourceMarkdownResponseDTO,
} from "@/interfaces/api/markdown";
import { apiFetch, apiFetchJson } from "@/services/api/client";
import { kebabCase } from "case-anything";

export const MarkdownService = {
  getMarkdown: async (
    request: MarkdownParamsRequest
  ): Promise<MarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await apiFetchJson<MarkdownResponseDTO>(
      `/markdown/${type}/${resourceId}`
    );
  },

  getSourceUrl: async (
    request: MarkdownParamsRequest
  ): Promise<SourceMarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await apiFetchJson<SourceMarkdownResponseDTO>(
      `/markdown/${type}/${resourceId}/source`
    );
  },

  saveMarkdown: async (request: MarkdownRequestDTO): Promise<void> => {
    const type = kebabCase(request.markdownType.toLowerCase());
    const { markdown, resourceId } = request;

    await apiFetch(`/markdown/${type}/${resourceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown }),
    });
  },

  resetMarkdown: async (request: MarkdownParamsRequest): Promise<void> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    await apiFetch(`/markdown/${type}/${resourceId}/reset`, {
      method: "PUT",
    });
  },
};
