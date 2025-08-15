import {
  AssignedItemResponseDTO,
  PointsSummaryDetailsResponseDTO,
} from "@/interfaces/api/DTO";
import { ModalProps } from "../../../modal/types";
import { RefObject } from "react";

export interface PointsSummaryProps {
  eventSectionId: number;
  ref: RefObject<HTMLDivElement | null>;
}

export interface PointsSummaryElementProps {
  bonus: PointsSummaryDetailsResponseDTO;
  onClick?: () => void;
  horizontal?: boolean;
}

export interface BonusInfoModalProps
  extends Omit<
    ModalProps,
    "title" | "isDataPresented" | "children" | "onRequestClose"
  > {
  bonusInfo: PointsSummaryDetailsResponseDTO | null;
}

export interface BonusItemCardProps {
  assignedItem: AssignedItemResponseDTO;
}
