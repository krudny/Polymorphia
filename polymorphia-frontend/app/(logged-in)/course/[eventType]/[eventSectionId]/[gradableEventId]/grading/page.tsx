"use client";

import { useEventParams } from "@/shared/params/useSeachParams";
import { GradingProvider } from "@/components/providers/grading/GradingContext";
import { EventTypes } from "@/interfaces/api/course";
import { GradingTypes } from "@/components/grading/types";
import Grading from "@/components/grading/grading";

const GRADING_CONFIG = {
  [EventTypes.TEST]: { type: GradingTypes.TEST_GRADING, columns: 3 },
  [EventTypes.ASSIGNMENT]: {
    type: GradingTypes.ASSIGNMENT_GRADING,
    columns: 3,
  },
  [EventTypes.PROJECT]: { type: GradingTypes.PROJECT_GRADING, columns: 3 },
} as const;

export default function GradingView() {
  const { eventType } = useEventParams();
  const config = GRADING_CONFIG[eventType];

  return (
    <GradingProvider>
      <Grading gradingType={config.type} columns={config.columns} />
    </GradingProvider>
  );
}
