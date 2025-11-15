import { EvolutionStagesThresholdResponseDTO } from "@/interfaces/api/student";
import { Size } from "@/interfaces/general";

export default interface UseProfileProgressBarProps {
  totalXp: number;
  maxPoints: number;
  evolutionStages: EvolutionStagesThresholdResponseDTO[];
  size?: Size;
  segmentSizes: number[];
  numSquares: number;
}
