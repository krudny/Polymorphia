import {
  ChestPotentialXpResponseDTOWithType,
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { ApiClient } from "@/services/api/client";

const EquipmentService = {
  getItems: async (courseId: number): Promise<EquipmentItemResponseDTO[]> => {
    return await ApiClient.get<EquipmentItemResponseDTO[]>(
      `/equipment/items?courseId=${courseId}`
    );
  },

  getChests: async (courseId: number): Promise<EquipmentChestResponseDTO[]> => {
    return await ApiClient.get<EquipmentChestResponseDTO[]>(
      `/equipment/chests?courseId=${courseId}`
    );
  },

  pickChestItems: async (
    courseId: number,
    requestBody: EquipmentChestOpenRequestDTO
  ) => {
    await ApiClient.post(
      `/equipment/chests/open?courseId=${courseId}`,
      requestBody
    );
  },

  getPotentialXp: async (
    courseId: number,
    assignedChestId: number
  ): Promise<ChestPotentialXpResponseDTOWithType> => {
    return await ApiClient.get<ChestPotentialXpResponseDTOWithType>(
      `/equipment/chests/potential-xp?courseId=${courseId}&assignedChestId=${assignedChestId}`
    );
  },
};

export default EquipmentService;
