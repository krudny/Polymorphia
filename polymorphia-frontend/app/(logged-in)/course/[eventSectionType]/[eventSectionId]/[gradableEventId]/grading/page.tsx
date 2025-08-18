"use client";

import TestGradingView from "@/views/grading/test";
import AssignmentGradingView from "@/views/grading/assignment";
import ProjectGradingView from "@/views/grading/project";
import { useEventParams } from "@/shared/params/useSeachParams";
import { TestGradingProvider } from "@/components/providers/grading/test/TestGradingContext";
import { EventType } from "@/interfaces/api/course";

export default function Grading() {
  const { eventType } = useEventParams();

  switch (eventType) {
    case EventType.TEST:
      return (
        <TestGradingProvider>
          <TestGradingView />;
        </TestGradingProvider>
      );
    case EventType.ASSIGNMENT:
      return <AssignmentGradingView />;
    case EventType.PROJECT:
      return <ProjectGradingView />;
  }
}
