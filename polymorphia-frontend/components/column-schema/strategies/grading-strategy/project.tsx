import { BaseGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/base";
import { ColumnComponent, GradingStrategy } from "@/views/course/grading/types";

export class ProjectGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): ColumnComponent[][] {
    return [
      [this.createTargetListComponent()],
      [this.createRewardComponent()],
      [this.createSubmissionsComponent(), this.createProjectVariantComponent()],
    ];
  }
}
