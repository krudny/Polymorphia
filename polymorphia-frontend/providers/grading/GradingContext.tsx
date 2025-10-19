"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useEventParams } from "@/hooks/general/useEventParams";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import {
  GradingReducer,
  initialState,
} from "@/providers/grading/gradingReducer";
import useGradingTargets from "@/hooks/course/useGradingTargets";
import useShortGrade from "@/hooks/course/useShortGrade";
import { getRequestTargetFromResponseTarget } from "@/providers/grading/utils/getRequestTargetFromResponseTarget";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import isSelectedTargetStillAvailable from "@/providers/grading/utils/isSelectedTargetStillAvailable";
import { TargetTypes } from "@/interfaces/api/grade/target";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const { courseId } = useUserDetails();

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(courseId);
  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);
  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];
  const gradeStatus = filters.getAppliedFilterValues("gradeStatus") ?? ["all"];

  const { data: targets, isLoading: isTargetsLoading } = useGradingTargets(
    debouncedSearch,
    sortBy,
    sortOrder,
    groups,
    gradeStatus
  );

  const { data: grade, isLoading: isGradeLoading } = useShortGrade(
    state.selectedTarget
  );
  const { mutate } = useGradeUpdate();

  useEffect(() => {
    if (!targets || targets.length < 1) {
      return;
    }

    const isSelectedTargetInNewTargets = isSelectedTargetStillAvailable(
      targets,
      state.selectedTarget
    );

    if (!isSelectedTargetInNewTargets) {
      // Dispatch HANDLE_STUDENT_SELECTION to reuse target selection logic
      dispatch({
        type: GradingReducerActions.HANDLE_STUDENT_SELECTION,
        payload: {
          target: targets[0],
          member:
            targets[0].type === TargetTypes.STUDENT
              ? targets[0]
              : targets[0].members[0],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We want this effect to run ONLY when targets list changes.
  }, [targets]);

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

  const submitGrade = () => {
    if (!state.selectedTarget) {
      return;
    }

    mutate({
      target: getRequestTargetFromResponseTarget(state.selectedTarget),
      gradableEventId,
      criteria: state.criteria,
      comment: state.comment,
    });
  };

  return (
    <GradingContext.Provider
      value={{
        areFiltersOpen,
        setAreFiltersOpen,
        isFiltersLoading,
        isFiltersError,
        filters,
        state,
        dispatch,
        search,
        setSearch,
        targets,
        isTargetsLoading,
        isGradeLoading,
        submitGrade,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
