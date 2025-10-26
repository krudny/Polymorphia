import Grade from "@/components/column-schema/column-component/grading/grade";
import Submissions from "@/components/column-schema/column-component/grading/submission";
import { ProjectVariant } from "@/components/column-schema/column-component/grading/project-variant";
import TargetList from "@/components/column-schema/column-component/grading/target-list";
import { ColumnComponent } from "@/components/column-schema/types";
import StudentSummary from "@/components/column-schema/column-component/course-groups/student-summary";
import LastActivity from "@/components/column-schema/column-component/course-groups/last-activity";
import TargetListCourseGroups from "@/components/column-schema/column-component/course-groups/target-list";

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
    };
  }

  protected createStudentSummaryComponent(): ColumnComponent {
    return {
      component: <StudentSummary />,
    };
  }

  protected createTargetListCourseGroupsComponent(): ColumnComponent {
    return {
      component: <TargetListCourseGroups />,
      forceFullHeight: true,
    };
  }
}
