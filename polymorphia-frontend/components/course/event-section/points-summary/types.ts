import {
  AssignedItemResponseDTO,
  PointsSummaryBonusResponseDTO,
} from "@/interfaces/api/DTO";
import { ModalProps } from "../../../modal/types";
import { RefObject } from "react";

export interface PointsSummaryProps {
  eventSectionId: number;
  ref: RefObject<HTMLDivElement | null>;
}

export interface PointsSummaryBonus {
  title: string;
  data: PointsSummaryBonusResponseDTO;
}

export interface PointsSummaryElementProps {
  bonus: PointsSummaryBonus;
  onClick?: () => void;
  horizontal?: boolean;
}

export interface BonusInfoModalProps
  extends Omit<
    ModalProps,
    "title" | "isDataPresented" | "children" | "onRequestClose"
  > {
  bonusInfo: PointsSummaryBonus | null;
}

export interface BonusItemCardProps {
  assignedItem: AssignedItemResponseDTO;
}
