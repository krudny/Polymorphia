"use client";

import { EventSectionType } from "@/components/course/event-section/types";
import TestGradingView from "@/views/grading/test";
import AssignmentGradingView from "@/views/grading/assignment";
import ProjectGradingView from "@/views/grading/project";
import { useEventParams } from "@/shared/params/useSeachParams";

export default function Grading() {
  const { eventSectionType } = useEventParams();

  switch (eventSectionType) {
    case EventSectionType.TEST:
      return <TestGradingView />;
    case EventSectionType.ASSIGNMENT:
      return <AssignmentGradingView />;
    case EventSectionType.PROJECT:
      return <ProjectGradingView />;
  }
}
