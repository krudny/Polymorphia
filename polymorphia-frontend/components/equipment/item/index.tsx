import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import ImageBadge from "@/components/image-badge/ImageBadge";
import "./index.css";
import "../index.css";
import { EquipmentItemProps } from "@/components/equipment/item/types";

export default function EquipmentItem({ itemData }: EquipmentItemProps) {
  const { imageUrl, name } = itemData.base;
  const quantity = itemData.details.length;

  return (
    <div
      className={`equipment-grid-item ${quantity > 0 ? "hover:cursor-pointer" : ""}`}
    >
      <Image
        src={`${API_STATIC_URL}/${imageUrl}`}
        alt={name}
        fill
        className="equipment-image"
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
      {quantity > 0 ? (
        <ImageBadge
          text={quantity.toString()}
          className="equipment-image-badge"
        />
      ) : (
        <div className="equipment-locked-item">
          <span>
            <p>lock</p>
          </span>
        </div>
      )}
    </div>
  );
}
