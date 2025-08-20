"use client";

import TestGradingView from "@/views/grading/test";
import AssignmentGradingView from "@/views/grading/assignment";
import ProjectGradingView from "@/views/grading/project";
import { useEventParams } from "@/shared/params/useSeachParams";
import { GradingProvider } from "@/components/providers/grading/GradingContext";
import { EventTypes } from "@/interfaces/api/course";

export default function Grading() {
  const { eventType } = useEventParams();

  const renderView = () => {
    switch (eventType) {
      case EventTypes.TEST:
        return <TestGradingView />;
      case EventTypes.ASSIGNMENT:
        return <AssignmentGradingView />;
      case EventTypes.PROJECT:
        return <ProjectGradingView />;
      default:
        return null;
    }
  };

  return <GradingProvider>{renderView()}</GradingProvider>;
}
