import {
  MarkdownParamsRequest,
  MarkdownRequestDTO,
  MarkdownResponseDTO,
  SourceMarkdownResponseDTO,
} from "@/interfaces/api/markdown";
import { kebabCase } from "case-anything";
import { fetchJson, getEndpoint, putEndpoint } from "@/services/api/client";

export const MarkdownService = {
  getMarkdown: async (
    request: MarkdownParamsRequest
  ): Promise<MarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await fetchJson<MarkdownResponseDTO>(
      getEndpoint(`/markdown/${type}/${resourceId}`)
    );
  },

  getSourceUrl: async (
    request: MarkdownParamsRequest
  ): Promise<SourceMarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    return await fetchJson<SourceMarkdownResponseDTO>(
      getEndpoint(`/markdown/${type}/${resourceId}/source`)
    );
  },

  saveMarkdown: async (request: MarkdownRequestDTO): Promise<void> => {
    const type = kebabCase(request.markdownType.toLowerCase());
    const { markdown, resourceId } = request;

    await putEndpoint(
      `/markdown/${type}/${resourceId}`,
      JSON.stringify({ markdown }),
      true
    );
  },

  resetMarkdown: async (request: MarkdownParamsRequest): Promise<void> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    await putEndpoint(`/markdown/${type}/${resourceId}/reset`);
  },
};
