import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

const EquipmentService = {
  getItems: async (): Promise<EquipmentItemResponseDTO[]> => {
    return [
      {
        base: {
          id: 1,
          itemBonusType: "PERCENTAGE_BONUS",
          name: "Marchewka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/carrot.jpg",
          percentage: 10,
          orderIndex: 0,
          limit: 4,
          isLimitReached: false,
          eventSectionId: 2,
        },
        details: [
          {
            id: 1,
            receivedDate: "2.06.2026",
            gainedXp: "1.2",
            isUsed: true,
          },
          {
            id: 2,
            receivedDate: "5.06.2026",
            gainedXp: "1.2",
            isUsed: true,
          },
        ],
      },
      {
        base: {
          id: 2,
          itemBonusType: "PERCENTAGE_BONUS",
          name: "Pietruszka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/parsley.jpg",
          percentage: 10,
          orderIndex: 1,
          limit: 4,
          isLimitReached: false,
          eventSectionId: 2,
        },
        details: [
          {
            id: 3,
            receivedDate: "2.06.2025",
            gainedXp: "2.5",
            isUsed: true,
          },
        ],
      },
      {
        base: {
          id: 3,
          itemBonusType: "PERCENTAGE_BONUS",
          name: "Apteczka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
          percentage: 10,
          orderIndex: 2,
          limit: 4,
          isLimitReached: false,
          eventSectionId: 2,
        },
        details: [
          {
            id: 4,
            receivedDate: "2.06.2026",
            gainedXp: "3.5",
            isUsed: true,
          },
          {
            id: 5,
            receivedDate: "5.06.2026",
            gainedXp: "4.0",
            isUsed: true,
          },
        ],
      },
      {
        base: {
          id: 4,
          itemBonusType: "PERCENTAGE_BONUS",
          name: "Weterynarz",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
          percentage: 10,
          orderIndex: 3,
          limit: 4,
          isLimitReached: false,
          eventSectionId: 2,
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
          imageUrl: "images/chests/s1.webp",
          orderIndex: 0,
          chestItems: [
            {
              id: 1,
              itemBonusType: "PERCENTAGE_BONUS",
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              isLimitReached: false,
              eventSectionId: 2,
            },
          ],
        },
        details: {
          id: 1,
          receivedDate: "12.06.2026",
          usedDate: "12.06.2026",
          isUsed: true,
          receivedItems: [
            {
              base: {
                id: 1,
                itemBonusType: "PERCENTAGE_BONUS",
                name: "Marchewka",
                bonusText: "+10% do kategorii lab",
                imageUrl: "images/items/carrot.jpg",
                percentage: 10,
                orderIndex: 0,
                limit: 4,
                isLimitReached: false,
                eventSectionId: 2,
              },
              details: {
                id: 6,
                receivedDate: "12.06.2026",
                gainedXp: "1.2",
                isUsed: true,
              },
            },
            {
              base: {
                id: 1,
                itemBonusType: "PERCENTAGE_BONUS",
                name: "Marchewka",
                bonusText: "+10% do kategorii lab",
                imageUrl: "images/items/carrot.jpg",
                percentage: 10,
                orderIndex: 0,
                limit: 4,
                isLimitReached: false,
                eventSectionId: 2,
              },
              details: {
                id: 7,
                receivedDate: "12.06.2026",
                gainedXp: "1.2",
                isUsed: true,
              },
            },
          ],
        },
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
              itemBonusType: "PERCENTAGE_BONUS",
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              isLimitReached: false,
              eventSectionId: 2,
            },
            {
              id: 2,
              itemBonusType: "PERCENTAGE_BONUS",
              name: "Marchewka2",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
              percentage: 10,
              orderIndex: 0,
              limit: 4,
              isLimitReached: false,
              eventSectionId: 2,
            },
          ],
        },
        details: {
          id: 2,
          receivedDate: "13.06.2026",
          isUsed: false,
        },
      },
    ];
  },
};

export default EquipmentService;
