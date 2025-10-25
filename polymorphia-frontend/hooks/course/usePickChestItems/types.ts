import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";

export interface UsePickChestItems {
  mutate: (variables: EquipmentChestOpenRequestDTO) => void;

  mutateAsync: (variables: EquipmentChestOpenRequestDTO) => Promise<void>;
}
