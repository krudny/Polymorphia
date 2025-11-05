import {
  MarkdownParamsRequest,
  MarkdownRequestDTO,
  MarkdownResponseDTO,
  SourceMarkdownResponseDTO,
} from "@/interfaces/api/markdown";
import { kebabCase } from "case-anything";
import { ApiClient } from "@/services/api/client";

export const MarkdownService = {
  getMarkdown: async (
    request: MarkdownParamsRequest
  ): Promise<MarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await ApiClient.get<MarkdownResponseDTO>(
      `/markdown/${type}/${resourceId}`
    );
  },

  getSourceUrl: async (
    request: MarkdownParamsRequest
  ): Promise<SourceMarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await ApiClient.get<SourceMarkdownResponseDTO>(
      `/markdown/${type}/${resourceId}/source`
    );
  },

  saveMarkdown: async (request: MarkdownRequestDTO): Promise<void> => {
    const type = kebabCase(request.markdownType.toLowerCase());
    const { markdown, resourceId } = request;

    await ApiClient.put(`/markdown/${type}/${resourceId}`, markdown);
  },

  resetMarkdown: async (request: MarkdownParamsRequest): Promise<void> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    await ApiClient.put(`/markdown/${type}/${resourceId}/reset`);
  },
};
