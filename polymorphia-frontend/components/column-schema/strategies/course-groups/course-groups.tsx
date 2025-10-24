import { BaseGradingStrategy } from "@/components/column-schema/strategies/base";
import {
  ColumnComponent,
  ColumnSchemaStrategy,
} from "@/components/column-schema/types";

export class CourseGroupsStrategy
  extends BaseGradingStrategy
  implements ColumnSchemaStrategy
{
  getComponents(): ColumnComponent[][] {
    return [
      [],
      [this.createProjectVariantComponent()],
      [this.createProjectVariantComponent()],
    ];
  }
}
