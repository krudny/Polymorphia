import {
  CriteriaDetailsRequestDTO,
  GroupTargetTypes,
  TargetTypes,
} from "@/interfaces/api/grade";
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

    case GradingReducerActions.HANDLE_STUDENT_SELECTION: {
      const { target: clickedTarget, member: clickedMember } = action.payload;
      const current = state.selectedTarget;

      // clicked on a single student target
      if (clickedTarget.type === TargetTypes.STUDENT) {
        return { ...state, selectedTarget: clickedTarget };
      }

      // clicked on a group with single member
      const isSingleMemberGroup =
        clickedTarget.members.length === 1 &&
        clickedTarget.members[0].id === clickedMember.id;

      if (isSingleMemberGroup) {
        return {
          ...state,
          selectedTarget: { type: TargetTypes.STUDENT, ...clickedMember },
        };
      }

      // this is the first selection
      if (!current) {
        return {
          ...state,
          selectedTarget:
            clickedTarget.groupType === GroupTargetTypes.MATCHING
              ? clickedTarget
              : { type: TargetTypes.STUDENT, ...clickedMember },
        };
      }

      // determine if the current selection belongs to the clicked group.
      const currentBelongsToClickedGroup = (() => {
        if (current.type === TargetTypes.STUDENT_GROUP) {
          return current.groupId === clickedTarget.groupId;
        }
        if (current.type === TargetTypes.STUDENT) {
          return !!clickedTarget.members?.some((m) => m.id === current.id);
        }
        return false;
      })();

      // clicked member belongs to a different group than the current selection
      if (!currentBelongsToClickedGroup) {
        return {
          ...state,
          selectedTarget:
            clickedTarget.groupType === GroupTargetTypes.MATCHING
              ? clickedTarget
              : { type: TargetTypes.STUDENT, ...clickedMember },
        };
      }

      // current selection is an individual student (from the same group)
      if (current.type === TargetTypes.STUDENT) {
        if (clickedTarget.groupType === GroupTargetTypes.DIVERGENT) {
          if (current.id === clickedMember.id) {
            return state;
          }
          return {
            ...state,
            selectedTarget: { type: TargetTypes.STUDENT, ...clickedMember },
          };
        }

        if (clickedTarget.groupType === GroupTargetTypes.MATCHING) {
          if (current.id === clickedMember.id) {
            return { ...state, selectedTarget: clickedTarget };
          }
          return {
            ...state,
            selectedTarget: { type: TargetTypes.STUDENT, ...clickedMember },
          };
        }
      }

      // current selection is the entire group (same group)
      if (
        current.type === TargetTypes.STUDENT_GROUP &&
        current.groupId === clickedTarget.groupId
      ) {
        return {
          ...state,
          selectedTarget: { type: TargetTypes.STUDENT, ...clickedMember },
        };
      }

      return state;
    }

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
