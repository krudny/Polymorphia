"use client";

import { SpeedDialEventProps } from "@/components/speed-dial/types";
import { useSpeedDialFactory } from "@/hooks/factory/useSpeedDialFactory";
import Loading from "@/components/loading/Loading";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";

export default function SpeedDialEventDesktop({
  eventType,
  viewType,
}: SpeedDialEventProps) {
  const items = useSpeedDialFactory({ eventType, viewType });

  if (!items) {
    return <Loading />;
  }

  return <SpeedDialDesktop items={items} />;
}
