import { Dispatch, RefObject, SetStateAction } from "react";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { UsePreferredCourseUpdate } from "@/hooks/course/usePreferredCourseUpdate/types";

export interface CourseChoiceProps {
  courses: AvailableCoursesDTO[];
  currentCourseId?: number;
  containerRef: RefObject<HTMLDivElement | null>;
  fastForward: boolean;
}

export interface RenderCardProps {
  availableCourse: AvailableCoursesDTO;
  currentCourseId?: number;
  handleCourseSelection: UsePreferredCourseUpdate;
  setClickedDetails: Dispatch<
    SetStateAction<CourseChoiceClickedDetails | null>
  >;
}

export interface CourseChoiceClickedDetails {
  courseId: number;
  courseGroupId: number;
}
