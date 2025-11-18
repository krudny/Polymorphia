import {
  TargetReducerActions,
  TargetReducerActionType,
  TargetReducerState,
} from "@/providers/target/reducer/types";
import { GroupTargetTypes, TargetTypes } from "@/interfaces/api/target";

export const initialState: TargetReducerState = {
  selectedTarget: null,
};

export const TargetReducer = (
  state: TargetReducerState,
  action: TargetReducerActionType
): TargetReducerState => {
  switch (action.type) {
    case TargetReducerActions.SET_TARGET:
      return {
        ...state,
        selectedTarget: action.payload,
      };

    case TargetReducerActions.HANDLE_STUDENT_SELECTION: {
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
          selectedTarget: {
            type: TargetTypes.STUDENT,
            id: clickedMember.id,
            student: clickedMember,
          },
        };
      }

      // this is the first selection
      if (!current) {
        return {
          ...state,
          selectedTarget:
            clickedTarget.groupType === GroupTargetTypes.MATCHING
              ? clickedTarget
              : {
                  type: TargetTypes.STUDENT,
                  id: clickedMember.id,
                  student: clickedMember,
                },
        };
      }

      // determine if the current selection belongs to the clicked group
      const currentBelongsToClickedGroup = (() => {
        if (current.type === TargetTypes.STUDENT_GROUP) {
          return current.groupId === clickedTarget.groupId;
        }
        if (current.type === TargetTypes.STUDENT) {
          return clickedTarget.members.some(
            (member) => member.id === current.id
          );
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
              : {
                  type: TargetTypes.STUDENT,
                  id: clickedMember.id,
                  student: clickedMember,
                },
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
            selectedTarget: {
              type: TargetTypes.STUDENT,
              id: clickedMember.id,
              student: clickedMember,
            },
          };
        }

        if (clickedTarget.groupType === GroupTargetTypes.MATCHING) {
          if (current.id === clickedMember.id) {
            return { ...state, selectedTarget: clickedTarget };
          }
          return {
            ...state,
            selectedTarget: {
              type: TargetTypes.STUDENT,
              id: clickedMember.id,
              student: clickedMember,
            },
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
          selectedTarget: {
            type: TargetTypes.STUDENT,
            id: clickedMember.id,
            student: clickedMember,
          },
        };
      }

      return state;
    }

    default:
      return state;
  }
};
