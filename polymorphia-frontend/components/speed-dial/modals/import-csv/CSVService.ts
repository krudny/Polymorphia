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

    const response = await fetch(`${API_HOST}/grading/csv/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zapisać ocen!");
    }
  },

  processStudentCourseInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseId: number
  ): Promise<void> => {
    const body = JSON.stringify({
      type: ImportCSVTypes.STUDENT_INVITE,
      csvHeaders,
      data,
      courseId,
    });

    const response = await fetch(`${API_HOST}/invitation/course/csv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zaprosić studentów!");
    }
  },

  processStudentGroupInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseGroupId: number
  ): Promise<void> => {
    const body = JSON.stringify({
      type: ImportCSVTypes.GROUP_INVITE,
      csvHeaders,
      data,
      courseGroupId,
    });

    const response = await fetch(`${API_HOST}/invitation/group/csv`, {
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
