import { EvolutionStageSlide, ItemSlide } from "@/interfaces/slider/SliderInterfaces";
import { ApiEvolutionStagesResponse, ApiRewardResponse } from "@/interfaces/api/FaqInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const FaqService = {
  getEvolutionStages: async (): Promise<EvolutionStageSlide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/evolution-stages`);
      const data = await response.json();
      return data
          .sort((a: ApiEvolutionStagesResponse, b: ApiEvolutionStagesResponse) => a.minXp - b.minXp)
          .map((evolutionStage: ApiEvolutionStagesResponse) => ({
            type: 'evolution-stage',
            name: evolutionStage.name,
            description: evolutionStage.description,
            imageUrl: evolutionStage.imageUrl,
            textGrade: `${evolutionStage.minXp} XP odblokowuje ocenę ${evolutionStage.grade.toFixed(1)}`,
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
      return data.map((reward: ApiRewardResponse) => {
        return {
          type: 'item',
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
  }
}

export default FaqService;
