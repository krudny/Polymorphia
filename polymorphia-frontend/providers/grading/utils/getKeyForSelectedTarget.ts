import { GradingReducerState } from "@/providers/grading/GradingContext";

export function getKeyForSelectedTarget(
  state: GradingReducerState
): string | undefined {
  if (state.selectedTarget === null) {
    return undefined;
  }

  return state.selectedTarget.map(({ id }) => String(id)).join("_");
}
