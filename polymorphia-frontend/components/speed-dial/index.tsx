"use client";

import { ReactNode, useState } from "react";
import { SpeedDialProps } from "@/components/speed-dial/types";
import "./index.css";
import { useSpeedDialItemsFactory } from "@/app/(logged-in)/course/[eventSectionType]/[eventSectionId]/[eventId]/util";
import Loading from "@/components/loading/Loading";
import { SpeedDial as SpeedDialMui, SpeedDialAction } from "@mui/material";

export default function SpeedDial({
  eventSectionType,
  eventId,
}: SpeedDialProps) {
  const items = useSpeedDialItemsFactory(eventSectionType, eventId);
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

  if (!items) {
    return <Loading />;
  }

  items.sort((a, b) => b.order - a.order);

  return (
    <>
      <SpeedDialMui
        ariaLabel="SpeedDial"
        icon={<span className="material-symbols">add</span>}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        FabProps={{
          style: {
            backgroundColor: "#262626",
            color: "#FAFAFA",
            borderRadius: 8,
            fontSize: 28,
            display: "none",
          },
        }}
        open={true}
        onOpen={() => {}}
        onClose={() => {}}
      >
        {items.map((item) => (
          <SpeedDialAction
            key={item.id}
            icon={<span className="material-symbols">{item.icon}</span>}
            slotProps={{
              tooltip: {
                title: item.label,
                // open: true,
              },
              fab: {
                style: {
                  backgroundColor: item.color ?? "#262626",
                  color: "#d4d4d4",
                  borderRadius: 8,
                  width: 56,
                  height: 56,
                  fontSize: 28,
                },
              },
            }}
            onClick={() => {
              if (item.modal) {
                setActiveModal(item.modal(() => setActiveModal(null)));
              } else if (item.onClick) {
                item.onClick();
              }
            }}
          />
        ))}
      </SpeedDialMui>
      {activeModal}
    </>
  );
}
