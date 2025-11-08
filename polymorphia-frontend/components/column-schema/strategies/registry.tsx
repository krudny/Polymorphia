import { AssignmentGradingStrategy } from "@/components/column-schema/strategies/grading/assignment";
import { ProjectGradingStrategy } from "@/components/column-schema/strategies/grading/project";
import { TestGradingStrategy } from "@/components/column-schema/strategies/grading/test";
import { EventTypes, ViewTypes } from "@/interfaces/general";
import { ColumnSchemaStrategy } from "@/components/column-schema/types";
import { CourseGroupsStrategy } from "@/components/column-schema/strategies/course-groups/course-groups";

class ColumnSchemaStrategyRegistry {
  private strategies = new Map<string, ColumnSchemaStrategy>();

  constructor() {
    this.registerStrategy(EventTypes.TEST, new TestGradingStrategy());
    this.registerStrategy(
      EventTypes.ASSIGNMENT,
      new AssignmentGradingStrategy()
    );
    this.registerStrategy(EventTypes.PROJECT, new ProjectGradingStrategy());
    this.registerStrategy(ViewTypes.COURSE_GROUP, new CourseGroupsStrategy());
  }

  registerStrategy(strategyName: string, strategy: ColumnSchemaStrategy): void {
    this.strategies.set(strategyName, strategy);
  }

  getStrategy(strategyName: string): ColumnSchemaStrategy | undefined {
    return this.strategies.get(strategyName);
  }
}

export const columnSchemaStrategyRegistry = new ColumnSchemaStrategyRegistry();
