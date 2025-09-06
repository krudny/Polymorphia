import { AssignmentStrategy } from "@/components/speed-dial/strategies/markdown-view/Assignment";
import { ProjectStrategy } from "@/components/speed-dial/strategies/markdown-view/Project";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { TestGradingStrategy } from "@/components/speed-dial/strategies/instructor/TestGrading";
import { AssignmentGradingStrategy } from "@/components/speed-dial/strategies/instructor/AssignmentGrading";
import { EventTypes, ViewTypes } from "@/interfaces/general";
import { Roles } from "@/interfaces/api/user";

class SpeedDialStrategyRegistry {
  private strategies = new Map<string, SpeedDialStrategy>();

  constructor() {
    this.registerStrategy(
      EventTypes.ASSIGNMENT,
      ViewTypes.MARKDOWN,
      Roles.STUDENT,
      new AssignmentStrategy()
    );
    this.registerStrategy(
      EventTypes.ASSIGNMENT,
      ViewTypes.MARKDOWN,
      Roles.INSTRUCTOR,
      new AssignmentStrategy()
    );
    this.registerStrategy(
      EventTypes.PROJECT,
      ViewTypes.MARKDOWN,
      Roles.STUDENT,
      new ProjectStrategy()
    );
    this.registerStrategy(
      EventTypes.PROJECT,
      ViewTypes.MARKDOWN,
      Roles.INSTRUCTOR,
      new ProjectStrategy()
    );
    this.registerStrategy(
      EventTypes.TEST,
      ViewTypes.GRADING,
      Roles.INSTRUCTOR,
      new TestGradingStrategy()
    );
    this.registerStrategy(
      EventTypes.ASSIGNMENT,
      ViewTypes.GRADING,
      Roles.INSTRUCTOR,
      new AssignmentGradingStrategy()
    );
    this.registerStrategy(
      EventTypes.PROJECT,
      ViewTypes.GRADING,
      Roles.INSTRUCTOR,
      new AssignmentGradingStrategy()
    );
  }

  getKey(eventType: string, viewType: string, role: string) {
    return `${eventType}:${viewType}:${role}`;
  }

  registerStrategy(
    eventType: string,
    viewType: string,
    role: string,
    strategy: SpeedDialStrategy
  ): void {
    const key = this.getKey(eventType, viewType, role);

    this.strategies.set(key, strategy);
  }

  getStrategy(
    eventType: string,
    viewType: string,
    role: string
  ): SpeedDialStrategy | undefined {
    const key = this.getKey(eventType, viewType, role);

    return this.strategies.get(key);
  }
}

export const speedDialStrategyRegistry = new SpeedDialStrategyRegistry();
