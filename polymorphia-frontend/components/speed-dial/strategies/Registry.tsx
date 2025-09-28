import { AssignmentStrategy } from "@/components/speed-dial/strategies/markdown-view/Assignment";
import { ProjectStrategy } from "@/components/speed-dial/strategies/markdown-view/Project";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { TestGradingStrategy } from "@/components/speed-dial/strategies/instructor/TestGrading";
import { AssignmentGradingStrategy } from "@/components/speed-dial/strategies/instructor/AssignmentGrading";
import { SpeedDialKey, SpeedDialKeys } from "../types";
import { CourseGroupStrategy } from "@/components/speed-dial/strategies/instructor/CourseGroup";
import { RulesStrategy } from "@/components/speed-dial/strategies/markdown-view/Rules";

export class SpeedDialStrategyRegistry {
  private strategies = new Map<SpeedDialKey, SpeedDialStrategy>();

  constructor() {
    this.strategies.set(
      SpeedDialKeys.ASSIGNMENT_MARKDOWN,
      new AssignmentStrategy()
    );
    this.strategies.set(SpeedDialKeys.PROJECT_MARKDOWN, new ProjectStrategy());
    this.strategies.set(SpeedDialKeys.RULES_MARKDOWN, new RulesStrategy());
    this.strategies.set(SpeedDialKeys.TEST_GRADING, new TestGradingStrategy());
    this.strategies.set(
      SpeedDialKeys.ASSIGNMENT_GRADING,
      new AssignmentGradingStrategy()
    );
    this.strategies.set(
      SpeedDialKeys.PROJECT_GRADING,
      new AssignmentGradingStrategy()
    );
    this.strategies.set(SpeedDialKeys.COURSE_GROUP, new CourseGroupStrategy());
  }

  getStrategy(speedDialKey: SpeedDialKey): SpeedDialStrategy | null {
    if (!speedDialKey) {
      return null;
    }

    return this.strategies.get(speedDialKey) || null;
  }
}

export const speedDialStrategyRegistry = new SpeedDialStrategyRegistry();
