import { StudentDetailsDTOWithType } from "@/interfaces/api/user";

export interface UseRandomPeopleWithPoints {
  data: (StudentDetailsDTOWithType & { gainedXp?: string })[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
