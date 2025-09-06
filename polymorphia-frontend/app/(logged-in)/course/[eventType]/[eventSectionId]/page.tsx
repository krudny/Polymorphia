"use client";

import StudentGradableEventsView from "@/views/course/student";
import InstructorGradableEventsView from "@/views/course/instructor";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export default function GradableEventsView() {
  const { userType } = useUserContext();

  switch (userType) {
    case Roles.STUDENT:
      return <StudentGradableEventsView />;
    case Roles.INSTRUCTOR:
      return <InstructorGradableEventsView />;
    default:
      return null;
  }
}
