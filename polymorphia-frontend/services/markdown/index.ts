import {
  MarkdownParamsRequest,
  MarkdownRequestDTO,
  MarkdownResponseDTO,
  SourceMarkdownResponseDTO,
} from "@/interfaces/api/markdown";
import { API_HOST } from "@/services/api";
import { kebabCase } from "case-anything";

export const MarkdownService = {
  getMarkdown: async (
    request: MarkdownParamsRequest
  ): Promise<MarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    const response = await fetch(`${API_HOST}/markdown/${type}/${resourceId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać pliku");
    }

    return await response.json();
  },

  getSourceUrl: async (
    request: MarkdownParamsRequest
  ): Promise<SourceMarkdownResponseDTO> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    const response = await fetch(
      `${API_HOST}/markdown/${type}/${resourceId}/source`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać linku");
    }

    return await response.json();
  },

  saveMarkdown: async (request: MarkdownRequestDTO): Promise<void> => {
    const type = kebabCase(request.markdownType.toLowerCase());
    const { markdown, resourceId } = request;

    const response = await fetch(`${API_HOST}/markdown/${type}/${resourceId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown }),
    });

    if (!response.ok) {
      throw new Error("Nie udało się zapisać zmian!");
    }
  },

  resetMarkdown: async (request: MarkdownParamsRequest): Promise<void> => {
    const resourceId = request.resourceId;
    const type = kebabCase(request.markdownType.toLowerCase());

    const response = await fetch(
      `${API_HOST}/markdown/${type}/${resourceId}/reset`,
      {
        credentials: "include",
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zaktualizować pliku");
    }
  },
};
