import { CriteriaDetails } from "@/providers/grading/gradingReducer/types";
import { TargetRequestDTO } from "../useShortGrade/types";

export interface UseGradeUpdate {
  mutate: (variables: {
    target: TargetRequestDTO;
    gradableEventId: number;
    criteria: Record<number, CriteriaDetails>;
    comment: string;
  }) => void;
}
