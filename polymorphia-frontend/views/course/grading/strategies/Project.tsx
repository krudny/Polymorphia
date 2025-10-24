import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import {
  GradingComponent,
  GradingStrategy,
} from "@/views/course/grading/types";
import { ReactNode } from "react";

export class ProjectGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): GradingComponent[][] {
    return [
      [this.createRewardComponent()],
      [this.createTargetListComponent()],
      [this.createSubmissionsComponent(), this.createProjectVariantComponent()],
    ];
  }
}
