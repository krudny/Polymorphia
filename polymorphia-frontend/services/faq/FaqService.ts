import {ChestSlide, EvolutionStageSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";
import {ApiChestsResponse, ApiEvolutionStagesResponse, ApiItemsResponse} from "@/interfaces/api/FaqInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const FaqService = {
  getEvolutionStages: async (): Promise<EvolutionStageSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/evolution-stages`);
      const data = await response.json();
      return data
          .map((evolutionStage: ApiEvolutionStagesResponse) => ({
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

  getItems: async (): Promise<ItemSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/items`);
      const data = await response.json();
      return data.map((reward: ApiItemsResponse) => {
        return {
          type: 'item',
          id: reward.id,
          name: reward.name,
          description: reward.description,
          imageUrl: reward.imageUrl,
          textBonus: reward.textBonus,
          chestIds: reward.chestIds,
        } as ItemSlide;
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getChests: async (): Promise<ChestSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/chests`);
      const data = await response.json();
      return data.map((chest: ApiChestsResponse) => {
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

export default FaqService;
