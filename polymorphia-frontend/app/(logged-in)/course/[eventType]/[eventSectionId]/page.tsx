"use client";

import StudentGradableEventsView from "@/views/course/student";
import InstructorGradableEventsView from "@/views/course/instructor";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import useEventSections from "@/hooks/course/useEventSections";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { useEventParams } from "@/hooks/general/useEventParams";
import ErrorComponent from "@/components/error";

export default function GradableEventsView() {
  const { userRole } = useUserContext();
  const { setTitle } = useTitle();
  const { eventSectionId } = useEventParams();
  const { data: eventSections, error } = useEventSections();

  useEffect(() => {
    if (eventSections) {
      const title =
        eventSections.find((eventSection) => eventSection.id === eventSectionId)
          ?.name ?? "";

      setTitle(title);
    } else if (error) {
      setTitle("");
    }
  }, [eventSectionId, eventSections, error, setTitle]);

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
