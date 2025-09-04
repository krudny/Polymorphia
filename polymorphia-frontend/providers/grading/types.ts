import { UserDetailsDTO } from "@/interfaces/api/user";
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { CriterionResponseDTO } from "@/interfaces/api/grade";
import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import { BaseReward } from "@/interfaces/api/reward";

export interface CriteriaDetails {
  gainedXp?: string;
  assignedRewards: (BaseReward & { quantity: number })[];
}

export interface GradingReducerState {
  selectedTarget: {
    targets: UserDetailsDTO[];
    index: number;
  };
  criteria: Record<number, CriteriaDetails>;
  comment: string;
}

export const GradingReducerActions = {
  ADD_TO_TARGET: "add_to_target",
  ADD_CRITERION: "add_criterion",
  ADD_XP_TO_CRITERION: "add_xp_to_criterion",
  ADD_REWARD_TO_CRITERION: "add_reward_to_criterion",
  UPDATE_REWARD_QUANTITY: "update_reward_quantity",
  ADD_COMMENT: "add_comment",
  RESET_GRADE: "reset_grade",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.ADD_TO_TARGET;
      payload: { user: UserDetailsDTO; index: number };
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
    }
  | {
      type: typeof GradingReducerActions.RESET_GRADE;
    };

export type GradingContextInterface = {
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersLoading: boolean;
  isFiltersError: boolean;
  // TODO: typing
  filters: ReturnType<typeof useFilters<GradingFilterId>>;
  search: string;
  setSearch: (search: string) => void;
  students: (UserDetailsDTO & { gainedXp?: string })[][] | undefined;
  isStudentsLoading: boolean;
  projectGroups: ProjectGroupResponseDTO[] | undefined;
  isProjectGroupsLoading: boolean;
  isGradeLoading: boolean;
  criteria: CriterionResponseDTO[] | undefined;
  state: GradingReducerState;
  dispatch: Dispatch<GradingReducerActionType>;
  submitGrade: () => void;
};

export type GradingFilterId = "sortOrder" | "sortBy" | "groups";
