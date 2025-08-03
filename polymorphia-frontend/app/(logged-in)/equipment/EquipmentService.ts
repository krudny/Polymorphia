import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/DTO";

const EquipmentService = {
  getItems: async (): Promise<EquipmentItemResponseDTO[]> => {
    return [
      {
        base: {
          id: 1,
          type: "PERCENTAGE_BONUS",
          name: "Marchewka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/carrot.jpg",
          percentage: 10,
          orderIndex: 0,
          limit: 4,
          reachedLimit: false,
        },
        details: [
          {
            id: 1,
            receivedDate: "2.06.2026",
            xp: "1.2",
          },
          {
            id: 2,
            receivedDate: "5.06.2026",
            xp: "1.2",
          },
        ],
      },
      {
        base: {
          id: 2,
          type: "PERCENTAGE_BONUS",
          name: "Pietruszka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/parsley.jpg",
          percentage: 10,
          orderIndex: 1,
          limit: 4,
          reachedLimit: false,
        },
        details: [
          {
            id: 3,
            receivedDate: "2.06.2025",
            xp: "2.5",
          },
        ],
      },
      {
        base: {
          id: 3,
          type: "PERCENTAGE_BONUS",
          name: "Apteczka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
          percentage: 10,
          orderIndex: 2,
          limit: 4,
          reachedLimit: false,
        },
        details: [
          {
            id: 4,
            receivedDate: "2.06.2026",
            xp: "3.5",
          },
          {
            id: 5,
            receivedDate: "5.06.2026",
            xp: "4.0",
          },
        ],
      },
      {
        base: {
          id: 4,
          type: "PERCENTAGE_BONUS",
          name: "Weterynarz",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
          percentage: 10,
          orderIndex: 3,
          limit: 4,
          reachedLimit: false,
        },
        details: [],
      },
    ];
  },

  getChests: async (): Promise<EquipmentChestResponseDTO[]> => {
    return [
      {
        base: {
          id: 1,
          name: "Złota skrzynia",
          behavior: "ONE_OF_MANY",
          behaviorText: "Wybierz jeden przedmiot ze skrzynki",
          imageUrl: "images/chests/s1.png",
          orderIndex: 0,
          chestItems: [
            {
              id: 1,
              type: "PERCENTAGE_BONUS",
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              reachedLimit: false,
            },
          ],
        },
        details: [
          {
            id: 1,
            receivedDate: "12.06.2026",
            openedDate: "12.06.2026",
            receivedItems: [
              {
                base: {
                  id: 1,
                  type: "PERCENTAGE_BONUS",
                  name: "Marchewka",
                  bonusText: "+10% do kategorii lab",
                  imageUrl: "images/items/carrot.jpg",
                  percentage: 10,
                  orderIndex: 0,
                  limit: 4,
                  reachedLimit: false,
                },
                details: {
                  id: 6,
                  receivedDate: "12.06.2026",
                  xp: "1.2",
                },
              },
              {
                base: {
                  id: 1,
                  type: "PERCENTAGE_BONUS",
                  name: "Marchewka",
                  bonusText: "+10% do kategorii lab",
                  imageUrl: "images/items/carrot.jpg",
                  percentage: 10,
                  orderIndex: 0,
                  limit: 4,
                  reachedLimit: false,
                },
                details: {
                  id: 7,
                  receivedDate: "12.06.2026",
                  xp: "1.2",
                },
              },
            ],
          },
        ],
      },
      {
        base: {
          id: 2,
          name: "Srebrna skrzynia",
          behavior: "ONE_OF_MANY",
          behaviorText: "Wybierz jeden przedmiot ze skrzynki",
          imageUrl: "images/chests/s2.jpg",
          orderIndex: 1,
          chestItems: [
            {
              id: 1,
              type: "PERCENTAGE_BONUS",
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              reachedLimit: false,
            },
            {
              id: 2,
              type: "PERCENTAGE_BONUS",
              name: "Marchewka2",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              reachedLimit: false,
            },
          ],
        },
        details: [
          {
            id: 2,
            receivedDate: "13.06.2026",
            openedDate: undefined,
          },
        ],
      },
    ];
  },
};

export default EquipmentService;
