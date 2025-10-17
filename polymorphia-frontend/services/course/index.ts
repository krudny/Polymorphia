import { CourseGroupsResponseDTO } from "@/interfaces/api/course";
import { API_HOST } from "@/services/api";

// TODO: add instructor id
export const CourseService = {
  getCourseGroups: async (
    courseId: number
  ): Promise<CourseGroupsResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/courses/groups?courseId=${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grup!");
    }

    return await response.json();
  },
};
