import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import { GradingStrategy } from "@/views/course/grading/types";
import { ReactNode } from "react";

export class AssignmentGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): ReactNode[][] {
    return [
      [this.createTargetListComponent()],
      [this.createRewardComponent()],
      [this.createSubmissionsComponent()],
    ];
  }
}
