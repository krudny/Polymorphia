"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import useGradableEvent from "@/hooks/course/useGradableEvent";
import { GradingProvider } from "@/providers/grading";
import Grading from "@/views/course/grading";
import { useEffect } from "react";

export default function GradingView() {
  const { data: gradableEvent, isError } = useGradableEvent();
  const { setTitle } = useTitle();

  useEffect(() => {
    if (gradableEvent) {
      setTitle(gradableEvent.name);
    } else if (isError) {
      setTitle("");
    }
  }, [setTitle, gradableEvent, isError]);

  return (
    <GradingProvider>
      <Grading />
    </GradingProvider>
  );
}
