import { BaseGradingStrategy } from "@/components/grading/strategies/Base";
import { GradingStrategy } from "@/components/grading/types";
import { ReactNode } from "react";

export class ProjectGradingStrategy extends BaseGradingStrategy implements GradingStrategy {
  getGradingComponents(): ReactNode[] {
    return [this.createProjectGroupList(), this.createRewardComponent(), this.createPullRequestComponent()];
  }
}