import {
  HallOfFameRecordDTO,
  HallOfFameResponseDTO,
} from "@/interfaces/api/hall-of-fame";
import { API_HOST } from "@/services/api";

const HallOfFameService = {
  getHallOfFame: async (
    page: number,
    size: number,
    courseId: number,
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
        courseId: courseId,
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

    const data = await response.json();

    // Should return page: -1 when user is not in results
    return {
      ...data,
      currentUser: {
        page: 0,
      },
    };
  },
  getPodium: async (courseId: number): Promise<HallOfFameRecordDTO[]> => {
    const response = await fetch(
      `${API_HOST}/hall-of-fame/podium?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch hall of fame podium!");
    }
    return await response.json();
  },
};

export default HallOfFameService;
