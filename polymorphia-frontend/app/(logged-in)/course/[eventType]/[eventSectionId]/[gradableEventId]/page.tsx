"use client";

import { MarkdownProvider } from "@/providers/markdown";
import MarkdownWrapper from "@/components/markdown";
import { EventTypes, MarkdownTypes, ViewTypes } from "@/interfaces/general";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import TasksView from "@/views/tasks";

export default function GradableEventMarkdown() {
  const { eventType } = useEventParams();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN);

  if (!speedDialKey) {
    return null;
  }

  return (
    <MarkdownProvider markdownType={MarkdownTypes.GRADABLE_EVENT}>
      {eventType === EventTypes.TASK ? (
        <TasksView />
      ) : (
        <MarkdownWrapper speedDialKey={speedDialKey} />
      )}
    </MarkdownProvider>
  );
}
