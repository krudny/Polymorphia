export interface ItemResponseDTO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  limit: number;
  textBonus: string;
  eventSectionId: number;
  chestIds: number[];
  textBehavior: string;
}

export interface EvolutionStageResponseDto {
  id: number;
  name: string;
  description: string;
  minXp: number;
  grade: number;
  imageUrl: string;
  courseId: number;
  gradingText: string;
}

export interface ChestResponseDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  behavior: string;
  courseId: number;
  itemIds: number[];
}

export interface LoginDto {
  email: string;
  password: string;
}
