import {API_HOST} from "@/services/api";

export interface CSVHeadersResponseDTO {
  requiredHeaders: string[];
  fileHeaders: string[];
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
  }
}

export default CSVService;