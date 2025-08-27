"use client";
import "./index.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import ItemModal from "@/components/equipment/modals/ItemModal";
import ChestModal from "@/components/equipment/modals/ChestModal";
import Loading from "@/components/loading/Loading";
import EquipmentSectionWrapper from "@/components/equipment/EquipmentSectionWrapper";
import OpeningChestModal from "@/components/equipment/modals/OpeningChestModal";
import { EquipmentProvider } from "@/components/providers/equipment/EquipmentContext";
import useEquipment from "@/hooks/course/useEquipment";

export default function Equipment() {
  const { setTitle } = useTitle();
  const { items, chests, isLoading } = useEquipment();

  useEffect(() => {
    setTitle("Ekwipunek");
  }, [setTitle]);


  if (isLoading) {
    return <Loading />;
  }

  if (!items || !chests) {
    return <div>Error :c</div>;
  }

  return (
    <EquipmentProvider>
      <div className="equipment">
        <EquipmentSectionWrapper items={items} chests={chests} />

        <ItemModal />
        <ChestModal />
        <OpeningChestModal />
      </div>
    </EquipmentProvider>
  );
}
