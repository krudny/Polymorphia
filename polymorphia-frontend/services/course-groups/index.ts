import { API_HOST } from "@/services/api";
import {
  CourseGroupResponse,
  CourseGroupType,
  CourseGroupTypes,
} from "@/services/course-groups/types";

const CourseGroupsService = {
  getCourseGroups: async <T extends CourseGroupType>(
    courseId: number,
    options: { isIndividual: boolean; type: T }
  ): Promise<CourseGroupResponse<T>> => {
    const shortPath = options.type === CourseGroupTypes.SHORT ? "/short" : "";
    const mode = options.isIndividual ? "/individual" : "/all";
    const response = await fetch(
      `${API_HOST}/course-groups${mode}${shortPath}?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grup zajęciowych!");
    }

    return await response.json();
  },
};

export default CourseGroupsService;
