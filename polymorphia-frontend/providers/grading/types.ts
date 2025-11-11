import { Dispatch } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import {
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/reducer/types";
import {
  SubmissionDetails,
  SubmissionRequirementResponseDTO,
} from "@/interfaces/api/grade/submission";
import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";

export interface GradingContextInterface {
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  criteria: CriterionResponseDTO[] | undefined;
  submissionRequirements: SubmissionRequirementResponseDTO[] | undefined;
  isGeneralDataLoading: boolean;
  isGeneralDataError: boolean;
  isSpecificDataLoading: boolean;
  isSpecificDataError: boolean;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
  submitSubmissions: (submissionDetails: SubmissionDetails) => void;
}

export type GradingFilterId = "sortOrder" | "sortBy" | "groups" | "gradeStatus";
