import { UserDetailsDTO } from "@/interfaces/api/user";
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { CriterionResponseDTO } from "@/interfaces/api/grade";
import { Dispatch } from "react";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/components/providers/grading/GradingContext";

export type GradingContextInterface = {
  search: string;
  setSearch: (search: string) => void;
  students: (UserDetailsDTO & { gainedXp?: string })[] | undefined;
  isStudentsLoading: boolean;
  projectGroups: ProjectGroupResponseDTO[] | undefined;
  isProjectGroupsLoading: boolean;
  isGradeLoading: boolean;
  criteria: CriterionResponseDTO[] | undefined;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
};
