"use client";

import { MarkdownProvider } from "@/providers/markdown";
import MarkdownWrapper from "@/components/markdown";
import { MarkdownTypes, ViewTypes } from "@/interfaces/general";
import { useEventParams } from "@/hooks/general/useEventParams";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import { useTitle } from "@/components/navigation/TitleContext";
import useGradableEvent from "@/hooks/course/useGradableEvent";
import { useEffect } from "react";

export default function GradableEventMarkdownView() {
  const { eventType } = useEventParams();
  const { setTitle } = useTitle();
  const { data: gradableEvent, isError } = useGradableEvent();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN);

  useEffect(() => {
    if (gradableEvent) {
      setTitle(gradableEvent.name);
    } else if (isError) {
      setTitle("");
    }
  }, [setTitle, gradableEvent, isError]);

  if (!speedDialKey) {
    return null;
  }

  return (
    <MarkdownProvider markdownType={MarkdownTypes.GRADABLE_EVENT}>
      <MarkdownWrapper speedDialKey={speedDialKey} />
    </MarkdownProvider>
  );
}
