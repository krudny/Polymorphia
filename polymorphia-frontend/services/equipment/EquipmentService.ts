import {
  ChestData,
  ItemData,
} from "@/interfaces/equipment/EquipmentInterfaces";

const EquipmentService = {
  getItems: async (): Promise<ItemData[]> => {
    return [
      {
        itemId: 1,
        title: "Marchewka",
        subtitle: "+10% do kategorii lab",
        imageUrl: "images/items/carrot.jpg",
        quantity: 2,
        items: [
          {
            itemId: 1,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
        ],
      },
      {
        itemId: 2,
        title: "Pietruszka",
        subtitle: "+10% do kategorii lab",
        imageUrl: "images/items/parsley.jpg",
        quantity: 1,
        items: [
          {
            itemId: 1,
            title: "Pietruszka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/parsley.jpg",
            bonusXp: "1.2",
          },
        ],
      },
      {
        itemId: 3,
        title: "Apteczka",
        subtitle: "+10% do kategorii lab",
        imageUrl: "images/items/aid.jpg",
        quantity: 2,
        items: [
          {
            itemId: 1,
            title: "Apteczka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/aid.jpg",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            title: "Apteczka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/aid.jpg",
            bonusXp: "1.2",
          },
        ],
      },
      {
        itemId: 4,
        title: "Apteczka",
        subtitle: "+10% do kategorii lab",
        imageUrl: "images/items/aid.jpg",
        quantity: 0,
        items: [],
      },
    ];
  },

  getChests: async (): Promise<ChestData[]> => {
    return [
      {
        chestId: 1,
        title: "Złota skrzynia",
        subtitle: "Wygrane nagrody",
        behavior: "ONE_OF_MANY",
        imageUrl: "images/chests/s1.png",
        openedDate: "12.06.2026",
        items: [
          {
            itemId: 1,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
        ],
      },
      {
        chestId: 2,
        title: "Złota skrzynia",
        subtitle: "Wybierz jedno",
        behavior: "ONE_OF_MANY",
        imageUrl: "images/chests/s1.png",
        openedDate: undefined,
        items: [
          {
            itemId: 1,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
          {
            itemId: 2,
            title: "Marchewka",
            subtitle: "Zdobyto 2.06.2026",
            imageUrl: "images/items/carrot.jpg",
            bonusXp: "1.2",
          },
        ],
      },
    ];
  },
};

export default EquipmentService;
