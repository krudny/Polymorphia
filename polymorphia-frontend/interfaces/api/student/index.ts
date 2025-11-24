export interface StudentProfileResponseDTO {
  xpDetails: Record<string, string>;
  evolutionStageThresholds: EvolutionStagesThresholdResponseDTO[];
  leftEvolutionStage: EvolutionStagesThresholdResponseDTO;
  rightEvolutionStage: EvolutionStagesThresholdResponseDTO;
  totalStudentsInCourse: number;
  totalXp: number;
}

export interface StudentSummaryResponseDTO {
  studentName: string;
  animalName: string;
  imageUrl: string;
  leftEvolutionStage: EvolutionStagesThresholdResponseDTO;
  rightEvolutionStage: EvolutionStagesThresholdResponseDTO;
  totalStudentsInCourse: number;
  position: number;
  totalXp: number;
}

export interface EvolutionStagesThresholdResponseDTO {
  id: number;
  name: string;
  minXp: number;
  grade: number;
}

export interface StudentCourseGroupAssignmentIdResponseDTO {
  studentId: number;
  courseGroupId: number;
}

export interface CreateAnimalRequestDTO {
  animalName: string;
  courseId: number;
  courseGroupId: number;
}
