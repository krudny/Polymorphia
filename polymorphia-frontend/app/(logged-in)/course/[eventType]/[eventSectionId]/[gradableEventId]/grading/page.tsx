"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import useGradableEvent from "@/hooks/course/useGradableEvent";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradingProvider } from "@/providers/grading/GradingContext";
import Grading from "@/views/course/grading";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function GradingView() {
  const { eventType } = useEventParams();
  const { setTitle } = useTitle();
  const { data: gradableEvent, isError } = useGradableEvent();
  const isXL = useMediaQuery({ minWidth: "1400px" });

  useEffect(() => {
    if (gradableEvent) {
      setTitle(gradableEvent.name);
    } else if (isError) {
      setTitle("");
    }
  }, [setTitle, gradableEvent, isError]);

  return (
    <GradingProvider>
      <Grading eventType={eventType} columns={isXL ? 2 : 1} />
    </GradingProvider>
  );
}
