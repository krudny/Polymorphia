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
          name: "Marchewka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/carrot.jpg",
        },
        assignmentDetailsArray: [
          {
            id: 1,
            receivedDate: "2.06.2026",
            xp: 1.2,
          },
          {
            id: 2,
            receivedDate: "5.06.2026",
            xp: 1.2,
          },
        ],
      },
      {
        base: {
          id: 2,
          name: "Pietruszka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/parsley.jpg",
        },
        assignmentDetailsArray: [
          {
            id: 3,
            receivedDate: "2.06.2025",
            xp: 2.5,
          },
        ],
      },
      {
        base: {
          id: 3,
          name: "Apteczka",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
        },
        assignmentDetailsArray: [
          {
            id: 4,
            receivedDate: "2.06.2026",
            xp: 3.5,
          },
          {
            id: 5,
            receivedDate: "5.06.2026",
            xp: 4.0,
          },
        ],
      },
      {
        base: {
          id: 4,
          name: "Weterynarz",
          bonusText: "+10% do kategorii lab",
          imageUrl: "images/items/aid.jpg",
        },
        assignmentDetailsArray: [],
      },
    ];
  },

  getChests: async (): Promise<EquipmentChestResponseDTO[]> => {
    return [
      {
        assignedChest: {
          id: 1,
          chest: {
            id: 1,
            name: "Złota skrzynia",
            behavior: "ONE_OF_MANY",
            behaviorText: "Wybierz jeden przedmiot ze skrzynki",
            imageUrl: "images/chests/s1.png",
          },
          receivedDate: "12.06.2026",
          openedDate: "12.06.2026",
        },
        receivedItems: [
          {
            item: {
              id: 1,
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
            },
            assignmentDetails: {
              id: 6,
              receivedDate: "12.06.2026",
              xp: 1.2,
            },
          },
          {
            item: {
              id: 1,
              name: "Marchewka",
              bonusText: "+10% do kategorii lab",
              imageUrl: "images/items/carrot.jpg",
            },
            assignmentDetails: {
              id: 7,
              receivedDate: "12.06.2026",
              xp: 1.2,
            },
          },
        ],
      },
      {
        assignedChest: {
          id: 2,
          chest: {
            id: 2,
            name: "Srebrna skrzynia",
            behavior: "ONE_OF_MANY",
            behaviorText: "Wybierz jeden przedmiot ze skrzynki",
            imageUrl: "images/chests/s2.jpg",
          },
          receivedDate: "13.06.2026",
          openedDate: undefined,
        },
        chestContent: [
          {
            id: 1,
            name: "Marchewka",
            bonusText: "+10% do kategorii lab",
            imageUrl: "images/items/carrot.jpg",
          },
          {
            id: 2,
            name: "Marchewka",
            bonusText: "+10% do kategorii lab",
            imageUrl: "images/items/carrot.jpg",
          },
        ],
      },
    ];
  },
};

export default EquipmentService;
