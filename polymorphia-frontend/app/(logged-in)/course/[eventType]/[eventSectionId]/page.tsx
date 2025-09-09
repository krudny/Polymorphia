"use client";

import StudentGradableEventsView from "@/views/course/student";
import InstructorGradableEventsView from "@/views/course/instructor";
import useUserRole from "@/hooks/general/useUserRole";
import { Roles } from "@/interfaces/general";

export default function GradableEventsView() {
  const { data: role } = useUserRole();

  switch (role) {
    case Roles.STUDENT:
      return <StudentGradableEventsView />;
    case Roles.INSTRUCTOR:
      return <InstructorGradableEventsView />;
    default:
      return null;
  }
}
