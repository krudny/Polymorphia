import {
  ChestPotentialXpResponseDTOWithType,
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { fetchJson, getEndpoint, postEndpoint } from "@/services/api/client";

const EquipmentService = {
  getItems: async (courseId: number): Promise<EquipmentItemResponseDTO[]> => {
    return await fetchJson<EquipmentItemResponseDTO[]>(
      getEndpoint(`/equipment/items?courseId=${courseId}`)
    );
  },

  getChests: async (courseId: number): Promise<EquipmentChestResponseDTO[]> => {
    return await fetchJson<EquipmentChestResponseDTO[]>(
      getEndpoint(`/equipment/chests?courseId=${courseId}`)
    );
  },

  pickChestItems: async (
    courseId: number,
    requestBody: EquipmentChestOpenRequestDTO
  ) => {
    await fetchJson(
      postEndpoint(
        `/equipment/chests/open?courseId=${courseId}`,
        JSON.stringify(requestBody),
        true
      )
    );
  },

  getPotentialXp: async (
    courseId: number,
    assignedChestId: number
  ): Promise<ChestPotentialXpResponseDTOWithType> => {
    return await fetchJson<ChestPotentialXpResponseDTOWithType>(
      getEndpoint(
        `/equipment/chests/potential-xp?courseId=${courseId}&assignedChestId=${assignedChestId}`
      )
    );
  },
};

export default EquipmentService;
