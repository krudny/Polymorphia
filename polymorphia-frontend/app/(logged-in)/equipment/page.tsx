import { EquipmentProvider } from "@/providers/equipment";
import EquipmentContent from "@/views/equipment";

export default function Equipment() {
  return (
    <EquipmentProvider>
      <EquipmentView />
    </EquipmentProvider>
  );
}
