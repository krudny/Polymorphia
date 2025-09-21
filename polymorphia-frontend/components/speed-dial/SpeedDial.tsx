"use client";

import {ReactNode, useState} from "react";
import "./index.css";
import {useSpeedDialFactory} from "@/hooks/factory/useSpeedDialFactory";
import Loading from "@/components/loading/Loading";
import {SpeedDial as SpeedDialMui, SpeedDialAction} from "@mui/material";
import {SpeedDialProps} from "./types";
import {useMediaQuery} from "react-responsive";

export default function SpeedDial({ speedDialKey }: SpeedDialProps) {
  const items = useSpeedDialFactory({ speedDialKey });
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMd = useMediaQuery({ minWidth: "768px" });

  if (!items) {
    return <Loading />;
  }

  items.sort((a, b) => b.orderIndex - a.orderIndex);

  return (
    <>
      <SpeedDialMui
        ariaLabel="SpeedDial"
        icon={<span className="material-symbols">add</span>}
        sx={{
          position: "fixed",
          bottom: isMd ? 0 : 16,
          right: 16,
          margin: 0,
          ...(isMd ? {} : { zIndex: 9999 }),
        }}
        FabProps={{
          style: {
            backgroundColor: "#262626",
            color: "#FAFAFA",
            borderRadius: 8,
            fontSize: 28,
            margin: 0,
            ...(isMd ? { display: "none" } : {}),
          },
        }}
        open={isMd ? true : isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
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
