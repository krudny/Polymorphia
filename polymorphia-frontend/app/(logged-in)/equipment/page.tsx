"use client";
import "../../../styles/equipment.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import ItemModal from "@/components/equipment/modals/ItemModal";
import ChestModal from "@/components/equipment/modals/ChestModal";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/general/Loading";
import EquipmentService from "@/services/equipment/EquipmentService";
import EquipmentSectionWrapper from "@/components/equipment/EquipmentSectionWrapper";
import OpeningChestModal from "@/components/equipment/modals/OpeningChestModal";
import { EquipmentProvider } from "@/components/providers/EquipmentContext";

export default function Equipment() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Ekwipunek");
  }, [setTitle]);

  // TODO: error handling
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ["equipment-items"],
    queryFn: () => EquipmentService.getItems(),
  });

  const { data: chests, isLoading: isChestsLoading } = useQuery({
    queryKey: ["equipment-chests"],
    queryFn: () => EquipmentService.getChests(),
  });

  if (isItemsLoading || isChestsLoading) {
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
