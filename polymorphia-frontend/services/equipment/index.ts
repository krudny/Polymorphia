import {
  ChestPotentialXpResponseDTOWithType,
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { API_HOST } from "@/services/api";
import { Fetch } from "@/hooks/general/useFetch/types";

const EquipmentService = {
  getItems: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<EquipmentItemResponseDTO[]> => {
    const response = await fetchFn(
      `${API_HOST}/equipment/items?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać przedmiotów!");
    }

    return await response.json();
  },

  getChests: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<EquipmentChestResponseDTO[]> => {
    const response = await fetchFn(
      `${API_HOST}/equipment/chests?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać skrzynek!");
    }

    return await response.json();
  },

  pickChestItems: async (
    fetchFn: Fetch,
    courseId: number,
    requestBody: EquipmentChestOpenRequestDTO
  ) => {
    const response = await fetchFn(
      `${API_HOST}/equipment/chests/open?courseId=${courseId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się otworzyć skrzynki!");
    }
  },

  getPotentialXp: async (
    fetchFn: Fetch,
    courseId: number,
    assignedChestId: number
  ): Promise<ChestPotentialXpResponseDTOWithType> => {
    const response = await fetchFn(
      `${API_HOST}/equipment/chests/potential-xp?courseId=${courseId}&assignedChestId=${assignedChestId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać szacowanej wartości bonusów!");
    }

    return await response.json();
  },
};

export default EquipmentService;
