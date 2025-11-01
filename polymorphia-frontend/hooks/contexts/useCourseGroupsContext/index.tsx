import { useContext } from "react";
import { CourseGroupsContextInterface } from "@/providers/course-groups/types";
import { CourseGroupsContext } from "@/providers/course-groups";

export default function useCourseGroupsContext(): CourseGroupsContextInterface {
  const context = useContext(CourseGroupsContext);

  if (!context) {
    throw new Error(
      "useGroupsContext must be used within CourseGroupsProvider"
    );
  }

  return context;
}
