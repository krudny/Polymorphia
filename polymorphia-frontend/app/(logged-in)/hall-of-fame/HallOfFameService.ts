/* eslint-disable */

import {HallOfFameRecordDTO, HallOfFameResponseDTO} from "@/interfaces/api/DTO";
import {API_HOST} from "@/services/api";

const HallOfFameService = {
  getHallOfFame: async (
    page: number,
    size: number,
    searchTerm: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc",
    groups?: string[]
  ): Promise<HallOfFameResponseDTO> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!sortBy || !sortOrder) {
      sortBy = "total";
      sortOrder = "desc";
    }

    if (sortBy === "name"){
      sortBy = "animalName";
    }

    const response = await fetch(
        `${API_HOST}/hall-of-fame`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: 1,
            page: page,
            size: size,
            searchTerm: (!searchTerm || searchTerm.trim() === "") ? "" : searchTerm,
            searchBy: "animalName",
            sortBy: sortBy,
            sortOrder: sortOrder,
            groups: (groups && !groups?.includes("all")) ? groups : [],
          })
        }
    );
    if (!response.ok) throw new Error("Failed to fetch hall of fame!");
    return await response.json();
  },
  getPodium: async (): Promise<HallOfFameRecordDTO[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetch(
        `${API_HOST}/hall-of-fame/podium?courseId=1`,
        { credentials: "include" }
    );
    if (!response.ok) throw new Error("Failed to fetch hall of fame podium!");
    return await response.json();
  },
};

export default HallOfFameService;
