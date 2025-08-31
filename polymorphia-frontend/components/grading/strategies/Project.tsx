import { BaseGradingStrategy } from "@/components/grading/strategies/Base";
import { GradingComponents, GradingStrategy } from "@/components/grading/types";

export class ProjectGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): GradingComponents {
    return {
      list: this.createProjectGroupList(),
      components: [
        [this.createRewardComponent()],
        [this.createPullRequestComponent()],
      ],
    };
  }
}
