import {
  CriterionGradeResponseDTO,
  CriteriaDetailsRequestDTO,
} from "../criteria";
import { TargetRequestDTO } from "../target";

export interface ShortAssignedRewardResponseDTO {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

export type GradeResponseDTO<AssignedRewardType> =
  | {
      isGraded: true;
      id: number;
      comment: string;
      criteria: CriterionGradeResponseDTO<AssignedRewardType>[];
    }
  | {
      isGraded: false;
    };

export type ShortGradeResponseDTO =
  GradeResponseDTO<ShortAssignedRewardResponseDTO>;
// export type FullGradeResponseDTO = GradeResponseDTO<AssignedRewardResponseDTO>;

export interface GradeRequestDTO {
  target: TargetRequestDTO;
  gradableEventId: number;
  criteria: Record<number, CriteriaDetailsRequestDTO>;
  comment: string;
}
