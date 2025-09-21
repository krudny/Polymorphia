import { AssignmentStrategy } from "@/components/speed-dial/strategies/markdown-view/Assignment";
import { ProjectStrategy } from "@/components/speed-dial/strategies/markdown-view/Project";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { TestGradingStrategy } from "@/components/speed-dial/strategies/instructor/TestGrading";
import { AssignmentGradingStrategy } from "@/components/speed-dial/strategies/instructor/AssignmentGrading";
import { SpeedDialKey, SpeedDialKeys } from "../types";

export class SpeedDialStrategyRegistry {
  private strategies = new Map<SpeedDialKey, SpeedDialStrategy>();

  constructor() {
    this.strategies.set(
      SpeedDialKeys.ASSIGNMENT_MARKDOWN_STUDENT,
      new AssignmentStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.ASSIGNMENT_MARKDOWN_INSTRUCTOR,
      new AssignmentStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.PROJECT_MARKDOWN_STUDENT,
      new ProjectStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.PROJECT_MARKDOWN_INSTRUCTOR,
      new ProjectStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.TEST_GRADING_INSTRUCTOR,
      new TestGradingStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.ASSIGNMENT_GRADING_INSTRUCTOR,
      new AssignmentGradingStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.PROJECT_GRADING_INSTRUCTOR,
      new AssignmentGradingStrategy()
    );
  }

  getStrategy(speedDialKey: SpeedDialKey): SpeedDialStrategy | null {
    if (!speedDialKey) {
      return null;
    }

    return this.strategies.get(speedDialKey) || null;
  }
}

export const speedDialStrategyRegistry = new SpeedDialStrategyRegistry();
