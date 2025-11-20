"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useEventParams } from "@/hooks/general/useEventParams";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { GradingReducerActions } from "@/providers/grading/reducer/types";
import { GradingReducer, initialState } from "@/providers/grading/reducer";
import useShortGrade from "@/hooks/course/useShortGrade";
import { getRequestTargetFromResponseTarget } from "@/providers/grading/utils/getRequestTargetFromResponseTarget";
import useSubmissionDetails from "@/hooks/course/useSubmissionDetails";
import { SubmissionDetails } from "@/interfaces/api/grade/submission";
import useSubmissionsUpdate from "@/hooks/course/useSubmissionsUpdate";
import useSubmissionRequirements from "@/hooks/course/useSubmissionRequirements";
import useCriteria from "@/hooks/course/useCriteria";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import {
  DEFAULT_SEARCH_BY,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER_ASC,
  DEFAULT_GROUPS,
  DEFAULT_GRADE_STATUS,
} from "@/shared/filter-defaults";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { state: targetState, applyFiltersCallback } = useTargetContext();
  const { gradableEventId } = useEventParams();
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(gradableEventId);

  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);
  const searchBy = useMemo(
    () => filters.getAppliedFilterValues("searchBy") ?? DEFAULT_SEARCH_BY,
    [filters]
  );
  const sortBy = useMemo(
    () => filters.getAppliedFilterValues("sortBy") ?? DEFAULT_SORT_BY,
    [filters]
  );
  const sortOrder = useMemo(
    () => filters.getAppliedFilterValues("sortOrder") ?? DEFAULT_SORT_ORDER_ASC,
    [filters]
  );
  const groups = useMemo(
    () => filters.getAppliedFilterValues("groups") ?? DEFAULT_GROUPS,
    [filters]
  );
  const gradeStatus = useMemo(
    () => filters.getAppliedFilterValues("gradeStatus") ?? DEFAULT_GRADE_STATUS,
    [filters]
  );

  useEffect(() => {
    if (isFiltersLoading || !filterConfigs) {
      return;
    }

    applyFiltersCallback({
      searchBy,
      sortBy: sortBy.map((value) => (value === "name" ? searchBy[0] : value)),
      sortOrder,
      groups,
      gradeStatus,
    });
  }, [
    sortBy,
    sortOrder,
    groups,
    gradeStatus,
    applyFiltersCallback,
    searchBy,
    isFiltersLoading,
    filterConfigs,
  ]);

  const {
    data: criteria,
    isLoading: isCriteriaLoading,
    isError: isCriteriaError,
  } = useCriteria();
  const {
    data: grade,
    isLoading: isGradeLoading,
    isError: isGradeError,
  } = useShortGrade(targetState.selectedTarget);
  const { mutate: mutateGrade } = useGradeUpdate();
  const {
    data: submissionRequirements,
    isLoading: isSubmissionRequirementsLoading,
    isError: isSubmissionRequirementsError,
  } = useSubmissionRequirements();
  const {
    data: submissionDetails,
    isLoading: isSubmissionDetailsLoading,
    isError: isSubmissionDetailsError,
  } = useSubmissionDetails(targetState.selectedTarget);
  const { mutate: mutateSubmissions } = useSubmissionsUpdate({
    target: targetState.selectedTarget,
  });

  useEffect(() => {
    if (!grade || !criteria) {
      return;
    }

    dispatch({
      type: GradingReducerActions.SET_GRADE,
      payload: {
        grade,
        criteria,
      },
    });
  }, [grade, criteria]);

  useEffect(() => {
    if (!submissionDetails) {
      return;
    }

    dispatch({
      type: GradingReducerActions.SET_SUBMISSION_DETAILS,
      payload: {
        submissionDetails,
      },
    });
  }, [submissionDetails]);

  const submitGrade = () => {
    if (!targetState.selectedTarget) {
      return;
    }

    mutateGrade({
      target: getRequestTargetFromResponseTarget(targetState.selectedTarget),
      gradableEventId,
      criteria: state.criteria,
      comment: state.comment,
    });
  };

  const submitSubmissions = (submissionDetails: SubmissionDetails) => {
    if (!targetState.selectedTarget) {
      return;
    }

    mutateSubmissions(submissionDetails);
  };

  return (
    <GradingContext.Provider
      value={{
        isFiltersLoading,
        isFiltersError,
        filters,
        state,
        dispatch,
        criteria,
        submissionRequirements,
        isGeneralDataLoading:
          isCriteriaLoading || isSubmissionRequirementsLoading,
        isGeneralDataError: isCriteriaError || isSubmissionRequirementsError,
        isSpecificDataLoading: isGradeLoading || isSubmissionDetailsLoading,
        isSpecificDataError: isGradeError || isSubmissionDetailsError,
        submitGrade,
        submitSubmissions,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
