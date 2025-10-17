import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { API_HOST } from "@/services/api";

export const CourseService = {
  getAvailableCourses: async (): Promise<AvailableCoursesDTO[]> => {
    const response = await fetch(`${API_HOST}/courses`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać kursów");
    }

    const data = await response.json();
    console.log(data);
    return data;
  },
};
