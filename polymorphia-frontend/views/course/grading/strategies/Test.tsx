import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import {
  GradingComponent,
  GradingStrategy,
} from "@/views/course/grading/types";
import { ReactNode } from "react";

export class TestGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): GradingComponent[][] {
    return [[this.createTargetListComponent()], [this.createRewardComponent()]];
  }
}
