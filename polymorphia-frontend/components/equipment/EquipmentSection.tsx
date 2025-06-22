import {
  ChestData,
  EquipmentSectionProps,
  ItemData,
} from "@/interfaces/equipment/EquipmentInterfaces";
import { API_STATIC_URL } from "@/services/api";
import "../../styles/equipment.css";
import Image from "next/image";
import ImageBadge from "@/components/general/ImageBadge";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/EquipmentContext";
import ButtonWithBorder from "../general/ButtonWithBorder";

export function EquipmentSection({ type, data }: EquipmentSectionProps) {
  const {
    setCurrentItemModalData,
    setCurrentChestModalData,
    setCurrentOpeningChestModalData,
  } = useContext(EquipmentContext);

  return (
    <section className="my-7">
      <h1 className="equipment-header">
        {type === "item" ? "Przedmioty" : "Skrzynki"}
      </h1>
      <div className="equipment-grid">
        {data.map((item) => {
          if (type === "item") {
            const itemData = item as ItemData;
            return (
              <div
                key={itemData.itemId}
                onClick={
                  itemData.quantity > 0
                    ? () => setCurrentItemModalData(itemData)
                    : undefined
                }
              >
                <div
                  className={`equipment-grid-item ${itemData.quantity > 0 ? "hover:cursor-pointer" : ""}`}
                >
                  <Image
                    src={`${API_STATIC_URL}/${itemData.imageUrl}`}
                    alt={itemData.title}
                    fill
                    className="equipment-img"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  {itemData.quantity > 0 ? (
                    <ImageBadge
                      text={itemData.quantity.toString()}
                      className={"rounded-tl-2xl rounded-br-2xl text-3xl w-10"}
                    />
                  ) : (
                    <div className="equipment-locked-item">
                      <span>
                        <p className="opacity-80">lock</p>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            const chestData = item as ChestData;
            return (
              <div key={chestData.chestId}>
                <div className="equipment-grid-item">
                  <Image
                    src={`${API_STATIC_URL}/${chestData.imageUrl}`}
                    alt={chestData.title}
                    fill
                    className="equipment-img"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
                {chestData.openedDate ? (
                  <div className="equipment-chest-btn">
                    <ButtonWithBorder
                      text={`Otwarta ${chestData.openedDate}`}
                      onClick={() => setCurrentChestModalData(chestData)}
                      className="w-full !py-0 text-lg lg:text-2xl rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="equipment-chest-btn">
                    <ButtonWithBorder
                      text="Otwórz skrzynię"
                      onClick={() => setCurrentOpeningChestModalData(chestData)}
                      className="w-full !py-0 text-lg lg:text-2xl rounded-xl"
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
