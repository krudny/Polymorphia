import { HallOfFameUserDTO, Roles, Role } from "@/interfaces/api/user";

export function getDisplayName(
  studentDetails: HallOfFameUserDTO,
  userRole: Role,
  areAnimalNamesVisible: boolean
): string {
  if (areAnimalNamesVisible) {
    return studentDetails.animalName;
  }

  if (userRole !== Roles.STUDENT && studentDetails.fullName) {
    return studentDetails.fullName;
  }

  return studentDetails.animalName;
}
