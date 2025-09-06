"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { UserDetailsDTO } from "@/interfaces/api/user";
import { useEventParams } from "@/hooks/general/useEventParams";
import useRandomPeopleWithPoints from "@/hooks/course/useRandomPeopleWithPoints";
import useProjectGroups from "@/hooks/course/useProjectGroups";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { EventTypes } from "@/interfaces/general";
import { ShortGradeResponseDTO } from "@/interfaces/api/grade";
import useGrade3 from "@/hooks/course/useGrade3";
import useUserContext from "@/hooks/contexts/useUserContext";

export interface CriteriaDetails {
  gainedXp?: string;
  assignedRewards: {
    id: number;
    quantity: number;
    imageUrl: string;
  }[];
}

export interface GradingReducerState {
  selectedTarget: UserDetailsDTO[] | null;
  criteria: Record<number, CriteriaDetails>;
  comment: string;
}

export const GradingReducerActions = {
  SET_TARGET: "set_target",
  SET_GRADE: "set_grade",
  UPDATE_COMMENT: "update_comment",
  UPDATE_GRADE: "update_grade",
  RESET_GRADE: "reset_grade",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.SET_TARGET;
      payload: UserDetailsDTO[];
    }
  | {
      type: typeof GradingReducerActions.SET_GRADE;
      payload: { grade: ShortGradeResponseDTO };
    }
  | {
      type: typeof GradingReducerActions.UPDATE_COMMENT;
      payload: { comment: string };
    }
  | {
      type: typeof GradingReducerActions.UPDATE_GRADE;
      payload: {
        criteria: Record<number, CriteriaDetails>;
        comment: string;
      };
    }
  | {
      type: typeof GradingReducerActions.RESET_GRADE;
    };

const initialState: GradingReducerState = {
  selectedTarget: null,
  criteria: {},
  comment: "",
};

const GradingReducer = (
  state: GradingReducerState,
  action: GradingReducerActionType
): GradingReducerState => {
  switch (action.type) {
    case GradingReducerActions.SET_TARGET:
      return {
        ...state,
        selectedTarget: action.payload,
      };

    case GradingReducerActions.UPDATE_COMMENT:
      return {
        ...state,
        comment: action.payload.comment,
      };

    case GradingReducerActions.SET_GRADE:
      const criteriaMap = action.payload.grade.criteria.reduce(
        (acc, criterion) => {
          acc[criterion.id] = {
            gainedXp: criterion.gainedXp.toString(),
            assignedRewards: criterion.assignedRewards,
          };
          return acc;
        },
        {} as Record<number, CriteriaDetails>
      );

      return {
        ...state,
        comment: action.payload.grade.comment,
        criteria: criteriaMap,
      };

    case GradingReducerActions.UPDATE_GRADE:
      return {
        ...state,
        criteria: action.payload.criteria,
        comment: action.payload.comment,
      };

    case GradingReducerActions.RESET_GRADE:
      return {
        ...state,
        comment: "",
        criteria: {},
      };

    default:
      return state;
  }
};

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

const COURSE_ID = 1;

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId, eventType } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const userContext = useUserContext();
  useEffect(() => {
    console.log(state);
  }, [state]);

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(userContext.userDetails.courseId);
  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);

  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  const selectedStudentId = state?.selectedTarget?.[0]?.userDetails.id ?? null;
  const { data: students, isLoading: isStudentsLoading } =
    useRandomPeopleWithPoints(debouncedSearch, sortBy, sortOrder, groups);
  const { data: projectGroups, isLoading: isProjectGroupsLoading } =
    useProjectGroups(debouncedSearch);
  const { data: grade, isLoading: isGradeLoading } =
    useGrade3(selectedStudentId);
  const { mutate } = useGradeUpdate();

  useEffect(() => {
    if (eventType === EventTypes.PROJECT) {
      if (!projectGroups || projectGroups.length < 1) {
        return;
      }
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: projectGroups[0].members,
      });
    } else {
      if (!students || students.length < 1) {
        return;
      }
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: [students[0]],
      });
    }
  }, [students, projectGroups, eventType, dispatch]);

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
        isGradeLoading,
        submitGrade,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
