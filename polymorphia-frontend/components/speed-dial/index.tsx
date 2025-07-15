"use client";

import { ReactNode, useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { SpeedDialProps } from "@/components/speed-dial/types";
import "./index.css";

export default function SpeedDial({ items }: SpeedDialProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

  items.sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="speed-dial">
        {items.map((item, i) => (
          <div key={i}>
            <div className="speed-dial-content-wrapper">
              <div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="speed-dial-button-wrapper"
              >
                <ButtonWithBorder
                  text=""
                  size="lg"
                  className="speed-dial-button !flex-centered"
                  icon={item.icon}
                  onClick={() => {
                    if (item.modal) {
                      setActiveModal(item.modal(() => setActiveModal(null)));
                    }
                  }}
                />
              </div>

              <div
                className={`speed-dial-label ${hoveredIndex === i ? "opacity-100 -translate-x-3" : "opacity-0 translate-x-0"}`}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeModal}
    </>
  );
}
