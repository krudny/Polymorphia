import { GradingReducerState } from "@/providers/grading/gradingReducer/types";

export function getKeyForSelectedTarget(
  state: GradingReducerState
): string | undefined {
  if (state.selectedTarget === null) {
    return undefined;
  }

  return state.selectedTarget
    .map(({ userDetails }) => String(userDetails.id))
    .join("_");
}
