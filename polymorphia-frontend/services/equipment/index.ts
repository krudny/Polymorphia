import {
  ChestPotentialXpResponseDTOWithType,
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { apiFetch, apiFetchJson } from "@/services/api/client";

const EquipmentService = {
  getItems: async (courseId: number): Promise<EquipmentItemResponseDTO[]> => {
    return await apiFetchJson<EquipmentItemResponseDTO[]>(
      `/equipment/items?courseId=${courseId}`
    );
  },

  getChests: async (courseId: number): Promise<EquipmentChestResponseDTO[]> => {
    return await apiFetchJson<EquipmentChestResponseDTO[]>(
      `/equipment/chests?courseId=${courseId}`
    );
  },

  pickChestItems: async (
    courseId: number,
    requestBody: EquipmentChestOpenRequestDTO
  ) => {
    await apiFetch(`/equipment/chests/open?courseId=${courseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
  },

  getPotentialXp: async (
    courseId: number,
    assignedChestId: number
  ): Promise<ChestPotentialXpResponseDTOWithType> => {
    return await apiFetchJson<ChestPotentialXpResponseDTOWithType>(
      `/equipment/chests/potential-xp?courseId=${courseId}&assignedChestId=${assignedChestId}`
    );
  },
};

export default EquipmentService;
