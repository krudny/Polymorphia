import { EventTypes } from "@/interfaces/api/course";
import { AssignmentStrategy } from "@/components/speed-dial/strategy/assignment";
import { ProjectStrategy } from "@/components/speed-dial/strategy/project";
import { SpeedDialStrategy } from "@/components/speed-dial/strategy/types";

class SpeedDialStrategyRegistry {
  private strategies = new Map<string, SpeedDialStrategy>();

  constructor() {
    this.registerStrategy(EventTypes.ASSIGNMENT, new AssignmentStrategy());
    this.registerStrategy(EventTypes.PROJECT, new ProjectStrategy());
  }

  registerStrategy(strategyName: string, strategy: SpeedDialStrategy): void {
    this.strategies.set(strategyName, strategy);
  }

  getStrategy(strategyName: string): SpeedDialStrategy | undefined {
    return this.strategies.get(strategyName);
  }
}

export const speedDialStrategyRegistry = new SpeedDialStrategyRegistry();
