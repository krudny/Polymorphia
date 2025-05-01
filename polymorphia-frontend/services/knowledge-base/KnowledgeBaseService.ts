import {ChestSlide, EvolutionStageSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";
import {ChestResponseDto, EvolutionStageResponseDto, ItemResponseDTO} from "@/interfaces/api/DTO";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const KnowledgeBaseService = {
  getEvolutionStages: async (courseId: number): Promise<EvolutionStageSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/${courseId}/evolution-stages`);
      const data = await response.json();
      return data
          .map((evolutionStage: EvolutionStageResponseDto) => ({
            type: 'evolution-stage',
            name: evolutionStage.name,
            description: evolutionStage.description,
            imageUrl: evolutionStage.imageUrl,
            gradingText: evolutionStage.gradingText,
          }));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getItems: async (courseId: number): Promise<ItemSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/${courseId}/items`);
      const data = await response.json();
      return data.map((item: ItemResponseDTO) => {
        return {
          type: 'item',
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          textBonus: item.textBonus,
          chestIds: item.chestIds,
        } as ItemSlide;
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getChests: async (courseId: number): Promise<ChestSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/${courseId}/chests`);
      const data = await response.json();
      return data.map((chest: ChestResponseDto) => {
        return {
          type: 'chest',
          id: chest.id,
          name: chest.name,
          description: chest.description,
          imageUrl: chest.imageUrl,
          behavior: chest.behavior,
          itemIds: chest.itemIds,
        } as ChestSlide;
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default KnowledgeBaseService;
