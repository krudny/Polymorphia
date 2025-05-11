import {ChestSlide, EvolutionStageSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";
import {ChestResponseDto, EvolutionStageResponseDto, ItemResponseDTO} from "@/interfaces/api/DTO";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<EvolutionStageSlide[]> => {
    const response = await fetch(
      `${API_HOST}/courses/${courseId}/evolution-stages`,
      { credentials: "include" }
    );
    if (!response.ok) throw new Error("Failed to fetch evolution stages!");
    const data = await response.json();
    return data.map((evolutionStage: EvolutionStageResponseDto) => ({
      type: "evolution-stage",
      name: evolutionStage.name,
      description: evolutionStage.description,
      imageUrl: evolutionStage.imageUrl,
      gradingText: evolutionStage.gradingText,
    }));
  },

  getItems: async (courseId: number): Promise<ItemSlide[]> => {
    const response = await fetch(`${API_HOST}/courses/${courseId}/items`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch items!");
    const data = await response.json();
    return data.map((item: ItemResponseDTO) => {
      return {
        type: "item",
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        textBonus: item.textBonus,
        chestIds: item.chestIds,
      } as ItemSlide;
    });
  },

  getChests: async (courseId: number): Promise<ChestSlide[]> => {
    const response = await fetch(`${API_HOST}/courses/${courseId}/chests`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch chests");
    const data = await response.json();
    return data.map((chest: ChestResponseDto) => {
      return {
        type: "chest",
        id: chest.id,
        name: chest.name,
        description: chest.description,
        imageUrl: chest.imageUrl,
        behavior: chest.behavior,
        itemIds: chest.itemIds,
      } as ChestSlide;
    });
  },
};

export default KnowledgeBaseService;
