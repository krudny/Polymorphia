import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { ApiClient } from "@/services/api/client";
import { saveAs } from "file-saver";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    return await ApiClient.get<AvailableCoursesDTO[]>("/courses");
  },
  downloadCourseConfig: async (courseId: number): Promise<void> => {
    const response = await ApiClient.getBlob(
      `/courses/config/file?courseId=${courseId}`
    );

    saveAs(response, `course-${courseId}-config.json`);
  },
  updateCourseConfig: async (courseId: number, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    return await ApiClient.put<void>(
      `/courses/file?courseId=${courseId}`,
      formData
    );
  },
  createCourse: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    return await ApiClient.post<void>(`/courses/file`, formData);
  },
};
