import { CriteriaDetailsRequestDTO } from "@/interfaces/api/grade";
import {
  GradingReducerActions,
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/gradingReducer/types";

export const initialState: GradingReducerState = {
  selectedTarget: null,
  criteria: {},
  comment: "",
};

export const GradingReducer = (
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
      if (!action.payload.grade.isGraded) {
        return {
          ...state,
          comment: "",
          criteria: {},
        };
      }

      const criteriaMap = action.payload.grade.criteria.reduce(
        (acc, criterion) => {
          acc[criterion.id] = {
            gainedXp: criterion.gainedXp,
            assignedRewards: criterion.assignedRewards,
          };
          return acc;
        },
        {} as Record<number, CriteriaDetailsRequestDTO>
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
