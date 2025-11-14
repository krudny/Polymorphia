"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSpeedDialFactory } from "@/hooks/strategy/useSpeedDialStrategy";
import Loading from "@/components/loading";
import { SpeedDial as SpeedDialMui } from "@mui/material";
import { SpeedDialProps } from "@/components/speed-dial/types";
import { useMediaQuery } from "react-responsive";
import SpeedDialActionWrapper from "@/components/speed-dial/action-wrapper";

export function SpeedDial({ speedDialKey }: SpeedDialProps) {
  const items = useSpeedDialFactory({ speedDialKey });
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMd = useMediaQuery({ minWidth: "768px" });

  useEffect(() => {
    const container = document.getElementById("main-container");
    if (!container) {
      return;
    }

    if (!isMd) {
      container.classList.add("pb-20");
    } else {
      container.classList.remove("pb-20");
    }

    return () => {
      container.classList.remove("pb-20");
    };
  }, [isMd]);

  if (!items) {
    return <Loading />;
  }

  items.sort((a, b) => b.orderIndex - a.orderIndex);

  const speedDialContent = (
    <>
      <SpeedDialMui
        ariaLabel="SpeedDial"
        icon={<span className="material-symbols">add</span>}
        sx={{
          position: "fixed",
          bottom: isMd ? 6 : 10,
          right: isMd ? 12 : 4,
          margin: 0,
          ...(isMd ? {} : { zIndex: 40 }),
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

  return typeof document !== "undefined"
    ? createPortal(speedDialContent, document.body)
    : null;
}
