import { StudentTargetData, TargetResponseDTO } from "@/interfaces/api/target";

export interface TargetReducerState {
  selectedTarget: TargetResponseDTO | null;
}

export const TargetReducerActions = {
  SET_TARGET: "SET_TARGET",
  HANDLE_STUDENT_SELECTION: "HANDLE_STUDENT_SELECTION",
} as const;

export type TargetReducerActionType =
  | {
      type: typeof TargetReducerActions.SET_TARGET;
      payload: TargetResponseDTO | null;
    }
  | {
      type: typeof TargetReducerActions.HANDLE_STUDENT_SELECTION;
      payload: {
        target: TargetResponseDTO;
        member: StudentTargetData;
      };
    };
