"use client";
import "./index.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import ItemModal from "@/components/equipment/modals/ItemModal";
import ChestModal from "@/components/equipment/modals/ChestModal";
import Loading from "@/components/loading";
import EquipmentSectionWrapper from "@/components/equipment/EquipmentSectionWrapper";
import OpeningChestModal from "@/components/equipment/modals/OpeningChestModal";
import { EquipmentProvider } from "@/providers/equipment/EquipmentContext";
import useEquipment from "@/hooks/course/useEquipment";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import ErrorComponent from "@/components/error";

function EquipmentContent() {
  const { setTitle } = useTitle();
  const { items, chests, isLoading } = useEquipment();
  const { currentOpeningChestModalData } = useEquipmentContext();

  useEffect(() => {
    setTitle("Ekwipunek");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (!items || !chests) {
    return <ErrorComponent message="Nie udało się załadować ekwipunku." />;
  }

  return (
    <div className="equipment">
      <EquipmentSectionWrapper items={items} chests={chests} />
      <ItemModal />
      <ChestModal />
      {currentOpeningChestModalData && (
        <OpeningChestModal
          currentOpeningChestModalData={currentOpeningChestModalData}
        />
      )}
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
