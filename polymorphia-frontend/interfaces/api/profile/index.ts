export interface StudentProfileDTO {
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
