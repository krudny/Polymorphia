import { Dispatch, ReactNode, SetStateAction } from "react";
import { SpeedDialItem } from "../types";

export interface SpeedDialActionWrapperProps {
  item: SpeedDialItem;
  setActiveModal: Dispatch<SetStateAction<ReactNode | null>>;
}
