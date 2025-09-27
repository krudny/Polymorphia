"use client";

import {MarkdownProvider} from "@/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown";
import {useEventParams} from "@/hooks/general/useEventParams";
import useUserRole from "@/hooks/general/useUserRole";
import {MarkdownTypes, ViewTypes} from "@/interfaces/general";
import {getSpeedDialKey} from "@/components/speed-dial/util";

export default function GradableEventMarkdownView() {
  const { data: role } = useUserRole();
  const { eventType } = useEventParams();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN, role);

  if (!role || !speedDialKey) {
    return null;
  }

  return (
    <MarkdownProvider markdownType={MarkdownTypes.GRADABLE_EVENT}>
      <MarkdownWrapper />
    </MarkdownProvider>
  );
}
