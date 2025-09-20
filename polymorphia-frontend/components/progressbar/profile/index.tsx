import ProgressBar from "@/components/progressbar/ProgressBar";
import { min } from "@popperjs/core/lib/utils/math";
import ProgressBarTextLabels from "@/components/progressbar/ProgressBarTextLabels";
import UseProfileProgressBarProps from "@/components/progressbar/profile/types";

export default function ProfileProgressBar({
  profile,
  maxPoints,
  evolutionStages,
  size,
  numSquares,
  segmentSizes,
}: UseProfileProgressBarProps) {
  return (
    <ProgressBar
      minXP={0}
      currentXP={min(profile.totalXp, maxPoints)}
      maxXP={maxPoints}
      numSquares={numSquares}
      segmentSizes={segmentSizes}
      upperElement={
        <ProgressBarTextLabels
          textLabels={
            (evolutionStages
              ?.map(
                (evolutionStage) =>
                  `${evolutionStage.grade.toFixed(1)} (${evolutionStage.minXp.toFixed(1)}xp)`
              )
              .filter(Boolean) as string[]) || []
          }
          className="!min-h-8"
          size={size}
        />
      }
      lowerElement={
        <ProgressBarTextLabels
          textLabels={
            evolutionStages.map((evolutionStage) => evolutionStage.name) || []
          }
          size={size}
        />
      }
    />
  );
}
