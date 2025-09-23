import { ItemResponseDTO, ChestResponseDTO } from "../reward";
import {
  ItemAssignmentDetailsResponseDTO,
  ChestAssignmentDetailsResponseDTO,
} from "../reward/assigned";

export interface EquipmentItemResponseDTO {
  base: ItemResponseDTO;
  details: ItemAssignmentDetailsResponseDTO[];
}

export interface EquipmentChestResponseDTO {
  base: ChestResponseDTO;
  details: ChestAssignmentDetailsResponseDTO;
}

export interface EquipmentChestOpenRequestDTO {
  assignedChestId: number;
  itemId: number;
}
