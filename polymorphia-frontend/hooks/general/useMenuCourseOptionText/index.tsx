import { Role, Roles } from "@/interfaces/api/user";

export function useMenuCourseOptionText(userRole: Role) {
  const isInstructorOrCoordinator =
    userRole === Roles.COORDINATOR || userRole === Roles.INSTRUCTOR;
  return isInstructorOrCoordinator ? "Ocenianie" : "Kurs";
}
