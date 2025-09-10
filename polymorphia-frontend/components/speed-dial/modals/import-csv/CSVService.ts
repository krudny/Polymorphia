import {API_HOST} from "@/services/api";

export interface CSVHeadersResponseDTO {
  requiredHeaders: string[];
  fileHeaders: string[];
}

export interface CSVPreviewResponseDTO {
  headers: string[],
  data: string[][],
}

const CSVService = {
  getHeaders: async (file: File, type: string): Promise<CSVHeadersResponseDTO> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_HOST}/csv/headers`, {
      method: 'POST',
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch csv headers!");
    }

    return await response.json();
  },

  getPreview: async (file: File, headers: Record<string, string>): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('headers', JSON.stringify(headers));

    const response = await fetch(`${API_HOST}/csv/preview`, {
      method: 'POST',
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch csv preview!");
    }

    return await response.json();
  }
}

export default CSVService;