import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import AssignReward from "@/components/grading-components/grade/reward-assignment";
import Input from "@/components/grading-components/grade/input";
import { CriterionProps } from "@/components/grading-components/grade/criteria/criterion/types";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function Criterion({
  criterion,
  criterionGrade,
}: CriterionProps) {
  const wrapperRef = useFadeInAnimate();
  const gainedXp = criterionGrade?.gainedXp ?? "0";

  return (
    <div className="grade-criterion" ref={wrapperRef}>
      <div className="grade-criterion-progress-bar">
        <ProgressBar
          minXP={0}
          currentXP={Number(gainedXp)}
          maxXP={Number(criterion.maxXp)}
          numSquares={3}
          segmentSizes={[0, 50, 0, 50, 0]}
          lowerElement={
            <ProgressBarRangeLabels minXP={0} maxXP={Number(criterion.maxXp)} />
          }
        />
      </div>
      <div className="grade-input-wrapper">
        <Input criterion={criterion} gainedXp={gainedXp} />
      </div>
      <h2>Nagrody</h2>
      <AssignReward criterion={criterion} criterionGrade={criterionGrade} />
    </div>
  );
}
