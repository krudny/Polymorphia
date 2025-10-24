import { ReactNode } from "react";
import Grade from "@/components/grading-components/grade";
import Submissions from "@/components/grading-components/submission";
import { ProjectVariant } from "@/components/grading-components/project-variant";
import { ColumnComponent } from "@/views/course/grading/types";
import TargetList from "@/components/grading-components/target-list";

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
}
