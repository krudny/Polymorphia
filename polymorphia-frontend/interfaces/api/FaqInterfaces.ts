export interface ApiRewardResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  limit: number;
  textBonus: string;
  eventSectionId: number;
  type: string; //TODO
  chestIds: number[];
  textBehavior: string;
  percentageBonus: number;
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
}