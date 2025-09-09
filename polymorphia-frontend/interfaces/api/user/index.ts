//TODO: handle which one is optional
export const Roles = {
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  COORDINATOR: "COORDINATOR",
  UNDEFINED: "UNDEFINED",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const RoleTextMap: Record<Role, string> = {
  [Roles.STUDENT]: "Student",
  [Roles.INSTRUCTOR]: "Prowadzący",
  [Roles.COORDINATOR]: "Koordynator",
  [Roles.UNDEFINED]: "Nieokreślony",
};

export interface BaseUserDetails {
  id: number;
  userName?: string;
  courseId: number;
  imageUrl: string;
}

interface BaseUserDetailsDTOWithType<
  T extends Role,
  R extends BaseUserDetails,
> {
  userType: T;
  userDetails: R;
}

export interface StudentDetailsDTO extends BaseUserDetails {
  animalName: string;
  evolutionStage: string;
  group: string;
  position: number;
}

export type StudentDetailsDTOWithType = BaseUserDetailsDTOWithType<
  typeof Roles.STUDENT,
  StudentDetailsDTO
>;
export type InstructorDetailsDTOWithType = BaseUserDetailsDTOWithType<
  typeof Roles.INSTRUCTOR,
  BaseUserDetails
>;
export type CoordinatorDetailsDTOWithType = BaseUserDetailsDTOWithType<
  typeof Roles.COORDINATOR,
  BaseUserDetails
>;
export type UndefinedDetailsDTOWithType = BaseUserDetailsDTOWithType<
  typeof Roles.UNDEFINED,
  BaseUserDetails
>;

export type UserDetailsDTO =
  | StudentDetailsDTOWithType
  | InstructorDetailsDTOWithType
  | CoordinatorDetailsDTOWithType
  | UndefinedDetailsDTOWithType;

export default function isStudent(
  user: UserDetailsDTO
): user is StudentDetailsDTOWithType {
  return user.userType === Roles.STUDENT;
}

export function isUndefined(
  user: UserDetailsDTO
): user is StudentDetailsDTOWithType {
  return user.userType === Roles.UNDEFINED;
}

export interface AvailableCoursesDTO {
  id: number;
  name: string;
  coordinator: string;
  imageUrl: string;
  userRole: Role;
}
