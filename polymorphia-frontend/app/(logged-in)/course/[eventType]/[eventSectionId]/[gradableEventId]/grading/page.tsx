"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import useGradableEvent from "@/hooks/course/useGradableEvent";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradingProvider } from "@/providers/grading/GradingContext";
import Grading from "@/views/course/grading";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ColumnSchema from "@/components/column-schema";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { EventTypes } from "@/interfaces/general";

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
