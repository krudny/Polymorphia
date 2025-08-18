"use client";

import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import StudentView from "@/views/course/student";
import InstructorView from "@/views/course/instructor";
import { Roles } from "@/interfaces/api/temp";

export default function Page() {
  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: () => UserService.getRole(),
    select: (data) => data.role,
  });

  switch (role) {
    case Roles.STUDENT:
      return <StudentView />;
    case Roles.INSTRUCTOR:
      return <InstructorView />;
    case Roles.COORDINATOR:
      return null;
  }
}
