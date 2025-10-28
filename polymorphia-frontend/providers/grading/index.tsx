"use client";
import { createContext, ReactNode, useEffect, useReducer } from "react";
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
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useSubmissionDetails from "@/hooks/course/useSubmissionDetails";
import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import useSubmissionsUpdate from "@/hooks/course/useSubmissionsUpdate";
import useSubmissionRequirements from "@/hooks/course/useSubmissionRequirements";
import useCriteria from "@/hooks/course/useCriteria";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const { courseId } = useUserDetails();
  const { state: targetState } = useTargetContext();

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(courseId);
  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);

  const { data: criteria, isLoading: isCriteriaLoading } = useCriteria();
  const { data: grade, isLoading: isGradeLoading } = useShortGrade(
    targetState.selectedTarget
  );
  const { mutate: mutateGrade } = useGradeUpdate();

  const {
    data: submissionRequirements,
    isLoading: isSubmissionRequirementsLoading,
  } = useSubmissionRequirements();
  const { data: submissionDetails, isLoading: isSubmissionDetailsLoading } =
    useSubmissionDetails(targetState.selectedTarget);
  const { mutate: mutateSubmissions } = useSubmissionsUpdate({
    target: targetState.selectedTarget,
  });

  useEffect(() => {
    if (!grade) {
      return;
    }

    dispatch({
      type: GradingReducerActions.SET_GRADE,
      payload: {
        grade,
      },
    });
  }, [grade]);

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

  const submitSubmissions = (
    submissionDetails: SubmissionDetailsResponseDTO
  ) => {
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
        isSpecificDataLoading: isGradeLoading || isSubmissionDetailsLoading,
        submitGrade,
        submitSubmissions,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
