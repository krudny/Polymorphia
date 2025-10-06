import { ItemResponseDTO, ChestResponseDTO } from "@/interfaces/api/reward";
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
