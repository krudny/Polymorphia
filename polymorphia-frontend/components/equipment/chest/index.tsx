import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import { ReactNode } from "react";
import "../index.css";
import { EquipmentChestProps } from "@/components/equipment/chest/types";
import ImageBadge from "@/components/image-badge/ImageBadge";

export default function EquipmentChest({
  chestData,
  showBadge = false,
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
        {showBadge && (
          <ImageBadge
            icon={chestData.details.isUsed ? "trophy" : "key"}
            className="equipment-image-badge"
          />
        )}
        {!chestData.details.id && (
          <div className="equipment-locked-item">
            <span>
              <p>lock</p>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
