import Grade from "@/components/column-schema/column-component/grading/grade";
import Submissions from "@/components/column-schema/column-component/grading/submission";
import { ProjectVariant } from "@/components/column-schema/column-component/grading/project-variant";
import { ColumnComponent } from "@/components/column-schema/types";
import StudentInfo from "@/components/column-schema/column-component/course-groups/student-info";
import LastActivity from "@/components/column-schema/column-component/course-groups/last-activity";
import TargetList from "@/components/column-schema/column-component/shared/target-list";

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

  protected createLastActivityComponent(): ColumnComponent {
    return {
      component: <LastActivity />,
      forceFullHeight: true,
    };
  }

  protected createStudentSummaryComponent(): ColumnComponent {
    return {
      component: <StudentInfo />,
    };
  }
}
