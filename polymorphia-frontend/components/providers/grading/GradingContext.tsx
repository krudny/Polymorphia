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
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { EventTypes } from "@/interfaces/api/course";

export type TestGradingContextType = {
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
};

interface CriteriaDetails {
  gainedXp?: string;
  assignedRewards: (BaseReward & { quantity: number })[];
}

export interface GradingReducerState {
  selectedTarget: UserDetailsDTO[] | null;
  criteria: Record<number, CriteriaDetails>;
  comment: string;
}

export const GradingReducerActions = {
  SET_TARGET: "set_target",
  ADD_CRITERION: "add_criterion",
  ADD_XP_TO_CRITERION: "add_xp_to_criterion",
  ADD_REWARD_TO_CRITERION: "add_reward_to_criterion",
  UPDATE_REWARD_QUANTITY: "update_reward_quantity",
  ADD_COMMENT: "add_comment",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.SET_TARGET;
      payload: UserDetailsDTO[];
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
        assignedReward: BaseReward & { quantity: number };
      };
    }
  | {
      type: typeof GradingReducerActions.UPDATE_REWARD_QUANTITY;
      payload: {
        criterionId: number;
        rewardId: number;
        quantity: number;
      };
    }
  | {
      type: typeof GradingReducerActions.ADD_COMMENT;
      payload: { comment: string };
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
      const existingRewardIndex = existingRewards.findIndex(
        (reward) => reward.id === action.payload.assignedReward.id
      );

      if (existingRewardIndex !== -1) {
        const updatedRewards = [...existingRewards];
        updatedRewards[existingRewardIndex] = {
          ...updatedRewards[existingRewardIndex],
          quantity:
            updatedRewards[existingRewardIndex].quantity +
            action.payload.assignedReward.quantity,
        };

        return {
          ...state,
          criteria: {
            ...state.criteria,
            [action.payload.criterionId]: {
              ...currentCriterion,
              assignedRewards: updatedRewards,
            },
          },
        };
      }

      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criterionId]: {
            ...currentCriterion,
            assignedRewards: [
              ...existingRewards,
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

export const GradingContext = createContext<TestGradingContextType>({
  search: "",
  setSearch: () => {},
  students: undefined,
  isStudentsLoading: false,
  projectGroups: undefined,
  isProjectGroupsLoading: false,
  isGradeLoading: false,
  criteria: undefined,
  state: initialState,
  dispatch: () => {},
});

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId, eventType } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);

  const { data: students, isLoading: isStudentsLoading } = useQuery({
    queryKey: ["students", debouncedSearch],
    queryFn: () =>
      EventSectionService.getRandomPeopleWithPoints(debouncedSearch),
    enabled: eventType !== EventTypes.PROJECT,
  });

  const { data: criteria } = useQuery({
    queryKey: ["criteria", gradableEventId],
    queryFn: () => EventSectionService.getCriteria(gradableEventId),
  });

  const selectedStudentId = state?.selectedTarget?.[0]?.id ?? null;

  const { data: grade, isLoading: isGradeLoading } = useQuery({
    queryKey: ["grade", selectedStudentId, gradableEventId],
    queryFn: () =>
      EventSectionService.getGrade2(selectedStudentId ?? -1, gradableEventId),
  });

  const { data: projectGroups, isLoading: isProjectGroupsLoading } = useQuery({
    queryKey: ["projectGroups", debouncedSearch],
    queryFn: () => EventSectionService.getRandomProjectGroups(),
    enabled: eventType === EventTypes.PROJECT,
  });

  useEffect(() => {
    if (eventType === EventTypes.PROJECT) {
      if (!projectGroups || projectGroups.length < 1) return;
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: projectGroups[0].members,
      });
    } else {
      if (!students || students.length < 1) return;
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: [students[0]],
      });
    }
  }, [students, projectGroups, eventType, dispatch]);

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
            assignedReward: {
              ...assignedReward.assignedReward.base,
              quantity: 1,
            },
          },
        });
      }
    }
  }, [grade, dispatch]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <GradingContext.Provider
      value={{
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
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
