import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import {
  GradingComponents,
  GradingStrategy,
} from "@/views/course/grading/types";

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
