"use client";

import StudentView from "@/views/course/student";
import InstructorView from "@/views/course/instructor";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export default function Page() {
  const { userType } = useUserContext();

  switch (userType) {
    case Roles.STUDENT:
      return <StudentView />;
    case Roles.INSTRUCTOR:
      return <InstructorView />;
    default:
      return null;
  }
}
