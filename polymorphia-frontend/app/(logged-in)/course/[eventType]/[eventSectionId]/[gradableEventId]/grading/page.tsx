"use client";

import { useEventParams } from "@/hooks/general/useEventParams";
import { GradingProvider } from "@/providers/grading/GradingContext";
import { EventTypes } from "@/interfaces/api/course";
import { GradingTypes } from "@/views/course/grading/types";
import Grading from "../../../../../../../views/course/grading";
import { useMediaQuery } from "react-responsive";

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
  const isXL = useMediaQuery({ minWidth: "1400px" });

  return (
    <GradingProvider>
      <Grading gradingType={config.type} columns={isXL ? 2 : 1} />
    </GradingProvider>
  );
}
