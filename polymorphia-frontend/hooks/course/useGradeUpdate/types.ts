import { GradeRequestDTO } from "@/interfaces/api/grade/grade";

export interface UseGradeUpdate {
  mutate: (variables: GradeRequestDTO) => void;
}
