import {API_HOST} from "@/services/api";
import {HallOfFameResponseDTO} from "@/interfaces/api/DTO";

const HallOfFameService = {
  getHallOfFame: async (page: number, size: number, searchTerm: string): Promise<HallOfFameResponseDTO> => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('size', String(size));
    if (searchTerm) {
      params.append('searchTerm', searchTerm);
    }
    const response = await fetch(`${API_HOST}/test?${params.toString()}`);
    return await response.json();
  },

  getHallOfFameNames: async (): Promise<string[]> => {
    const response = await fetch(`${API_HOST}/test/names`);
    return await response.json();
  },

  getHallOfFameNamesSuggestions: async (searchTerm: string): Promise<string[]> => {
    const response = await fetch(`${API_HOST}/test/names?searchTerm=${encodeURIComponent(searchTerm)}`);
    return await response.json();
  }
};

export default HallOfFameService;