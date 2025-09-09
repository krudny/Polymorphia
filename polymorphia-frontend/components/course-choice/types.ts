import { RefObject } from "react";

export default interface CourseChoiceProps {
  currentCourseId?: number;
  redirectPage?: string;
  containerRef: RefObject<HTMLDivElement | null>;
}
