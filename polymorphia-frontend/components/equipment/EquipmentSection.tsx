import "./index.css";
import { EquipmentSectionProps } from "@/components/equipment/types";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import EquipmentItem from "@/components/equipment/item";
import EquipmentChest from "@/components/equipment/chest";

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1 sm:grid-cols-1",
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const maxWidthMap: Record<number, string> = {
  1: "max-w-[20rem]",
  2: "max-w-[40rem]",
  3: "max-w-[60rem]",
  4: "max-w-[80rem]",
};

export function EquipmentSection({
  type,
  data,
  columns,
}: EquipmentSectionProps) {
  const { setCurrentItemModalData } = useEquipmentContext();

  const handleClickItem = (item: EquipmentItemResponseDTO): void => {
    if (item.details.length > 0) {
      setCurrentItemModalData(item);
    }
  };

  return (
    <section className={`${maxWidthMap[columns]} mb-5 mx-auto`}>
      <h1 className="equipment-header">
        {type === "item" ? "Przedmioty" : "Skrzynki"}
      </h1>
      <div className={`equipment-grid ${gridColsMap[columns]}`}>
        {data.map((reward) => {
          if (type === "item") {
            const itemData = reward as EquipmentItemResponseDTO;

            return (
              <div
                key={itemData.base.id}
                onClick={() => handleClickItem(itemData)}
              >
                <EquipmentItem itemData={itemData} />
              </div>
            );
          } else {
            const chestData = reward as EquipmentChestResponseDTO;

            return (
              <div key={chestData.base.id}>
                <EquipmentChest chestData={chestData} />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
