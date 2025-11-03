import { ImportCSVType, ImportCSVTypes } from "@/interfaces/general";
import {
  CSVHeadersResponseDTO,
  CSVPreviewResponseDTO,
} from "@/interfaces/api/CSV";
import { fetchJson, postEndpoint } from "@/services/api/client";

const CSVService = {
  getCSVHeaders: async (
    file: File,
    type: ImportCSVType
  ): Promise<CSVHeadersResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return await fetchJson(postEndpoint("/csv/headers", formData));
  },

  getCSVPreview: async (
    file: File,
    headers: Record<string, string>
  ): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("csvHeaders", JSON.stringify(headers));

    return await fetchJson(postEndpoint("/csv/preview", formData));
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

    await postEndpoint("/grading/csv/test", body, true);
  },

  processStudentCourseInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseId: number
  ): Promise<void> => {
    await postEndpoint(
      "/invitation/course/csv",
      JSON.stringify({
        type: ImportCSVTypes.STUDENT_INVITE,
        csvHeaders,
        data,
        courseId,
      }),
      true
    );
  },

  processStudentGroupInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseGroupId: number
  ): Promise<void> => {
    await postEndpoint(
      "/invitation/group/csv",
      JSON.stringify({
        type: ImportCSVTypes.GROUP_INVITE,
        csvHeaders,
        data,
        courseGroupId,
      }),
      true
    );
  },
};

export default CSVService;
