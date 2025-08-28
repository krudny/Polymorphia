import { BaseGradingStrategy } from "@/components/grading/strategies/Base";
import { GradingStrategy } from "@/components/grading/types";
import { ReactNode } from "react";

export class TestGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): ReactNode[] {
    return [this.createStudentsList(), this.createRewardComponent()];
  }
}
