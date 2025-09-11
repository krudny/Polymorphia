"use client";

import { useSpeedDialFactory } from "@/hooks/factory/useSpeedDialFactory";
import Loading from "@/components/loading/Loading";
import { SpeedDialEventProps } from "@/components/speed-dial/types";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";

export default function SpeedDialEventMobile({
  eventType,
  viewType,
}: SpeedDialEventProps) {
  const items = useSpeedDialFactory({ eventType, viewType });
  if (!items) {
    return <Loading />;
  }

  items.sort((a, b) => b.orderIndex - a.orderIndex);

  return <SpeedDialMobile items={items} />;
}
