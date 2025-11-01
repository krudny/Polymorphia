import {
  InviteRequestDTO,
  RegisterRequestDTO,
  ChangePasswordDTO,
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
import { Fetch } from "@/hooks/general/useFetch/types";

const UserService = {
  getStudentProfile: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<StudentProfileResponseDTO> => {
    const response = await fetchFn(
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
  hasValidAnimalInCourse: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<boolean> => {
    const response = await fetchFn(
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
    fetchFn: Fetch,
    courseId: number
  ): Promise<StudentCourseGroupAssignmentIdResponseDTO> => {
    const response = await fetchFn(
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
  createAnimal: async (
    fetchFn: Fetch,
    request: CreateAnimalRequestDTO
  ): Promise<void> => {
    const response = await fetchFn(`${API_HOST}/students/animals`, {
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
  getUserRole: async (fetchFn: Fetch): Promise<Role> => {
    const response = await fetchFn(`${API_HOST}/users/role`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się sprawdzić preferencji użytkownika");
    }

    return await response.json();
  },
  getCurrentUser: async (fetchFn: Fetch): Promise<UserDetailsDTO> => {
    const response = await fetchFn(`${API_HOST}/users/context`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać kontekstu użytkownika");
    }

    return await response.json();
  },
  setUserPreferredCourse: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<void> => {
    const response = await fetchFn(
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
  changePassword: async (
    fetchFn: Fetch,
    request: ChangePasswordDTO
  ): Promise<void> => {
    const response = await fetchFn(`${API_HOST}/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zmienić hasła!");
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

  inviteUser: async (
    fetchFn: Fetch,
    request: InviteRequestDTO
  ): Promise<void> => {
    const response = await fetchFn(`${API_HOST}/invitation/course`, {
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

  register: async (
    fetchFn: Fetch,
    request: RegisterRequestDTO
  ): Promise<void> => {
    const response = await fetchFn(`${API_HOST}/invitation/register-user`, {
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
