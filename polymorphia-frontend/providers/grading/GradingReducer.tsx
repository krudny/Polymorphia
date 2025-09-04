import {
  GradingReducerActions,
  GradingReducerActionType,
  GradingReducerState,
} from "@/providers/grading/types";

export const initialState: GradingReducerState = {
  selectedTarget: {
    targets: [],
    index: 0,
  },
  criteria: {},
  comment: "",
};

export const GradingReducer = (
  state: GradingReducerState,
  action: GradingReducerActionType
): GradingReducerState => {
  switch (action.type) {
    case GradingReducerActions.ADD_TO_TARGET:
      const currentTargets = state.selectedTarget.targets || [];

      if (state.selectedTarget.index === action.payload.index) {
        return {
          ...state,
          selectedTarget: {
            ...state.selectedTarget,
            targets: [...currentTargets, action.payload.user],
          },
        };
      } else {
        return {
          ...state,
          selectedTarget: {
            targets: [action.payload.user],
            index: action.payload.index,
          },
        };
      }

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
