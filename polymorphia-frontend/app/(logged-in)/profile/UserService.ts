import {
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { API_HOST } from "@/services/api";
import { StudentProfileDTO } from "@/interfaces/api/profile";

const UserService = {
  getStudentProfile: async (courseId: number): Promise<StudentProfileDTO> => {
    const response = await fetch(`${API_HOST}/profile?courseId=${courseId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch student's profile!");
    }

    return await response.json();
  },
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
    const response = await fetch(`${API_HOST}/users/context`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user context!");
    }

    return await response.json();
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
  getRandomUsers: async (): Promise<StudentDetailsDTOWithType[]> => {
    return [
      {
        userType: Roles.STUDENT,
        userDetails: {
          id: 1,
          userName: "Kamil Rudny",
          animalName: "Gerard Pocieszny",
          evolutionStage: "Majestatyczna bestia",
          group: "BM-20-00",
          imageUrl: "images/evolution-stages/4.jpg",
          position: 1,
          courseId: 1,
        },
      },
      {
        userType: Roles.STUDENT,
        userDetails: {
          id: 2,
          userName: "Kamil Śmieszny",
          animalName: "Gerard Wesoły",
          evolutionStage: "Majestatyczna bestia",
          group: "BM-20-00",
          imageUrl: "images/evolution-stages/5.jpg",
          position: 2,
          courseId: 1,
        },
      },
    ];
  },
};

export default UserService;
