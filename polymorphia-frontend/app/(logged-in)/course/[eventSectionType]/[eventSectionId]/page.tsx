"use client";

import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { Roles } from "@/interfaces/api/DTO";
import StudentView from "@/views/course/student";
import InstructorView from "@/views/course/instructor";
import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";

export default function Page() {
  const params = useParams();
  const eventSectionType = params.eventSectionType as EventSectionType;
  const eventSectionId = Number(params.eventSectionId);

  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: () => UserService.getRole(),
    select: (data) => data.role,
  });

  switch (role) {
    case Roles.STUDENT:
      return (
        <StudentView
          eventSectionType={eventSectionType}
          eventSectionId={eventSectionId}
        />
      );
    case Roles.INSTRUCTOR:
      return (
        <InstructorView
          eventSectionType={eventSectionType}
          eventSectionId={eventSectionId}
        />
      );
    case Roles.COORDINATOR:
      return null;
  }
}
