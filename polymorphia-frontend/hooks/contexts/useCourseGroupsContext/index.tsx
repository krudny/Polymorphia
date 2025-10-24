import { GradingContextInterface } from "@/providers/grading/types";
import { useContext } from "react";
import { GradingContext } from "@/providers/grading";

export default function useCourseGroupsContext(): CourseGroupsContextInterface {
  const context = useContext(CourseGroupsContext);

  if (!context) {
    throw new Error(
      "useGroupsContext must be used within CourseGroupsProvider"
    );
  }

  return context;
}
