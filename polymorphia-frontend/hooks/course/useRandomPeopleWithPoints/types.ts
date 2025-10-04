import { StudentTargetData } from "@/interfaces/api/grade/target";

export interface UseRandomPeopleWithPoints {
  data: StudentTargetData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
