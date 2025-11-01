import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { API_HOST } from "@/services/api";
import { Fetch } from "@/hooks/general/useFetch/types";

export const CourseService = {
  getAvailableCourses: async (
    fetchFn: Fetch
  ): Promise<AvailableCoursesDTO[]> => {
    const response = await fetchFn(`${API_HOST}/courses`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać kursów");
    }

    return await response.json();
  },
};
