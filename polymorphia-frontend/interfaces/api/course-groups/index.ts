export interface CourseGroupsResponseDTO {
  id: number;
  name: string;
  room: string;
  teachingRoleId: number;
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

export interface CreateCourseGroupRequestDTO {
  name: string;
  room: string;
  courseId: number;
  teachingRoleId: number;
}

export interface TeachingRoleUserResponseDTO {
  userId: number;
  fullName: string;
}

export interface UpdateCourseGroupRequestDTO {
  name: string;
  room: string;
  teachingRoleId: number;
}

export interface ChangeStudentCourseGroupRequestDTO {
  animalId: number;
  newCourseGroupId: number;
}
