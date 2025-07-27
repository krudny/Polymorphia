import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import Image from "next/image";
import ImageBadge from "@/components/image-badge/ImageBadge";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import ButtonWithBorder from "../button/ButtonWithBorder";
import { EquipmentSectionProps } from "@/components/equipment/types";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/DTO";

export function EquipmentSection({ type, data }: EquipmentSectionProps) {
  const {
    setCurrentItemModalData,
    setCurrentChestModalData,
    setCurrentOpeningChestModalData,
  } = useContext(EquipmentContext);

  return (
    <section className="mb-5">
      <h1 className="equipment-header">
        {type === "item" ? "Przedmioty" : "Skrzynki"}
      </h1>
      <div className="equipment-grid">
        {data.map((item) => {
          if (type === "item") {
            const itemData = item as EquipmentItemResponseDTO;
            return (
              <div
                key={itemData.base.id}
                onClick={
                  itemData.assignmentDetailsArray.length > 0
                    ? () => setCurrentItemModalData(itemData)
                    : undefined
                }
              >
                <div
                  className={`equipment-grid-item ${itemData.assignmentDetailsArray.length > 0 ? "hover:cursor-pointer" : ""}`}
                >
                  <Image
                    src={`${API_STATIC_URL}/${itemData.base.imageUrl}`}
                    alt={itemData.base.name}
                    fill
                    className="equipment-image"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  {itemData.assignmentDetailsArray.length > 0 ? (
                    <ImageBadge
                      text={itemData.assignmentDetailsArray.length.toString()}
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
              </div>
            );
          } else {
            const chestData = item as EquipmentChestResponseDTO;
            return (
              <div key={chestData.assignedChest.chest.id}>
                <div className="equipment-grid-item">
                  <Image
                    src={`${API_STATIC_URL}/${chestData.assignedChest.chest.imageUrl}`}
                    alt={chestData.assignedChest.chest.name}
                    fill
                    className="equipment-image"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
                {chestData.assignedChest.openedDate ? (
                  <div className="equipment-chest-btn-wrapper">
                    <ButtonWithBorder
                      text={`Otwarta ${chestData.assignedChest.openedDate}`}
                      onClick={() => setCurrentChestModalData(chestData)}
                      className="equipment-chest-btn"
                    />
                  </div>
                ) : (
                  <div className="equipment-chest-btn-wrapper">
                    <ButtonWithBorder
                      text="Otwórz skrzynię"
                      onClick={() => setCurrentOpeningChestModalData(chestData)}
                      className="equipment-chest-btn"
                    />
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
