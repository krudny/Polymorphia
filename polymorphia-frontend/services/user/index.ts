import {
  InviteRequestDTO,
  RegisterRequestDTO,
  Role,
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { API_HOST } from "@/services/api";
import {
  CreateAnimalRequestDTO,
  StudentCourseGroupAssignmentIdResponseDTO,
  StudentProfileResponseDTO,
} from "@/interfaces/api/student";

const UserService = {
  getStudentProfile: async (
    courseId: number
  ): Promise<StudentProfileResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/students/profile?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać profilu studenta");
    }

    return await response.json();
  },
  hasValidAnimalInCourse: async (courseId: number): Promise<boolean> => {
    const response = await fetch(
      `${API_HOST}/students/animals/is-valid?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się sprawdzić czy istnieje zwierzak");
    }

    return await response.json();
  },
  getCourseGroup: async (
    courseId: number
  ): Promise<StudentCourseGroupAssignmentIdResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/students/course-group?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Nie udało się sprawdzić czy student jest przypisany do grupy"
      );
    }

    return await response.json();
  },
  createAnimal: async (request: CreateAnimalRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/students/animals`, {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się utworzyć zwierzęcia");
    }
  },
  getUserRole: async (): Promise<Role> => {
    const response = await fetch(`${API_HOST}/users/role`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się sprawdzić preferencji użytkownika");
    }

    return await response.json();
  },
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    const response = await fetch(`${API_HOST}/users/context`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać kontekstu użytkownika");
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
      throw new Error("Nie udało się ustawić preferencji użytkownika");
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
    const response = await fetch(`${API_HOST}/invitation/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zaprosić studenta");
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
      throw new Error("Nie udało się utworzyć konta");
    }
  },
};

export default UserService;
