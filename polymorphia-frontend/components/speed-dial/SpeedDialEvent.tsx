"use client";

import "./index.css";
import { useSpeedDialFactory } from "@/hooks/factory/useSpeedDialFactory";
import { SpeedDialEventProps } from "./types";
import SpeedDial from "@/components/speed-dial/SpeedDial";

export default function SpeedDialEvent({ speedDialKey }: SpeedDialEventProps) {
  const items = useSpeedDialFactory({ speedDialKey });
  return <SpeedDial items={items} />;
}
