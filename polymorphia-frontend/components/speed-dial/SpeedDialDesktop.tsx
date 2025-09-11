"use client";

import "./index.css";
import { SpeedDial as SpeedDialMui, SpeedDialAction } from "@mui/material";
import { SpeedDialProps } from "./types";
import { ReactNode, useState } from "react";

export default function SpeedDialDesktop({ items }: SpeedDialProps) {
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

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
