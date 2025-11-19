import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";
import { UseMutationResult } from "@tanstack/react-query";

export type UsePickChestItems = UseMutationResult<
  void,
  Error,
  EquipmentChestOpenRequestDTO
>;
