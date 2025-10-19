import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import { TargetRequestDTO } from "@/interfaces/api/grade/target";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseSubmissionsUpdateProps {
  target: TargetRequestDTO;
}

export type UseSubmissionsUpdate = UseMutationResult<
  void,
  Error,
  SubmissionDetailsResponseDTO,
  unknown
>;
