import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { ApiClient } from "@/services/api/client";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    return await ApiClient.get<AvailableCoursesDTO[]>("/courses");
  },
};
