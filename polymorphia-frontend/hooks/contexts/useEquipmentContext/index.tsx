import { useContext } from "react";
import { EquipmentContext } from "@/providers/equipment/EquipmentContext";
import { EquipmentContextInterface } from "@/providers/equipment/types";

export default function useEquipmentContext(): EquipmentContextInterface {
  const context = useContext(EquipmentContext);

  if (!context) {
    throw new Error(
      "useEquipmentContext must be used within EquipmentProvider"
    );
  }

  return context;
}
