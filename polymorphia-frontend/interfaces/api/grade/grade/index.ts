import {
  CriteriaDetailsRequestDTO,
  CriterionGradeResponseDTO,
} from "@/interfaces/api/grade/criteria";
import { TargetRequestDTO, TargetType } from "@/interfaces/api/target";

export interface ShortAssignedRewardResponseDTO {
  rewardId: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

export interface UngradedResponseDTO {
  isGraded: false;
}

export interface BaseGradeResponseDTO<AssignedRewardType> {
  isGraded: true;
  comment: string;
  hasReward: boolean;
  criteria: CriterionGradeResponseDTO<AssignedRewardType>[];
}

export interface StudentGradeResponseDTO<AssignedRewardType>
  extends BaseGradeResponseDTO<AssignedRewardType> {
  id: number;
}

export interface GroupGradeResponseDTO<AssignedRewardType>
  extends BaseGradeResponseDTO<AssignedRewardType> {
  ids: number[];
}

export interface BaseGradeResponseDTOWithType<T extends TargetType, P> {
  type: T;
  gradeResponse: P | UngradedResponseDTO;
}

export type ShortGradeResponseDTO =
  | BaseGradeResponseDTOWithType<
      "STUDENT",
      StudentGradeResponseDTO<ShortAssignedRewardResponseDTO>
    >
  | BaseGradeResponseDTOWithType<
      "STUDENT_GROUP",
      GroupGradeResponseDTO<ShortAssignedRewardResponseDTO>
    >;
// export type FullGradeResponseDTO = GradeResponseDTO<AssignedRewardResponseDTO>;

export interface GradeRequestDTO {
  target: TargetRequestDTO;
  gradableEventId: number;
  criteria: Record<number, CriteriaDetailsRequestDTO>;
  comment: string;
}
