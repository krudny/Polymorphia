import { AssignmentGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/assignment";
import { ProjectGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/project";
import { TestGradingStrategy } from "@/components/column-schema/strategies/grading-strategy/test";

import { EventTypes } from "@/interfaces/general";
import { GradingStrategy } from "@/components/column-schema/strategies/grading-strategy/types";

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
