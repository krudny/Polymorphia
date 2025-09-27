import { EvolutionStagesThresholdResponseDTO } from "@/interfaces/api/profile";
import { sizeVariants } from "@/components/progressbar/types";

export default interface UseProfileProgressBarProps {
  totalXp: number;
  maxPoints: number;
  evolutionStages: EvolutionStagesThresholdResponseDTO[];
  size?: sizeVariants;
  segmentSizes: number[];
  numSquares: number;
}
