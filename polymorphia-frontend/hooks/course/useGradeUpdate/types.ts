import { GradeRequestDTO } from "@/interfaces/api/grade";

export interface UseGradeUpdate {
  mutate: (variables: GradeRequestDTO) => void;
}
