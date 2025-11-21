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
      const { gradeResponse } = action.payload.grade;
      const criteria = action.payload.criteria;
      const criteriaMap = criteria.reduce(
        (acc, criterion) => {
          acc[criterion.id] = {
            gainedXp: "",
            assignedRewards: [],
          };
          return acc;
        },
        {} as Record<number, CriteriaDetailsRequestDTO>
      );

      if (!gradeResponse.isGraded) {
        return {
          ...state,
          comment: "",
          criteria: criteriaMap,
        };
      }

      gradeResponse.criteria.forEach((criterion) => {
        criteriaMap[criterion.criterionId] = {
          gainedXp: criterion.gainedXp,
          assignedRewards: criterion.assignedRewards,
        };
      });

      return {
        ...state,
        comment: gradeResponse.comment,
        criteria: criteriaMap,
      };

    case GradingReducerActions.SET_SUBMISSION_DETAILS:
      return {
        ...state,
        submissionDetails: action.payload.submissionDetails.details,
      };

    case GradingReducerActions.UPDATE_GRADE:
      return {
        ...state,
        criteria: action.payload.criteria,
        comment: action.payload.comment,
      };

    case GradingReducerActions.ADD_XP_TO_CRITERION:
      const { xp, criterionId } = action.payload;
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [criterionId]: {
            ...state.criteria[criterionId],
            gainedXp: xp.toString(),
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
