import { apiFetch } from "@/services/api/client";
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

    const response = await apiFetch("/csv/headers", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  },

  getCSVPreview: async (
    file: File,
    headers: Record<string, string>
  ): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("csvHeaders", JSON.stringify(headers));

    const response = await apiFetch("/csv/preview", {
      method: "POST",
      body: formData,
    });
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

    await apiFetch("/grading/csv/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
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

    await apiFetch("/invitation/course/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
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

    await apiFetch("/invitation/group/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  },
};

export default CSVService;
