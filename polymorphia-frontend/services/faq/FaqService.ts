import { EvolutionStageSlide, ItemSlide } from "@/interfaces/slider/SliderInterfaces";
import { ApiEvolutionStagesResponse, ApiItemResponse } from "@/interfaces/api/FaqInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const FaqService = {
  getAnimals: async (): Promise<EvolutionStageSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/evolution-stages`);
      const data = await response.json();
      return data
          .sort((a: ApiEvolutionStagesResponse, b: ApiEvolutionStagesResponse) => a.minXp - b.minXp)
          .map((item: ApiEvolutionStagesResponse) => ({
            type: 'evolution-stage',
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            textGrade: `Ocenę ${item.grade.toFixed(1)} odblokowuje ${item.minXp} XP`
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
      return data.map((item: ApiItemResponse) => {
        return {
          type: 'item',
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
  }
}

export default FaqService;
