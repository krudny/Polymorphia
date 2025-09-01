//TODO: handle which one is optional
export interface UserDetailsDTO {
  id: number;
  userName: string;
  courseId: number;
  animalName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  position: number;
}

export interface UserDetailsDTOWithRefresh extends UserDetailsDTO {
  refresh: () => unknown;
}

export interface AvailableCoursesDTO {
  id: number;
  name: string;
  coordinator: string;
  imageUrl: string;
  userRole: string;
}
