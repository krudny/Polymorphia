import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import { ChestButtons } from "@/components/equipment/chest-buttons";
import { ReactNode } from "react";
import "../index.css";
import { EquipmentChestProps } from "@/components/equipment/chest/types";

export default function EquipmentChest({
  chestData,
}: EquipmentChestProps): ReactNode {
  return (
    <>
      <div className="equipment-grid-item">
        <Image
          src={`${API_STATIC_URL}/${chestData.base.imageUrl}`}
          alt={chestData.base.name}
          fill
          className="equipment-image"
          priority
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        {!chestData.details.id && (
          <div className="equipment-locked-item">
            <span>
              <p>lock</p>
            </span>
          </div>
        )}
      </div>
      {chestData.details.id && <ChestButtons chestData={chestData} />}
    </>
  );
}
