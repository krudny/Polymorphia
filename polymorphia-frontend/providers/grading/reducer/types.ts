import { CriteriaDetailsRequestDTO } from "@/interfaces/api/grade/criteria";
import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import { ShortGradeResponseDTO } from "@/interfaces/api/grade/grade";

export interface GradingReducerState {
  criteria: Record<number, CriteriaDetailsRequestDTO>;
  comment: string;
  submissionDetails: SubmissionDetailsResponseDTO;
}

export const GradingReducerActions = {
  SET_GRADE: "set_grade",
  SET_SUBMISSION_DETAILS: "set_submission_details",
  UPDATE_COMMENT: "update_comment",
  UPDATE_GRADE: "update_grade",
  RESET_GRADE: "reset_grade",
  ADD_XP_TO_CRITERION: "add_xp_to_criterion",
} as const;

export type GradingReducerActionType =
  | {
      type: typeof GradingReducerActions.SET_GRADE;
      payload: { grade: ShortGradeResponseDTO };
    }
  | {
      type: typeof GradingReducerActions.SET_SUBMISSION_DETAILS;
      payload: {
        submissionDetails: SubmissionDetailsResponseDTO;
      };
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
