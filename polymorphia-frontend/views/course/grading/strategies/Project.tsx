import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import {
  GradingComponents,
  GradingStrategy,
} from "@/views/course/grading/types";

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
