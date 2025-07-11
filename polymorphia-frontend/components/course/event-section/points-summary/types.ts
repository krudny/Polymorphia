import { ModalProps } from "../../../modal/types";
import { BonusInfo, BonusInfoItem, EventSection } from "../types";

export interface PointsSummaryProps {
  eventSection: EventSection;
  ref: React.RefObject<HTMLDivElement | null>;
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
