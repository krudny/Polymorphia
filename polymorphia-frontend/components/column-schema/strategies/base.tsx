import Grade from "@/components/column-schema/column-component/grading-components/grade";
import Submissions from "@/components/column-schema/column-component/grading-components/submission";
import { ProjectVariant } from "@/components/column-schema/column-component/grading-components/project-variant";
import TargetList from "@/components/column-schema/column-component/grading-components/target-list";
import { ColumnComponent } from "@/components/column-schema/types";
import EquipmentSummary from "@/components/column-schema/column-component/course-groups-components/equipment-summary";

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

  protected createEquipmentSummaryComponent(): ColumnComponent {
    return {
      component: <EquipmentSummary />,
    };
  }
}
