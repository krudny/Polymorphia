import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { ApiClient } from "@/services/api/client";
import { TeachingRoleUserResponseDTO } from "@/interfaces/api/course-groups";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    return await ApiClient.get<AvailableCoursesDTO[]>("/courses");
  },

  getTeachingRoleUsers: async (
    courseId: number
  ): Promise<TeachingRoleUserResponseDTO[]> => {
    return await ApiClient.get<TeachingRoleUserResponseDTO[]>(
      `/courses/teaching-roles?courseId=${courseId}`
    );
  },
};
