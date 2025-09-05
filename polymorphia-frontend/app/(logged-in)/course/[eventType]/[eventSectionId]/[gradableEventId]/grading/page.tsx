"use client";

import { useEventParams } from "@/hooks/general/useEventParams";
import { GradingProvider } from "@/providers/grading/GradingContext";
import Grading from "@/views/course/grading";
import { useMediaQuery } from "react-responsive";

export default function GradingView() {
  const { eventType } = useEventParams();
  const isXL = useMediaQuery({ minWidth: "1400px" });

  return (
    <GradingProvider>
      <Grading eventType={eventType} columns={isXL ? 2 : 1} />
    </GradingProvider>
  );
}
