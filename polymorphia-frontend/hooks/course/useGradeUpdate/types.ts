import { CriteriaDetails } from "@/providers/grading/gradingReducer/types";

export interface UseGradeUpdate {
  mutate: (variables: {
    studentId: number;
    gradableEventId: number;
    criteria: Record<number, CriteriaDetails>;
    comment: string;
  }) => void;
}
