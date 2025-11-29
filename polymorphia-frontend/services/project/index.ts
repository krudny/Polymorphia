import {
  ProjectGroupConfigurationResponseDTO,
  ProjectVariantResponseDTO,
} from "@/interfaces/api/project";
import { ApiClient } from "@/services/api/client";
import {
  StudentDetailsDTOWithName,
  StudentDetailsDTOWithType,
} from "@/interfaces/api/user";
import { TargetRequestDTO } from "@/interfaces/api/target";
import UserService from "../user";

export const ProjectService = {
  getProjectVariant: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    return ApiClient.post(
      `/projects/variants?projectId=${gradableEventId}`,
      target
    );
  },

  getProjectGroup: async (
    studentId: number,
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithType[]> => {
    return await ApiClient.get<StudentDetailsDTOWithType[]>(
      `/projects/group?studentId=${studentId}&projectId=${gradableEventId}`
    );
  },

  getProjectGroupConfiguration: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ProjectGroupConfigurationResponseDTO> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    return {
      studentIds: [1, 2],
      selectedVariants: {
        1: 1,
        2: 2,
      },
    };
  },

  // IMPORTANT FOR BACKEND IMPLEMENTATION!
  // if target is provided, we want to get all students without project group assigned
  // for this project AND students that are assigned to the group related to the target
  getProjectGroupConfigurationGroupPickStudents: async (
    target: TargetRequestDTO | null,
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithName[]> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });

    const users = await UserService.getRandomUsers();
    return users.map((user) => user.userDetails);
  },
};
