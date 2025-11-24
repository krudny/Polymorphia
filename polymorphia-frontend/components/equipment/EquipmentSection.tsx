import "./index.css";
import { EquipmentSectionProps } from "@/components/equipment/types";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import EquipmentItem from "@/components/equipment/components/item";
import EquipmentChest from "@/components/equipment/components/chest";
import { ChestButtons } from "@/components/equipment/components/chest-buttons";

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1 sm:grid-cols-1",
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const maxWidthMap: Record<number, string> = {
  1: "max-w-[15rem]",
  2: "max-w-[30rem]",
  3: "max-w-[45rem]",
  4: "max-w-[60rem]",
};

export function EquipmentSection({
  type,
  data,
  columns,
}: EquipmentSectionProps) {
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
              <div key={itemData.base.id}>
                <EquipmentItem itemData={itemData} />
              </div>
            );
          } else {
            const chestData = reward as EquipmentChestResponseDTO;

            return (
              <div key={chestData.base.id}>
                <EquipmentChest chestData={chestData} />
                {chestData.details.id && <ChestButtons chestData={chestData} />}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
