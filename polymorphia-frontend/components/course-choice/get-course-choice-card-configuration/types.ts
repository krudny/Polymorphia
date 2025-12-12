import { Dispatch, SetStateAction } from "react";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { UsePreferredCourseUpdate } from "@/hooks/course/usePreferredCourseUpdate/types";
import { CourseChoiceClickedDetails } from "@/components/course-choice/types";

export interface GetCourseChoiceCardConfigurationProps {
  availableCourse: AvailableCoursesDTO;
  currentCourseId?: number;
  handleCourseSelection: UsePreferredCourseUpdate;
  setClickedDetails: Dispatch<
    SetStateAction<CourseChoiceClickedDetails | null>
  >;
}
