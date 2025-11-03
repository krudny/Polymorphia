import {
  InviteRequestDTO,
  RegisterRequestDTO,
  ChangePasswordDTO,
  Role,
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import {
  CreateAnimalRequestDTO,
  StudentCourseGroupAssignmentIdResponseDTO,
  StudentProfileResponseDTO,
} from "@/interfaces/api/student";
import { fetchJson, getEndpoint, postEndpoint } from "@/services/api/client";

const UserService = {
  getStudentProfile: async (
    courseId: number
  ): Promise<StudentProfileResponseDTO> => {
    return await fetchJson<StudentProfileResponseDTO>(
      getEndpoint(`/students/profile?courseId=${courseId}`)
    );
  },
  hasValidAnimalInCourse: async (courseId: number): Promise<boolean> => {
    return await fetchJson<boolean>(
      getEndpoint(`/students/animals/is-valid?courseId=${courseId}`)
    );
  },
  getCourseGroup: async (
    courseId: number
  ): Promise<StudentCourseGroupAssignmentIdResponseDTO> => {
    return await fetchJson<StudentCourseGroupAssignmentIdResponseDTO>(
      getEndpoint(`/students/course-group?courseId=${courseId}`)
    );
  },
  createAnimal: async (request: CreateAnimalRequestDTO): Promise<void> => {
    await postEndpoint("/students/animals", JSON.stringify(request), true);
  },
  getUserRole: async (): Promise<Role> => {
    return await fetchJson<Role>(getEndpoint("/users/role"));
  },
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    return await fetchJson<UserDetailsDTO>(getEndpoint("/users/context"));
  },
  setUserPreferredCourse: async (courseId: number): Promise<void> => {
    await postEndpoint(`/users/preferred-course?courseId=${courseId}`);
  },
  changePassword: async (request: ChangePasswordDTO): Promise<void> => {
    await postEndpoint("/users/change-password", JSON.stringify(request), true);
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
    await postEndpoint("/invitation/course", JSON.stringify(request), true);
  },

  register: async (request: RegisterRequestDTO): Promise<void> => {
    await postEndpoint(
      "/invitation/register-user",
      JSON.stringify(request),
      true
    );
  },
};

export default UserService;
