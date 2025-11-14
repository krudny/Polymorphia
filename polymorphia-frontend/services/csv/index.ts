import { ImportCSVType, ImportCSVTypes } from "@/interfaces/general";
import {
  CSVHeadersResponseDTO,
  CSVPreviewResponseDTO,
} from "@/interfaces/api/CSV";
import { ApiClient } from "@/services/api/client";

const CSVService = {
  getCSVHeaders: async (
    file: File,
    type: ImportCSVType
  ): Promise<CSVHeadersResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return await ApiClient.post<CSVHeadersResponseDTO>(
      "/csv/headers",
      formData
    );
  },

  getCSVPreview: async (
    file: File,
    headers: Record<string, string>
  ): Promise<CSVPreviewResponseDTO> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("csvHeaders", JSON.stringify(headers));

    return await ApiClient.post<CSVPreviewResponseDTO>(
      "/csv/preview",
      formData
    );
  },

  processGradeImport: async (
    csvHeaders: string[],
    data: string[][],
    gradableEventId?: number
  ): Promise<void> => {
    await ApiClient.post("/grading/csv/test", {
      type: ImportCSVTypes.GRADE_IMPORT,
      csvHeaders: csvHeaders,
      data: data,
      ...(gradableEventId && { gradableEventId }),
    });
  },

  processStudentCourseInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseId: number
  ): Promise<void> => {
    await ApiClient.post("/invitation/course/csv", {
      type: ImportCSVTypes.STUDENT_INVITE,
      csvHeaders,
      data,
      courseId,
    });
  },

  processStudentGroupInvite: async (
    csvHeaders: string[],
    data: string[][],
    courseGroupId: number
  ): Promise<void> => {
    await ApiClient.post("/invitation/group/csv", {
      type: ImportCSVTypes.GROUP_INVITE,
      csvHeaders,
      data,
      courseGroupId,
    });
  },
};

export default CSVService;
