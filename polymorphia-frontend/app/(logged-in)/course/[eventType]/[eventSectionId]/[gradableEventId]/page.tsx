"use client";

import { MarkdownProvider } from "@/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useEventParams } from "@/hooks/general/useEventParams";
import useUserRole from "@/hooks/general/useUserRole";
import { ViewTypes } from "@/interfaces/general";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import SpeedDial from "@/components/speed-dial/SpeedDial";

export default function GradableEventMarkdownView() {
  const wrapperRef = useFadeInAnimate();
  const { data: role } = useUserRole();
  const { eventType } = useEventParams();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN, role);

  if (!role || !speedDialKey) {
    return null;
  }

  return (
    <MarkdownProvider>
      <div className="gradable-event" ref={wrapperRef}>
        <SpeedDial speedDialKey={speedDialKey} />
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
