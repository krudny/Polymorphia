"use client";

import StudentView from "@/views/course/student";
import InstructorView from "@/views/course/instructor";
import { Roles } from "@/interfaces/api/temp";
import useUserRole from "@/hooks/general/useUserRole";

export default function Page() {
  const { data: role } = useUserRole();

  switch (role) {
    case Roles.STUDENT:
      return <StudentView />;
    case Roles.INSTRUCTOR:
      return <InstructorView />;
    default:
      return null;
  }
}
