import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { apiFetchJson } from "@/services/api/client";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    return await apiFetchJson<AvailableCoursesDTO[]>("/courses");
  },
};
