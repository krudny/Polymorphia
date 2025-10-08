export interface AnimalResponseDTO {
  id: number;
  name: string;
}

export interface StudentProfileResponseDTO {
  xpDetails: Record<string, string>;
  evolutionStageThresholds: EvolutionStagesThresholdResponseDTO[];
  leftEvolutionStage: EvolutionStagesThresholdResponseDTO;
  rightEvolutionStage: EvolutionStagesThresholdResponseDTO;
  totalStudentsInCourse: number;
  totalXp: number;
}

export interface EvolutionStagesThresholdResponseDTO {
  id: number;
  name: string;
  minXp: number;
  grade: number;
}

export interface CreateAnimalRequestDTO {
  animalName: string;
  courseId: number;
}
