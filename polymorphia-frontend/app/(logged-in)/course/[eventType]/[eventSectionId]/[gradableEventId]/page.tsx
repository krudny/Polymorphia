"use client";

import { MarkdownProvider } from "@/providers/markdown/MarkdownContext";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useEventParams } from "@/hooks/general/useEventParams";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import { ViewTypes } from "@/interfaces/api/course";
import useUserRole from "@/hooks/general/useUserRole";

export default function GradableEventView() {
  const wrapperRef = useFadeInAnimate();
  const { data: role } = useUserRole();
  const { eventType } = useEventParams();

  if (!role) {
    return null;
  }

  return (
    <MarkdownProvider>
      <div className="gradable-event" ref={wrapperRef}>
        <div className="gradable-event-speed-dial-mobile">
          <SpeedDialMobile
            eventType={eventType}
            viewType={ViewTypes.MARKDOWN}
            role={role}
          />
        </div>
        <div className="gradable-event-speed-dial-desktop">
          <SpeedDialDesktop
            eventType={eventType}
            viewType={ViewTypes.MARKDOWN}
            role={role}
          />
        </div>
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
