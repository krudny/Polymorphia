import {
  InviteRequestDTO,
  RegisterRequestDTO,
  Role,
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { API_HOST } from "@/services/api";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
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
  getUserRole: async (): Promise<Role> => {
    const response = await fetch(`${API_HOST}/users/role`, {
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
        userRole: Roles.STUDENT,
        userDetails: {
          id: 1,
          fullName: "Kamil Rudny",
          animalName: "Gerard Pocieszny",
          evolutionStage: "Majestatyczna bestia",
          group: "BM-20-00",
          imageUrl: "images/evolution-stages/4.jpg",
          position: 1,
          courseId: 1,
        },
      },
      {
        userRole: Roles.STUDENT,
        userDetails: {
          id: 2,
          fullName: "Kamil Śmieszny",
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

  inviteUser: async (request: InviteRequestDTO): Promise<void> => {
    console.log(request);

    const response = await fetch(`${API_HOST}/invitation/invite-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zaprosić studenta!");
    }
  },

  register: async (request: RegisterRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/invitation/register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się utworzyć konta!");
    }
  },
};

export default UserService;
