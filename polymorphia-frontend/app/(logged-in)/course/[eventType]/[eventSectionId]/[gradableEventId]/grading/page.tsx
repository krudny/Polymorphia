"use client";

import { useEventParams } from "@/hooks/general/useEventParams";
import { GradingProvider } from "@/components/providers/grading/GradingContext";
import { EventTypes } from "@/interfaces/api/course";
import { GradingTypes } from "@/components/grading/types";
import Grading from "@/components/grading";

const GRADING_CONFIG = {
  [EventTypes.TEST]: { type: GradingTypes.TEST_GRADING },
  [EventTypes.ASSIGNMENT]: {
    type: GradingTypes.ASSIGNMENT_GRADING,
  },
  [EventTypes.PROJECT]: { type: GradingTypes.PROJECT_GRADING },
} as const;

export default function GradingView() {
  const { eventType } = useEventParams();
  const config = GRADING_CONFIG[eventType];

  return (
    <GradingProvider>
      <Grading gradingType={config.type} columns={3} />
    </GradingProvider>
  );
}
