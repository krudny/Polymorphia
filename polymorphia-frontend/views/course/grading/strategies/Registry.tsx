import { GradingStrategy } from "@/views/course/grading/types";
import { AssignmentGradingStrategy } from "@/views/course/grading/strategies/Assignment";
import { ProjectGradingStrategy } from "@/views/course/grading/strategies/Project";
import { TestGradingStrategy } from "@/views/course/grading/strategies/Test";

import { EventTypes } from "@/interfaces/general";

class GradingStrategyRegistry {
  private strategies = new Map<string, GradingStrategy>();

  constructor() {
    this.registerStrategy(EventTypes.TEST, new TestGradingStrategy());
    this.registerStrategy(
      EventTypes.ASSIGNMENT,
      new AssignmentGradingStrategy()
    );
    this.registerStrategy(EventTypes.PROJECT, new ProjectGradingStrategy());
  }

  registerStrategy(strategyName: string, strategy: GradingStrategy): void {
    this.strategies.set(strategyName, strategy);
  }

  getStrategy(strategyName: string): GradingStrategy | undefined {
    return this.strategies.get(strategyName);
  }
}

export const gradingStrategyRegistry = new GradingStrategyRegistry();
