import { AvailableCoursesDTO, UserDetailsDTO } from "@/interfaces/api/user";
import { API_HOST } from "@/services/api";

const UserService = {
  isCourseIdSet: async (): Promise<boolean> => {
    const response = await fetch(`${API_HOST}/users/preferred-course/exists`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check for user preferences!");
    }

    return await response.json();
  },
  getUserCourses: async (): Promise<AvailableCoursesDTO[]> => {
    const response = await fetch(`${API_HOST}/courses`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses!");
    }

    return await response.json();
  },
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    return {
      id: 1,
      courseId: 1,
      userName: "Kamil Rudny",
      animalName: "Gerard Pocieszny",
      evolutionStage: "Majestatyczna bestia",
      imageUrl: "images/evolution-stages/4.jpg",
      group: "BM-10-00",
      position: 25,
    };
  },
  setUserPreferredCourse: async (courseId: number): Promise<void> => {
    const response = await fetch(
      `${API_HOST}/users/preferred-course?courseId=${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to set user preferences!");
    }
  },
  getRandomUsers: async (): Promise<UserDetailsDTO[]> => {
    return [
      {
        id: 1,
        userName: "Kamil Rudny",
        animalName: "Gerard Pocieszny",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        imageUrl: "images/evolution-stages/4.jpg",
        position: 1,
        courseId: 1,
      },
      {
        id: 2,
        userName: "Kamil Śmieszny",
        animalName: "Gerard Wesoły",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        imageUrl: "images/evolution-stages/5.jpg",
        position: 2,
        courseId: 1,
      },
    ];
  },
};

export default UserService;
