import { BaseGradingStrategy } from "@/components/column-schema/strategies/base";
import {
  ColumnComponent,
  ColumnSchemaStrategy,
} from "@/components/column-schema/types";

export class ProjectGradingStrategy
  extends BaseGradingStrategy
  implements ColumnSchemaStrategy
{
  getComponents(): ColumnComponent[][] {
    return [
      [this.createTargetListComponent()],
      [this.createRewardComponent()],
      [this.createSubmissionsComponent(), this.createProjectVariantComponent()],
    ];
  }
}
