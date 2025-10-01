"use client";

import { MarkdownProvider } from "@/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useEventParams } from "@/hooks/general/useEventParams";
import { ViewTypes } from "@/interfaces/general";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function GradableEventMarkdownView() {
  const wrapperRef = useFadeInAnimate();
  const { userRole } = useUserContext();
  const { eventType } = useEventParams();
  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.MARKDOWN, userRole);
  if (!userRole || !speedDialKey) {
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
