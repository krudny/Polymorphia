import { BaseGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/base";
import { ColumnComponent } from "@/components/column-schema/types";
import { GradingStrategy } from "@/components/column-schema/strategies/grading-strategy/types";

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
