import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { fetchJson, getEndpoint } from "@/services/api/client";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    return await fetchJson<AvailableCoursesDTO[]>(getEndpoint("/courses"));
  },
};
