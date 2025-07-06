import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/DTO";
import { ChestData, ItemData } from "@/components/equipment/types";

const EquipmentService = {
  getItems: async (): Promise<ItemData[]> => {
    const response: EquipmentItemResponseDTO[] = [
      {
        itemId: 1,
        itemName: "Marchewka",
        itemBonus: "+10% do kategorii lab",
        imageUrl: "images/items/carrot.jpg",
        quantity: 2,
        items: [
          {
            itemId: 1,
            receivedDate: "2.06.2026",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            receivedDate: "5.06.2026",
            bonusXp: "1.2",
          },
        ],
      },
      {
        itemId: 2,
        itemName: "Pietruszka",
        itemBonus: "+10% do kategorii lab",
        imageUrl: "images/items/parsley.jpg",
        quantity: 1,
        items: [
          {
            itemId: 1,
            receivedDate: "2.06.2025",
            bonusXp: "2.5",
          },
        ],
      },
      {
        itemId: 3,
        itemName: "Apteczka",
        itemBonus: "+10% do kategorii lab",
        imageUrl: "images/items/aid.jpg",
        quantity: 2,
        items: [
          {
            itemId: 1,
            receivedDate: "2.06.2026",
            bonusXp: "3.5",
          },
          {
            itemId: 2,
            receivedDate: "5.06.2026",
            bonusXp: "4.0",
          },
        ],
      },
      {
        itemId: 4,
        itemName: "Weterynarz",
        itemBonus: "+10% do kategorii lab",
        imageUrl: "images/items/aid.jpg",
        quantity: 0,
        items: [],
      },
    ];

    return response.map((item) => ({
      itemId: item.itemId,
      title: item.itemName,
      subtitle: item.itemBonus,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
      items: item.items.map((instance) => ({
        itemId: instance.itemId,
        title: item.itemName,
        subtitle: `Zdobyto ${instance.receivedDate}`,
        imageUrl: item.imageUrl,
        bonusXp: instance.bonusXp,
      })),
    }));
  },

  getChests: async (): Promise<ChestData[]> => {
    const response: EquipmentChestResponseDTO[] = [
      {
        chestId: 1,
        chestName: "Złota skrzynia",
        behavior: "ONE_OF_MANY",
        imageUrl: "images/chests/s1.png",
        openedDate: "12.06.2026",
        items: [
          {
            itemId: 1,
            itemName: "Marchewka",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            itemName: "Marchewka",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
        ],
      },
      {
        chestId: 2,
        chestName: "Srebrna skrzynia",
        behavior: "ONE_OF_MANY",
        imageUrl: "images/chests/s2.jpg",
        openedDate: undefined,
        items: [
          {
            itemId: 1,
            itemName: "Marchewka",
            imageUrl: "images/items/carrot.jpg",
          },
          {
            itemId: 2,
            itemName: "Marchewka",
            imageUrl: "images/items/carrot.jpg",
          },
        ],
      },
    ];

    return response.map((chest) => ({
      chestId: chest.chestId,
      title: chest.chestName,
      subtitle:
        chest.openedDate !== undefined
          ? "Wygrane nagrody"
          : chest.behavior === "ALL"
            ? "Wybierz wszystkie"
            : "Wybierz jedno",
      behavior: chest.behavior,
      imageUrl: chest.imageUrl,
      openedDate: chest.openedDate,
      items: chest.items.map((item) => ({
        itemId: item.itemId,
        title: item.itemName,
        subtitle:
          chest.openedDate !== undefined ? `Zdobyto ${chest.openedDate}` : "",
        imageUrl: item.imageUrl,
        bonusXp: item.bonusXp,
      })),
    }));
  },
};

export default EquipmentService;
