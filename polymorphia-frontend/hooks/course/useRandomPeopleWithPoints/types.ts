import { StudentTargetData } from "@/interfaces/api/target";

export interface UseRandomPeopleWithPoints {
  data: StudentTargetData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
