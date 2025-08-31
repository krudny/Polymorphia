import { BaseGradingStrategy } from "@/components/grading/strategies/Base";
import { GradingComponents, GradingStrategy } from "@/components/grading/types";

export class AssignmentGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): GradingComponents {
    return {
      list: this.createStudentsList(),
      components: [
        [this.createRewardComponent()],
        [this.createPullRequestComponent()],
      ],
    };
  }
}
