import { BaseGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/base";
import { ColumnComponent, GradingStrategy } from "@/views/course/grading/types";
import { ReactNode } from "react";

export class AssignmentGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): ColumnComponent[][] {
    return [
      [this.createTargetListComponent()],
      [this.createRewardComponent()],
      [this.createSubmissionsComponent()],
    ];
  }
}
