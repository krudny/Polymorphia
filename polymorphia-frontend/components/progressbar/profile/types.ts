import {
  EvolutionStagesThresholdResponseDTO,
  StudentProfileDTO,
} from "@/interfaces/api/profile";
import { sizeVariants } from "@/components/progressbar/types";

export default interface UseProfileProgressBarProps {
  profile: StudentProfileDTO;
  maxPoints: number;
  evolutionStages: EvolutionStagesThresholdResponseDTO[];
  size?: sizeVariants;
  segmentSizes: number[];
  numSquares: number;
}
