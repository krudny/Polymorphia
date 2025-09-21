import { API_HOST } from "@/services/api";
import { ImportCSVType, ImportCSVTypes } from "@/interfaces/general";
import {
  CSVHeadersResponseDTO,
  CSVPreviewResponseDTO,
} from "@/interfaces/api/CSV";

const CSVService = {
  getCSVHeaders: async (
    file: File,
    type: ImportCSVType
  ): Promise<CSVHeadersResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await fetch(`${API_HOST}/csv/headers`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się odczytać nagłówków!");
    }

    return await response.json();
  },

  getCSVPreview: async (
    file: File,
    headers: Record<string, string>
  ): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("csvHeaders", JSON.stringify(headers));

    const response = await fetch(`${API_HOST}/csv/preview`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się wczytać podglądu!");
    }

    return await response.json();
  },

  processCSV: async (
    type: ImportCSVType,
    csvHeaders: string[],
    data: string[][],
    gradableEventId?: number
  ): Promise<void> => {
    if (type === ImportCSVTypes.GRADE_IMPORT) {
      await CSVService.processGradeImport(csvHeaders, data, gradableEventId);
    } else {
      await CSVService.processStudentInvite(csvHeaders, data);
    }
  },

  processGradeImport: async (
    csvHeaders: string[],
    data: string[][],
    gradableEventId?: number
  ): Promise<void> => {
    const body = JSON.stringify({
      type: ImportCSVTypes.GRADE_IMPORT,
      csvHeaders: csvHeaders,
      data: data,
      ...(gradableEventId && { gradableEventId }),
    });

    const response = await fetch(`${API_HOST}/csv/process/test-grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zapisać ocen!");
    }
  },

  processStudentInvite: async (
    csvHeaders: string[],
    data: string[][]
  ): Promise<void> => {
    const body = JSON.stringify({
      type: ImportCSVTypes.STUDENT_INVITE,
      csvHeaders: csvHeaders,
      data: data,
    });

    const response = await fetch(`${API_HOST}/csv/process/student-invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zaprosić studentów!");
    }
  },
};

export default CSVService;
