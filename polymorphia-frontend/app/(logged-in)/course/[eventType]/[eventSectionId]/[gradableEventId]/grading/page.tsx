"use client";

import TestGradingView from "@/views/grading/test";
import AssignmentGradingView from "@/views/grading/assignment";
import ProjectGradingView from "@/views/grading/project";
import { useEventParams } from "@/shared/params/useSeachParams";
import { TestGradingProvider } from "@/components/providers/grading/test/TestGradingContext";
import { EventTypes } from "@/interfaces/api/course";

export default function Grading() {
  const { eventType } = useEventParams();

  switch (eventType) {
    case EventTypes.TEST:
      return (
        <TestGradingProvider>
          <TestGradingView />;
        </TestGradingProvider>
      );
    case EventTypes.ASSIGNMENT:
      return <AssignmentGradingView />;
    case EventTypes.PROJECT:
      return <ProjectGradingView />;
  }
}
