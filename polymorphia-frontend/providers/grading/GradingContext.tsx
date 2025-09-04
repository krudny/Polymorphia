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
import useRandomPeopleWithPoints from "@/hooks/course/useRandomPeopleWithPoints";
import useCriteria from "@/hooks/course/useCriteria";
import useGrade2 from "@/hooks/course/useGrade2";
import useProjectGroups from "@/hooks/course/useProjectGroups";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
  GradingReducerActions,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import {
  GradingReducer,
  initialState,
} from "@/providers/grading/GradingReducer";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const COURSE_ID = 1;
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(COURSE_ID);
  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);

  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  const selectedStudentId = state?.selectedTarget.targets[0]?.id ?? null;

  const { data: criteria } = useCriteria();
  const { data: students, isLoading: isStudentsLoading } =
    useRandomPeopleWithPoints(debouncedSearch, sortBy, sortOrder, groups);
  const { data: projectGroups, isLoading: isProjectGroupsLoading } =
    useProjectGroups(debouncedSearch);
  const { data: grade, isLoading: isGradeLoading } =
    useGrade2(selectedStudentId);
  const { mutate } = useGradeUpdate();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (!students || students.length < 1) {
      return;
    }
    dispatch({
      type: GradingReducerActions.ADD_TO_TARGET,
      payload: {
        user: students[0][0],
        index: 0,
      },
    });
  }, [students, dispatch]);

  useEffect(() => {
    if (!criteria || criteria.length < 1) {
      return;
    }

    for (const criterion of criteria) {
      dispatch({
        type: GradingReducerActions.ADD_CRITERION,
        payload: {
          criterionId: criterion.id,
          details: {
            gainedXp: undefined,
            assignedRewards: [],
          },
        },
      });
    }
  }, [criteria, dispatch]);

  useEffect(() => {
    if (!grade) {
      return;
    }

    dispatch({
      type: GradingReducerActions.RESET_GRADE,
    });

    dispatch({
      type: GradingReducerActions.ADD_COMMENT,
      payload: {
        comment: grade.details.comment,
      },
    });

    for (const criterion of grade.criteria) {
      dispatch({
        type: GradingReducerActions.ADD_XP_TO_CRITERION,
        payload: {
          criterionId: criterion.id,
          xp: criterion.gainedXp,
        },
      });

      for (const assignedReward of criterion.assignedRewards) {
        dispatch({
          type: GradingReducerActions.ADD_REWARD_TO_CRITERION,
          payload: {
            criterionId: criterion.id,
            assignedReward: {
              ...assignedReward.assignedReward.base,
              quantity: 1,
            },
          },
        });
      }
    }
  }, [grade, dispatch]);

  const submitGrade = () => {
    if (!selectedStudentId) {
      return;
    }

    mutate({
      studentId: selectedStudentId,
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
        students,
        isStudentsLoading,
        projectGroups,
        isProjectGroupsLoading,
        criteria,
        isGradeLoading,
        submitGrade,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
