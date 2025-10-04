import {
  CriteriaDetailsRequestDTO,
  ShortGradeResponseDTO,
  StudentTargetData,
  TargetResponseDTO,
} from "@/interfaces/api/grade";

export interface GradingReducerState {
  selectedTarget: TargetResponseDTO | null;
  criteria: Record<number, CriteriaDetailsRequestDTO>;
  comment: string;
}

export const GradingReducerActions = {
  SET_TARGET: "set_target",
  HANDLE_STUDENT_SELECTION: "handle_student_selection",
  SET_GRADE: "set_grade",
  UPDATE_COMMENT: "update_comment",
  UPDATE_GRADE: "update_grade",
  RESET_GRADE: "reset_grade",
  ADD_XP_TO_CRITERION: "add_xp_to_criterion",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.SET_TARGET;
      payload: TargetResponseDTO | null;
    }
  | {
      type: typeof GradingReducerActions.HANDLE_STUDENT_SELECTION;
      payload: {
        target: TargetResponseDTO;
        member: StudentTargetData;
      };
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
        criteria: Record<number, CriteriaDetailsRequestDTO>;
        comment: string;
      };
    }
  | {
      type: typeof GradingReducerActions.RESET_GRADE;
    }
  | {
      type: typeof GradingReducerActions.ADD_XP_TO_CRITERION;
      payload: {
        criterionId: number;
        xp: string;
      };
    };
