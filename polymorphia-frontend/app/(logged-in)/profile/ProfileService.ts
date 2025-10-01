import { EvolutionStagesThresholdResponseDTO } from "@/interfaces/api/profile";

export function distributeTo100(
  evolutionStages: EvolutionStagesThresholdResponseDTO[]
) {
  if (!evolutionStages || evolutionStages.length === 0) {
    return [];
  }

  const rawSegments = evolutionStages.slice(1).map((stage, i) => {
    return stage.minXp - evolutionStages[i].minXp;
  });

  const totalPoints = rawSegments.reduce((sum, val) => sum + val, 0);

  const proportionalSegments = rawSegments.map((val) =>
    Math.round((val / totalPoints) * 100)
  );

  const result = new Array(2 * evolutionStages.length - 1).fill(0);
  proportionalSegments.forEach((val, i) => {
    result[i * 2 + 1] = val;
  });

  return result;
}
