import { SpeedDialAction } from "@mui/material";
import "../index.css";
import { forwardRef } from "react";
import { SpeedDialActionWrapperProps } from "./types";

const SpeedDialActionWrapper = forwardRef<
  HTMLDivElement,
  SpeedDialActionWrapperProps
>(({ item, setActiveModal }, ref) => {
  const { onClick, modal } = item.useAction();

  return (
    <SpeedDialAction
      key={item.id}
      ref={ref}
      icon={<span className="material-symbols">{item.icon}</span>}
      slotProps={{
        tooltip: {
          title: item.label,
          slotProps: {
            transition: { timeout: 150 },
            popper: {
              modifiers: [
                {
                  name: "computeStyles",
                  options: {
                    roundOffsets: false,
                    gpuAcceleration: false,
                  },
                },
                { name: "offset", options: { offset: [0, 3] } },
              ],
            },
          },
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
        if (modal) {
          setActiveModal(modal(() => setActiveModal(null)));
        } else if (onClick) {
          onClick();
        }
      }}
    />
  );
});

SpeedDialActionWrapper.displayName = "SpeedDialActionWrapper";

export default SpeedDialActionWrapper;
