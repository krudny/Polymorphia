"use client";
import { HallOfFameProvider } from "@/providers/hall-of-fame";
import HallOfFameView from "@/views/hall-of-fame";

export default function HallOfFame() {
  return (
    <HallOfFameProvider>
      <HallOfFameView />
    </HallOfFameProvider>
  );
}
