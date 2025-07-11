"use client";

import { ReactNode, useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { SpeedDialProps } from "@/app/(logged-in)/test/types";

export default function SpeedDial({ items }: SpeedDialProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex justify-center group`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative w-13 h-13">
              <ButtonWithBorder
                text=""
                size="lg"
                className="!p-0 w-full h-full !text-2xl !flex-centered !rounded"
                icon={item.icon}
                onClick={() => {
                  if (item.modal) {
                    setActiveModal(item.modal(() => setActiveModal(null)));
                  }
                }}
              />
              <div
                className={`absolute right-10/12 top-1/2 -translate-y-1/2 mr-1 px-3 py-1 bg-secondary-dark text-neutral-300 text-[1.5rem] whitespace-nowrap rounded transition-all duration-250 ease-out pointer-events-none ${hoveredIndex === i ? "opacity-100 -translate-x-3" : "opacity-0 translate-x-0"}`}
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
