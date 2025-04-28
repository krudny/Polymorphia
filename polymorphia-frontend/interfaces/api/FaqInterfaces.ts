export interface ApiItemsResponse {
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

export interface ApiEvolutionStagesResponse {
  id: number;
  name: string;
  description: string;
  minXp: number;
  grade: number;
  imageUrl: string;
  imageWithoutBgUrl: string | null;
  courseId: number;
  gradingText: string;
}

export interface ApiChestsResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  behavior: string;
  courseId: number;
  itemIds: number[]
}