"use client";

import { MarkdownProvider } from "@/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown";
import { MarkdownTypes, ViewTypes } from "@/interfaces/general";
import { useEventParams } from "@/hooks/general/useEventParams";
import { getSpeedDialKey } from "@/components/speed-dial/util";

export default function GradableEventMarkdownView() {
  const { eventType } = useEventParams();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN);

  if (!speedDialKey) {
    return null;
  }

  return (
    <MarkdownProvider markdownType={MarkdownTypes.GRADABLE_EVENT}>
      <MarkdownWrapper speedDialKey={speedDialKey} />
    </MarkdownProvider>
  );
}
