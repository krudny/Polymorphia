import {BaseSpeedDialStrategy} from "@/components/speed-dial/strategies/Base";
import {SpeedDialContext, SpeedDialStrategy,} from "@/components/speed-dial/strategies/types";
import {SpeedDialItem} from "@/components/speed-dial/types";

export class AssignmentGradingStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    return [
      this.createRedirectToMarkdown(context),
    ];
  }
}
