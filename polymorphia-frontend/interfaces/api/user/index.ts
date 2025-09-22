//TODO: handle which one is optional
export interface UserDetailsDTO {
  id: number;
  studentName: string;
  animalName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  position: number;
}

export interface InviteStudentRequestDTO {
  firstName: string;
  lastName: string;
  indexNumber: number;
  email: string;
}