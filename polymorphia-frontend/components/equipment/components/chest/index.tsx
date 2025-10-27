import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import { ReactNode } from "react";
import "../../index.css";
import { EquipmentChestProps } from "@/components/equipment/components/chest/types";
import ImageBadge from "@/components/image-badge/ImageBadge";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { EquipmentActions } from "@/providers/equipment/reducer/types";

export default function EquipmentChest({
  chestData,
  showBadge = false,
}: EquipmentChestProps): ReactNode {
  const { dispatch } = useEquipmentContext();

  const handleClick = () => {
    if (chestData.details.isUsed) {
      dispatch({
        type: EquipmentActions.SHOW_CHEST_MODAL,
        payload: chestData,
      });
    } else {
      dispatch({
        type: EquipmentActions.SHOW_OPENING_CHEST_MODAL,
        payload: chestData,
      });
    }
  };

  return (
    <div className="equipment-grid-item" onClick={handleClick}>
      <Image
        src={`${API_STATIC_URL}/${chestData.base.imageUrl}`}
        alt={chestData.base.name}
        fill
        className="equipment-image"
        priority
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
      {showBadge && chestData.details.id && (
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
  );
}
