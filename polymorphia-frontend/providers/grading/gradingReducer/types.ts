import { UserDetailsDTO } from "@/interfaces/api/user";
import { ShortGradeResponseDTO } from "@/interfaces/api/grade";

// TODO: this should be moved, but i dont know where
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