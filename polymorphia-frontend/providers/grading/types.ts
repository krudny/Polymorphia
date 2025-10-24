import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/gradingReducer/types";
import { TargetResponseDTO } from "@/interfaces/api/grade/target";
import {
  SubmissionDetailsResponseDTO,
  SubmissionRequirementResponseDTO,
} from "@/interfaces/api/grade/submission";
import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";

export interface GradingContextInterface {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  search: string;
  setSearch: (search: string) => void;
  targets: TargetResponseDTO[] | undefined;
  criteria: CriterionResponseDTO[] | undefined;
  submissionRequirements: SubmissionRequirementResponseDTO[] | undefined;
  isGeneralDataLoading: boolean;
  isSpecificDataLoading: boolean;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
  submitSubmissions: (submissionDetails: SubmissionDetailsResponseDTO) => void;
}

export type GradingFilterId = "sortOrder" | "sortBy" | "groups" | "gradeStatus";
