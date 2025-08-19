"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UserDetailsDTO } from "@/interfaces/api/user";
import { useEventParams } from "@/shared/params/useSeachParams";
import { BaseReward } from "@/interfaces/api/reward";
import { CriterionResponseDTO } from "@/interfaces/api/grade";

export type TestGradingContextType = {
  search: string;
  setSearch: (search: string) => void;
  students: (UserDetailsDTO & { gainedXp?: string })[] | undefined;
  isStudentsLoading: boolean;
  isGradeLoading: boolean;
  criteria: CriterionResponseDTO[] | undefined;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
};

interface CriteriaDetails {
  gainedXp?: string;
  assignedRewards: BaseReward[];
}

export interface GradingReducerState {
  selectedStudent: UserDetailsDTO | null;
  criteria: Record<number, CriteriaDetails>;
  comment: string;
}

export const GradingReducerActions = {
  SET_STUDENT: "set_student",
  ADD_CRITERION: "add_criterion",
  ADD_XP_TO_CRITERION: "add_xp_to_criterion",
  ADD_REWARD_TO_CRITERION: "add_reward_to_criterion",
  ADD_COMMENT: "add_comment",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.SET_STUDENT;
      payload: UserDetailsDTO | null;
    }
  | {
      type: typeof GradingReducerActions.ADD_CRITERION;
      payload: { criterionId: number; details: CriteriaDetails };
    }
  | {
      type: typeof GradingReducerActions.ADD_XP_TO_CRITERION;
      payload: { criterionId: number; xp: string };
    }
  | {
      type: typeof GradingReducerActions.ADD_REWARD_TO_CRITERION;
      payload: {
        criterionId: number;
        assignedReward: BaseReward;
      };
    }
  | {
      type: typeof GradingReducerActions.ADD_COMMENT;
      payload: { comment: string };
    };

const initialState: GradingReducerState = {
  selectedStudent: null,
  criteria: {},
  comment: "",
};

const GradingReducer = (
  state: GradingReducerState,
  action: GradingReducerActionType
): GradingReducerState => {
  switch (action.type) {
    case GradingReducerActions.SET_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload,
      };

    case GradingReducerActions.ADD_CRITERION:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criterionId]: action.payload.details,
        },
      };

    case GradingReducerActions.ADD_XP_TO_CRITERION:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criterionId]: {
            ...state.criteria[action.payload.criterionId],
            gainedXp: action.payload.xp,
          },
        },
      };

    case GradingReducerActions.ADD_REWARD_TO_CRITERION:
      const currentCriterion = state.criteria[action.payload.criterionId];
      const existingRewards = currentCriterion?.assignedRewards || [];
      const rewardExists = existingRewards.some(
        (reward) => reward.id === action.payload.assignedReward.id
      );

      if (rewardExists) {
        return state;
      }

      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criterionId]: {
            ...state.criteria[action.payload.criterionId],
            assignedRewards: [
              ...state.criteria[action.payload.criterionId].assignedRewards,
              action.payload.assignedReward,
            ],
          },
        },
      };

    case GradingReducerActions.ADD_COMMENT:
      return {
        ...state,
        comment: action.payload.comment,
      };

    default:
      return state;
  }
};

export const TestGradingContext = createContext<
  TestGradingContextType | undefined
>(undefined);

export const TestGradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);

  const { data: students, isLoading: isStudentsLoading } = useQuery({
    queryKey: ["allUsers", debouncedSearch],
    queryFn: () =>
      EventSectionService.getRandomPeopleWithPoints(debouncedSearch),
  });

  const { data: criteria } = useQuery({
    queryKey: ["criterion", gradableEventId],
    queryFn: () => EventSectionService.getCriteria(gradableEventId),
  });

  const { data: grade, isLoading: isGradeLoading } = useQuery({
    queryKey: ["grade", state.selectedStudent?.id ?? -1, gradableEventId],
    queryFn: () =>
      EventSectionService.getGrade2(
        state.selectedStudent?.id ?? -1,
        gradableEventId
      ),
  });

  useEffect(() => {
    if (!students || students.length < 1) return;
    dispatch({
      type: GradingReducerActions.SET_STUDENT,
      payload: students[0],
    });
  }, [students, dispatch]);

  useEffect(() => {
    if (!criteria || criteria.length < 1) return;

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
    if (!grade) return;

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
            assignedReward: assignedReward.assignedReward.base,
          },
        });
      }
    }
  }, [grade, dispatch]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TestGradingContext.Provider
      value={{
        state,
        dispatch,
        search,
        setSearch,
        students,
        criteria,
        isStudentsLoading,
        isGradeLoading,
      }}
    >
      {children}
    </TestGradingContext.Provider>
  );
};
