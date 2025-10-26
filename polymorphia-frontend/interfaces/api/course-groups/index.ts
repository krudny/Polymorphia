export interface CourseGroupsResponseDTO {
  id: number;
  name: string;
  details: string;
  studentCount: number;
}

export interface CourseGroupsShortResponseDTO {
  id: number;
  name: string;
}

export interface StudentLastGradableEventsDTO {
  id: number;
  gradableEventName: string;
}

export interface StudentGradableEventDetailsDTO {
  id: number;
  criteriaName: string;
  gainedXp: number;
  hasReward: boolean;
  gradeDate: string;
}
