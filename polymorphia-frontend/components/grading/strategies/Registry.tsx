import { GradingStrategy, GradingTypes } from "@/components/grading/types";
import { AssignmentGradingStrategy } from "@/components/grading/strategies/Assignment";
import { ProjectGradingStrategy } from "@/components/grading/strategies/Project";
import { TestGradingStrategy } from "@/components/grading/strategies/Test";

class GradingStrategyRegistry {
  private strategies = new Map<string, GradingStrategy>();

  constructor() {
    this.registerStrategy(GradingTypes.TEST_GRADING, new TestGradingStrategy());
    this.registerStrategy(GradingTypes.ASSIGNMENT_GRADING, new AssignmentGradingStrategy());
    this.registerStrategy(GradingTypes.PROJECT_GRADING, new ProjectGradingStrategy());
  }

  registerStrategy(strategyName: string, strategy: GradingStrategy): void {
    this.strategies.set(strategyName, strategy);
  }

  getStrategy(strategyName: string): GradingStrategy | undefined {
    return this.strategies.get(strategyName);
  }
}

export const gradingStrategyRegistry = new GradingStrategyRegistry();