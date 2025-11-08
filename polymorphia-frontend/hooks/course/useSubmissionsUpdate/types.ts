import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import { TargetRequestDTO } from "@/interfaces/api/target";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseSubmissionsUpdateProps {
  target: TargetRequestDTO | null;
}

export type UseSubmissionsUpdate = UseMutationResult<
  void,
  Error,
  SubmissionDetailsResponseDTO,
  unknown
>;
