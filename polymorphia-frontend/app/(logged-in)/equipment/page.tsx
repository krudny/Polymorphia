"use client";
import "./index.css";
import Loading from "@/components/loading";
import EquipmentSectionWrapper from "@/components/equipment/EquipmentSectionWrapper";
import { EquipmentProvider } from "@/providers/equipment";
import useEquipment from "@/hooks/course/useEquipment";
import EquipmentModals from "@/components/equipment/modals";

function EquipmentContent() {
  const { items, chests, isLoading } = useEquipment();

  if (isLoading) {
    return <Loading />;
  }

  if (!items || !chests) {
    return <div>Error :c</div>;
  }

  return (
    <div className="equipment">
      <EquipmentSectionWrapper items={items} chests={chests} />
      <EquipmentModals />
    </div>
  );
}

export default function Equipment() {
  return (
    <EquipmentProvider>
      <EquipmentContent />
    </EquipmentProvider>
  );
}
