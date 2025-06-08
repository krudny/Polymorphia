import { ModalProps } from "../../modal/ModalInterfaces";
import {
  BonusInfo,
  BonusInfoItem,
  EventSection,
} from "./EventSectionInterfaces";

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
  extends Omit<ModalProps, "title" | "isOpen" | "children"> {
  bonusInfo: BonusInfo | null;
}

export interface BonusItemCardProps {
  item: BonusInfoItem;
}
