import { mergeSlotProps, SpeedDialAction } from "@mui/material";
import "../index.css";
import { SpeedDialActionWrapperProps } from "./types";

export default function SpeedDialActionWrapper({
  item,
  setActiveModal,
  ...props
}: SpeedDialActionWrapperProps) {
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
}
