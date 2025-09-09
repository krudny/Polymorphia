export interface StudentProfileDTO {
  xpDetails: Record<string, string>;
  evolutionStageThresholds: EvolutionStagesThresholdResponseDTO[];
  totalStudentsInCourse: number;
  totalXp: number;
}

export interface EvolutionStagesThresholdResponseDTO {
  id: number;
  name: string;
  gradingThreshold: string;
}
