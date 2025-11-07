import { CriteriaDetailsRequestDTO } from "@/interfaces/api/grade/criteria";
import {
  GradingReducerActions,
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/reducer/types";

export const initialState: GradingReducerState = {
  criteria: {},
  comment: "",
  submissionDetails: {},
};

export const GradingReducer = (
  state: GradingReducerState,
  action: GradingReducerActionType
): GradingReducerState => {
  switch (action.type) {
    case GradingReducerActions.UPDATE_COMMENT:
      return {
        ...state,
        comment: action.payload.comment,
      };

    case GradingReducerActions.SET_GRADE:
      if (!action.payload.grade.gradeResponse.isGraded) {
        return {
          ...state,
          comment: "",
          criteria: {},
        };
      }

      const criteriaMap = action.payload.grade.gradeResponse.criteria.reduce(
        (acc, criterion) => {
          acc[criterion.criterionId] = {
            gainedXp: criterion.gainedXp,
            assignedRewards: criterion.assignedRewards,
          };
          return acc;
        },
        {} as Record<number, CriteriaDetailsRequestDTO>
      );

      return {
        ...state,
        comment: action.payload.grade.gradeResponse.comment,
        criteria: criteriaMap,
      };

    case GradingReducerActions.SET_SUBMISSION_DETAILS:
      return {
        ...state,
        submissionDetails: action.payload.submissionDetails,
      };

    case GradingReducerActions.UPDATE_GRADE:
      return {
        ...state,
        criteria: action.payload.criteria,
        comment: action.payload.comment,
      };

    case GradingReducerActions.ADD_XP_TO_CRITERION:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criterionId]: {
            ...state.criteria[action.payload.criterionId],
            gainedXp: action.payload.xp.toString(),
          },
        },
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
