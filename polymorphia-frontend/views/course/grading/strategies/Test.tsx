import { BaseGradingStrategy } from "@/views/course/grading/strategies/Base";
import {
  GradingComponents,
  GradingStrategy,
} from "@/views/course/grading/types";

export class TestGradingStrategy
  extends BaseGradingStrategy
  implements GradingStrategy
{
  getGradingComponents(): GradingComponents {
    return [[this.createRewardComponent()]];
  }
}
