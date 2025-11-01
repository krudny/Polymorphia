import {
  InviteRequestDTO,
  RegisterRequestDTO,
  ChangePasswordDTO,
  Role,
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { apiFetch, apiFetchJson } from "@/services/api/client";
import {
  CreateAnimalRequestDTO,
  StudentCourseGroupAssignmentIdResponseDTO,
  StudentProfileResponseDTO,
} from "@/interfaces/api/student";

const UserService = {
  getStudentProfile: async (
    courseId: number
  ): Promise<StudentProfileResponseDTO> => {
    return await apiFetchJson<StudentProfileResponseDTO>(
      `/students/profile?courseId=${courseId}`
    );
  },
  hasValidAnimalInCourse: async (courseId: number): Promise<boolean> => {
    return await apiFetchJson<boolean>(
      `/students/animals/is-valid?courseId=${courseId}`
    );
  },
  getCourseGroup: async (
    courseId: number
  ): Promise<StudentCourseGroupAssignmentIdResponseDTO> => {
    return await apiFetchJson<StudentCourseGroupAssignmentIdResponseDTO>(
      `/students/course-group?courseId=${courseId}`
    );
  },
  createAnimal: async (request: CreateAnimalRequestDTO): Promise<void> => {
    await apiFetch("/students/animals", {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserRole: async (): Promise<Role> => {
    return await apiFetchJson<Role>("/users/role");
  },
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    return await apiFetchJson<UserDetailsDTO>("/users/context");
  },
  setUserPreferredCourse: async (courseId: number): Promise<void> => {
    await apiFetch(`/users/preferred-course?courseId=${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  changePassword: async (request: ChangePasswordDTO): Promise<void> => {
    await apiFetch("/users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
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
    await apiFetch("/invitation/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  },

  register: async (request: RegisterRequestDTO): Promise<void> => {
    await apiFetch("/invitation/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  },
};

export default UserService;
