import {
  MarkdownRequestDTO,
  MarkdownResponseDTO,
  SourceMarkdownResponseDTO,
} from "@/interfaces/api/markdown";
import { API_HOST } from "@/services/api";

export const MarkdownService = {
  getMarkdown: async (
    gradableEventId: number
  ): Promise<MarkdownResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/markdown?gradableEventId=${gradableEventId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać pliku");
    }

    return await response.json();
  },

  getSourceUrl: async (
    gradableEventId: number
  ): Promise<SourceMarkdownResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/markdown/source?gradableEventId=${gradableEventId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać linku");
    }

    return await response.json();
  },

  saveMarkdown: async (request: MarkdownRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/markdown`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Nie udało się zapisać zmian!");
    }
  },

  resetMarkdown: async (gradableEventId: number): Promise<void> => {
    const response = await fetch(
      `${API_HOST}/markdown?gradableEventId=${gradableEventId}`,
      { credentials: "include", method: "PUT" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zaktualizować pliku");
    }
  },
};
