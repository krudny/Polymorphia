import {ChestData, EquipmentSectionProps, ItemData} from "@/interfaces/equipment/EquipmentInterfaces";
import {API_STATIC_URL} from "@/services/api";
import "../../styles/equipment.css";
import Image from 'next/image';

export default function EquipmentSection({ type, data, onClick }: EquipmentSectionProps) {
  return (
    <section className="my-7">
      <h1 className="equipment-header">{type === 'item' ? 'Przedmioty' : 'Skrzynki'}</h1>
      <div className="equipment-grid">
        {data.map((item) => {
          if (type === 'item') {
            const itemData = item as ItemData;
            return (
              <div key={itemData.itemId} onClick={() => onClick(itemData)}>
                <div className={`equipment-grid-item ${itemData.quantity > 0 ? "hover:cursor-pointer" : ""}`}>
                  <Image
                    src={`${API_STATIC_URL}/${itemData.imageUrl}`}
                    alt={itemData.title}
                    fill
                    className="equipment-img"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  {itemData.quantity > 0 ? (
                    <div className="absolute bg-neutral-300 opacity-65 bottom-0 right-0 rounded-tl-2xl w-fit h-auto aspect-square flex-centered">
                      <h3 className="text-4xl px-4">{itemData.quantity}</h3>
                    </div>
                  ) : (
                    <div className="absolute bg-neutral-300 flex-centered opacity-70 w-full h-full">
                      <span className="material-symbols">
                        <p className="text-8xl">lock</p>
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
                  <button className="equipment-open-chest-btn" onClick={() => onClick(chestData)}>
                    <h3>Otwarta {chestData.openedDate}</h3>
                  </button>
                ) : (
                  <button className="equipment-open-chest-btn" onClick={() => onClick(chestData)}>
                    <h3>Otwórz skrzynię</h3>
                  </button>
                )}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}