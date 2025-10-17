import { API_HOST } from "@/services/api";
import {
  CourseGroupsResponseDTO,
  CourseGroupsShortResponseDTO,
} from "@/interfaces/api/course-groups";

const CourseGroupsService = {
  getAllCourseGroups: async (
    courseId: number,
    includeDetails: boolean
  ): Promise<CourseGroupsResponseDTO[] | CourseGroupsShortResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/course-groups/all/${includeDetails ? "short" : ""}?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grup zajęciowych!");
    }

    return await response.json();
  },

  getIndividualCourseGroups: async (
    courseId: number,
    includeDetails: boolean
  ): Promise<CourseGroupsResponseDTO[] | CourseGroupsShortResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/course-groups/individual/${includeDetails ? "short" : ""}?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grup zajęciowych!");
    }

    return await response.json();
  },
};

export default CourseGroupsService;
