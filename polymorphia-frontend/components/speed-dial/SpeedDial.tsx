"use client";

import { ReactNode, useState } from "react";
import "./index.css";
import { useSpeedDialFactory } from "@/hooks/strategy/useSpeedDialStrategy";
import Loading from "@/components/loading";
import { SpeedDial as SpeedDialMui } from "@mui/material";
import { SpeedDialProps } from "@/components/speed-dial/types";
import { useMediaQuery } from "react-responsive";
import SpeedDialActionWrapper from "@/components/speed-dial/action-wrapper";

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
          bottom: isMd ? 4 : 20,
          right: isMd ? 22 : 12,
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
          <SpeedDialActionWrapper
            item={item}
            setActiveModal={setActiveModal}
            key={item.id}
          />
        ))}
      </SpeedDialMui>
      {activeModal}
    </>
  );
}
