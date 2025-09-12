import { RefObject } from "react";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { UsePreferredCourseUpdate } from "@/hooks/course/usePreferredCourseUpdate/types";

export interface CourseChoiceProps {
  currentCourseId?: number;
  redirectPage?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  fastForward: boolean;
}

export interface RenderCardProps {
  availableCourse: AvailableCoursesDTO;
  currentCourseId?: number;
  handleCourseSelection: UsePreferredCourseUpdate;
}
