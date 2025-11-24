import {
  HallOfFameRecordDTO,
  HallOfFameResponseDTO,
} from "@/interfaces/api/hall-of-fame";
import { ApiClient } from "@/services/api/client";

const HallOfFameService = {
  getHallOfFame: async (
    page: number,
    size: number,
    courseId: number,
    searchTerm: string,
    searchBy: string,
    sortBy: string,
    sortOrder: string,
    groups?: string[]
  ): Promise<HallOfFameResponseDTO> => {
    return await ApiClient.post<HallOfFameResponseDTO>("/hall-of-fame", {
      courseId: courseId,
      page: page,
      size: size,
      searchTerm: !searchTerm || searchTerm.trim() === "" ? "" : searchTerm,
      searchBy: searchBy,
      sortBy: sortBy,
      sortOrder: sortOrder,
      groups: groups && !groups?.includes("all") ? groups : [],
    });
  },
  getPodium: async (courseId: number): Promise<HallOfFameRecordDTO[]> => {
    return await ApiClient.get<HallOfFameRecordDTO[]>(
      `/hall-of-fame/podium?courseId=${courseId}`
    );
  },
};

export default HallOfFameService;
