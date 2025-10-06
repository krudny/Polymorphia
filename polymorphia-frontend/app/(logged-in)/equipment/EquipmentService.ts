import {
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { API_HOST } from "@/services/api";

const EquipmentService = {
  getItems: async (courseId: number): Promise<EquipmentItemResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/equipment/items?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać przedmiotów!");
    }

    return await response.json();
  },

  getChests: async (courseId: number): Promise<EquipmentChestResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/equipment/chests?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać skrzynek!");
    }

    return await response.json();
  },

  pickChestItems: async (
    courseId: number,
    requestBody: EquipmentChestOpenRequestDTO
  ) => {
    const response = await fetch(
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
};

export default EquipmentService;
