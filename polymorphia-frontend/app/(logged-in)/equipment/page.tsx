import { EquipmentProvider } from "@/providers/equipment";
import EquipmentView from "@/views/equipment";

export default function Equipment() {
  return (
    <EquipmentProvider>
      <EquipmentView />
    </EquipmentProvider>
  );
}
