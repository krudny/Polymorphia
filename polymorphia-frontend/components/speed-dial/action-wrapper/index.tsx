import {
  mergeSlotProps,
  SpeedDialAction,
  SpeedDialActionProps,
} from "@mui/material";
import "../index.css";
import { forwardRef } from "react";
import { SpeedDialActionWrapperProps } from "./types";

const SpeedDialActionWrapper = forwardRef<
  HTMLButtonElement,
  SpeedDialActionWrapperProps & Partial<SpeedDialActionProps>
>(({ item, setActiveModal, ...props }, ref) => {
  const { onClick, modal } = item.useAction();

  // MUI injects its own slot props via SpeedDial host component, we need to merge those.
  const mergedSlotProps = mergeSlotProps(
    {
      slotProps: {
        tooltip: {
          title: item.label,
          slotProps: {
            transition: { timeout: 150 },
            popper: {
              modifiers: [
                {
                  name: "computeStyles",
                  options: { roundOffsets: false, gpuAcceleration: false },
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
      },
    },
    { slotProps: props.slotProps }
  );

  return (
    <SpeedDialAction
      ref={ref}
      {...props}
      icon={<span className="material-symbols">{item.icon}</span>}
      slotProps={mergedSlotProps.slotProps}
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
