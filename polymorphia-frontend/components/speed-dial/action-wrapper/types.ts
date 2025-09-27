import { Dispatch, ReactNode, SetStateAction } from "react";
import { SpeedDialItem } from "../types";
import { SpeedDialActionProps } from "@mui/material";

interface BaseSpeedDialActionWrapperProps {
  item: SpeedDialItem;
  setActiveModal: Dispatch<SetStateAction<ReactNode | null>>;
}

export type SpeedDialActionWrapperProps = BaseSpeedDialActionWrapperProps &
  Partial<SpeedDialActionProps>;
