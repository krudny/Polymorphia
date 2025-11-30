import {
  ProjectCategoryWithVariantsResponseDTO,
  ProjectGroupConfigurationResponseDTO,
  ProjectVariantWithCategoryNameResponseDTO,
} from "@/interfaces/api/project";
import { ApiClient } from "@/services/api/client";
import {
  StudentDetailsDTOWithName,
  StudentDetailsDTOWithType,
} from "@/interfaces/api/user";
import { TargetRequestDTO } from "@/interfaces/api/target";
import { ProjectGroupConfigurationPartialFilterConfig } from "@/providers/project-group-configuration/types";

export const ProjectService = {
  getProjectVariant: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ProjectVariantWithCategoryNameResponseDTO[]> => {
    return ApiClient.post(
      `/projects/variants?projectId=${gradableEventId}`,
      target
    );
  },

  getProjectCategories: async (
    gradableEventId: number
  ): Promise<ProjectCategoryWithVariantsResponseDTO[]> => {
    return ApiClient.get<ProjectCategoryWithVariantsResponseDTO[]>(
      `/projects/variants/categories?projectId=${gradableEventId}`
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
    return await ApiClient.post<ProjectGroupConfigurationResponseDTO>(
      `/projects/group/configuration?projectId=${gradableEventId}`,
      target
    );
  },

  getProjectGroupConfigurationFilterConfigs: async (
    target: TargetRequestDTO | null,
    gradableEventId: number
  ): Promise<ProjectGroupConfigurationPartialFilterConfig> => {
    return await ApiClient.post<ProjectGroupConfigurationPartialFilterConfig>(
      `/projects/group/configuration/filters?projectId=${gradableEventId}`,
      target
    );
  },

  getProjectGroupConfigurationGroupPickStudents: async (
    target: TargetRequestDTO | null,
    groups: string[],
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithName[]> => {
    return await ApiClient.post<StudentDetailsDTOWithName[]>(
      `/projects/group/students?projectId=${gradableEventId}`,
      {
        target,
        groups,
      }
    );
  },

  submitProjectGroupConfiguration: async (
    target: TargetRequestDTO | null,
    gradableEventId: number,
    configuration: ProjectGroupConfigurationResponseDTO
  ): Promise<void> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
  },

  deleteProjectGroup: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<void> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
  },

  // Returns map categoryId -> variantId
  getRandomProjectVariant: async (
    target: TargetRequestDTO | null,
    gradableEventId: number
  ): Promise<Record<number, number>> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });

    const getRandomInt = (min: number, max: number) => {
      // The maximum is exclusive and the minimum is inclusive
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    };

    return {
      1: getRandomInt(1, 8),
      2: getRandomInt(8, 12),
    };
  },
};
