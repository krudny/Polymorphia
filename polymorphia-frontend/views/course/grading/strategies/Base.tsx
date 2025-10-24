import { ReactNode } from "react";
import Grade from "@/components/grading-components/grade";
import Submissions from "@/components/grading-components/submission";
import { ProjectVariant } from "@/components/grading-components/project-variant";
import { GradingComponent } from "@/views/course/grading/types";
import TargetList from "@/components/grading-components/target-list";

export abstract class BaseGradingStrategy {
  protected createTargetListComponent(): GradingComponent {
    return {
      component: <TargetList />,
      forceFullHeight: true,
    };
  }

  protected createRewardComponent(): GradingComponent {
    return {
      component: <Grade />,
    };
  }

  protected createSubmissionsComponent(): GradingComponent {
    return {
      component: <Submissions />,
    };
  }

  protected createProjectVariantComponent(): GradingComponent {
    return {
      component: <ProjectVariant />,
    };
  }
}
