import {API_HOST} from "@/services/api";
import {HallOfFameResponseDTO} from "@/interfaces/api/DTO";

const HallOfFameService = {
  getHallOfFame: async (page: number, size: number, searchTerm: string): Promise<HallOfFameResponseDTO> => {
    const response = await fetch(`${API_HOST}/test?page=${page}&size=${size}&searchTerm=${searchTerm}`);
    return await response.json();
  },

  getHallOfFameNames: async (): Promise<string[]> => {
    const response = await fetch(`${API_HOST}/test/name}`);
    return await response.json();
  }
};

export default HallOfFameService;