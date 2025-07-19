import { ModalProps } from "../../../modal/types";
import { BonusInfo, BonusInfoItem } from "../types";
import { RefObject } from "react";

export interface PointsSummaryProps {
  eventSectionId: number;
  ref: RefObject<HTMLDivElement | null>;
}

export interface PointsSummaryElementProps {
  bonus: BonusInfo;
  onClick?: () => void;
  horizontal?: boolean;
}

export interface BonusInfoModalProps
  extends Omit<
    ModalProps,
    "title" | "isDataPresented" | "children" | "onRequestClose"
  > {
  bonusInfo: BonusInfo | null;
}

export interface BonusItemCardProps {
  item: BonusInfoItem;
}
