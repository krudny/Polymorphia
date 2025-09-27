import { Role } from "@/interfaces/api/user";

export interface AvailableCoursesDTO {
  id: number;
  name: string;
  coordinatorName: string;
  imageUrl: string;
  userRole: Role;
}
