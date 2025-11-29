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
import UserService from "../user";

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

  getProjectVariants: async (
    gradableEventId: number
  ): Promise<ProjectCategoryWithVariantsResponseDTO[]> => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });

    return [
      {
        id: 1,
        name: "Mapa i roślinność",
        variants: [
          {
            id: 1,
            name: "Bieguny",
            shortCode: "A",
            imageUrl: "placeholder",
          },
          {
            id: 2,
            name: "Pożary",
            shortCode: "B",
            imageUrl: "placeholder",
          },
          {
            id: 3,
            name: "Przypływy i odpływy",
            shortCode: "C",
            imageUrl: "placeholder",
          },
          {
            id: 4,
            name: "Dziki sowoniedźwiedź",
            shortCode: "D",
            imageUrl: "placeholder",
          },
          {
            id: 5,
            name: "Życiodajne truchła",
            shortCode: "E",
            imageUrl: "placeholder",
          },
          {
            id: 6,
            name: "Pełzająca dżungla",
            shortCode: "F",
            imageUrl: "placeholder",
          },
          {
            id: 7,
            name: "Dorodne plony",
            shortCode: "G",
            imageUrl: "placeholder",
          },
        ],
      },
      {
        id: 2,
        name: "Mapa i roślinność",
        variants: [
          {
            id: 8,
            name: "Lekka korekta",
            shortCode: "1",
            imageUrl: "placeholder",
          },
          {
            id: 9,
            name: "Podmianka",
            shortCode: "2",
            imageUrl: "placeholder",
          },
          {
            id: 10,
            name: "Nieco szaleństwa",
            shortCode: "3",
            imageUrl: "placeholder",
          },
          {
            id: 11,
            name: "Starość nie radość",
            shortCode: "4",
            imageUrl: "placeholder",
          },
        ],
      },
    ];
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
