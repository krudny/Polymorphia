import { TargetTypes } from "@/interfaces/api/grade/target";
import { GradingReducerState } from "@/providers/grading/gradingReducer/types";

export function getKeyForSelectedTarget(
  state: GradingReducerState
): string | undefined {
  if (state.selectedTarget === null) {
    return undefined;
  } else if (state.selectedTarget.type === TargetTypes.STUDENT) {
    return `${state.selectedTarget.type}_${state.selectedTarget.id}`;
  } else {
    return `${state.selectedTarget.type}_${state.selectedTarget.groupId}`;
  }
}
