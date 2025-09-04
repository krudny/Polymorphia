import { GradingReducerState } from "@/providers/grading/types";

export function getKeyForSelectedTarget(state: GradingReducerState): string {
  return state.selectedTarget.targets.map(({ id }) => String(id)).join("_");
}
