import { StudentTargetData } from "@/interfaces/api/grade";

export interface UseRandomPeopleWithPoints {
  data: StudentTargetData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
