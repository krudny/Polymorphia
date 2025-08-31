import { AssignedItemResponseDTO } from "../../reward/assigned";

export interface PointsSummaryResponseDTO {
  gained: PointsSummaryDetailsResponseDTO;
  flatBonus: PointsSummaryDetailsResponseDTO;
  percentageBonus: PointsSummaryDetailsResponseDTO;
  total: PointsSummaryDetailsResponseDTO;
}

export interface PointsSummaryDetailsResponseDTO {
  title: string;
  gainedXp: string;
  assignedItems?: AssignedItemResponseDTO[];
}
