import { TargetRequestDTO } from "@/interfaces/api/target";
import { StudentDetailsDTOWithName } from "@/interfaces/api/user";

export interface UseProjectGroupConfigurationGroupPickStudentsProps {
  target: TargetRequestDTO | null;
}

export interface UseProjectGroupConfigurationGroupPickStudents {
  data: StudentDetailsDTOWithName[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
