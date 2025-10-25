import Grade from "@/components/column-schema/column-component/grading/grade";
import Submissions from "@/components/column-schema/column-component/grading/submission";
import { ProjectVariant } from "@/components/column-schema/column-component/grading/project-variant";
import TargetList from "@/components/column-schema/column-component/grading/target-list";
import { ColumnComponent } from "@/components/column-schema/types";
import EquipmentSummary from "@/components/column-schema/column-component/course-groups/equipment-summary";

export abstract class BaseGradingStrategy {
  protected createTargetListComponent(): ColumnComponent {
    return {
      component: <TargetList />,
      forceFullHeight: true,
    };
  }

  protected createRewardComponent(): ColumnComponent {
    return {
      component: <Grade />,
    };
  }

  protected createSubmissionsComponent(): ColumnComponent {
    return {
      component: <Submissions />,
    };
  }

  protected createProjectVariantComponent(): ColumnComponent {
    return {
      component: <ProjectVariant />,
    };
  }

  protected createEquipmentSummary(): ColumnComponent {
    return {
      component: <EquipmentSummary />,
    };
  }
}
