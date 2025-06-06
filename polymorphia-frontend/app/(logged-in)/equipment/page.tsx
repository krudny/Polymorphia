"use client"
import "../../../styles/equipment.css"
import { useTitle } from "@/components/navigation/TitleContext";
import {useEffect, useState} from "react";
import ItemModal from "@/components/equipment/modals/ItemModal";
import ChestModal from "@/components/equipment/modals/ChestModal";
import {ChestData, ItemData} from "@/interfaces/equipment/EquipmentInterfaces";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/general/Loading";
import EquipmentService from "@/services/equipment/EquipmentService";
import EquipmentSectionWrapper from "@/components/equipment/EquipmentSectionWrapper";

export default function Equipment() {
  const [currentItemModalData, setCurrentItemModalData] = useState<ItemData | null>(null);
  const [currentChestModalData, setCurrentChestModalData] = useState<ChestData | null>(null);
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Ekwipunek');
  }, [setTitle]);

  // TODO: error handling
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ['equipment-items'],
    queryFn: () => EquipmentService.getItems(),
  });

  const { data: chests, isLoading: isChestsLoading} = useQuery({
    queryKey: ['equipment-chests'],
    queryFn: () => EquipmentService.getChests(),
  });

  if (isItemsLoading || isChestsLoading) {
    return <Loading />;
  }

  if (!items || !chests) {
    return <div>Error :c</div>;
  }

  return (
      <div className="equipment">
        <EquipmentSectionWrapper
          items={items}
          chests={chests}
          setCurrentChestModalData={setCurrentChestModalData}
          setCurrentItemModalData={setCurrentItemModalData}
        />

        <ItemModal
          item={currentItemModalData}
          onClose={() => setCurrentItemModalData(null)}
        />

        <ChestModal
          chest={currentChestModalData}
          onClose={() => setCurrentChestModalData(null)}
        />
      </div>
  );
}