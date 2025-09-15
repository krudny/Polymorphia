import {
  HallOfFameRecordDTO,
  HallOfFameResponseDTO,
} from "@/interfaces/api/hall-of-fame";
import { API_HOST } from "@/services/api";

const HallOfFameService = {
  getHallOfFame: async (
    page: number,
    size: number,
    searchTerm: string,
    sortBy: string,
    sortOrder: string,
    groups?: string[]
  ): Promise<HallOfFameResponseDTO> => {
    const response = await fetch(`${API_HOST}/hall-of-fame`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: 1,
        page: page,
        size: size,
        searchTerm: !searchTerm || searchTerm.trim() === "" ? "" : searchTerm,
        searchBy: "animalName",
        sortBy: sortBy,
        sortOrder: sortOrder,
        groups: groups && !groups?.includes("all") ? groups : [],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch hall of fame!");
    }
    return await response.json();
  },
  getPodium: async (): Promise<HallOfFameRecordDTO[]> => {
    const response = await fetch(`${API_HOST}/hall-of-fame/podium?courseId=1`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch hall of fame podium!");
    }
    return await response.json();
  },
};

export default HallOfFameService;
