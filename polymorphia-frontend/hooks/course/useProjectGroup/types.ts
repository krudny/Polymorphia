import { StudentDetailsDTOWithType } from "@/interfaces/api/user";

export interface UseProjectGroup {
  data: StudentDetailsDTOWithType[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
