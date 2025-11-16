"use client";

import StudentGradableEventsView from "@/views/gradable-events/student";
import InstructorGradableEventsView from "@/views/gradable-events/instructor";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import ErrorComponent from "@/components/error";

export default function GradableEventsView() {
  const { userRole } = useUserContext();

  switch (userRole) {
    case Roles.STUDENT:
      return <StudentGradableEventsView />;
    case Roles.INSTRUCTOR:
    case Roles.COORDINATOR:
      return <InstructorGradableEventsView />;
    default:
      return <ErrorComponent />;
  }
}
