export interface CourseGroupsResponseDTO {
  id: number;
  name: string;
  room: string;
  studentCount: number;
}

export interface CourseGroupsShortResponseDTO {
  id: number;
  name: string;
}

export interface StudentLastActivityDTO {
  id: number;
  gradableEventName: string;
  gainedXp: number;
  hasReward: boolean;
  gradeDate: string;
}
