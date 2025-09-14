import {API_HOST} from "@/services/api";
import {ImportCSVType} from "@/interfaces/general";
import {CSVHeadersResponseDTO, CSVPreviewResponseDTO} from "@/interfaces/api/CSV";

const CSVService = {
  getCSVHeaders: async (file: File, type: ImportCSVType): Promise<CSVHeadersResponseDTO> => {
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

  getCSVPreview: async (file: File, headers: Record<string, string>): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('csvHeaders', JSON.stringify(headers));

    console.log(formData);

    const response = await fetch(`${API_HOST}/csv/preview`, {
      method: 'POST',
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch csv preview!");
    }

    return await response.json();
  },

  processCSV: async (type: ImportCSVType, csvHeaders: string[], data: string[][]): Promise<void> => {
    const body = JSON.stringify({
      type: type,
      csvHeaders: csvHeaders,
      data: data,
    });

    const response = await fetch(`${API_HOST}/csv/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to process csv!");
    }

    return;
  },
}

export default CSVService;