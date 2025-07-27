/* eslint-disable */

import { lab0, lab1, lab2, proj1 } from "@/app/(logged-in)/course/sampleData";
import {
  groups,
  studentNames,
} from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import {
  EventSectionResponseDTO,
  GradableEventResponseDTO,
  MarkdownResponseDTO,
  PointsSummaryResponseDTO,
  UserDetailsDTO,
} from "@/interfaces/api/DTO";

const allData: UserDetailsDTO[] = [];

for (let i = 0; i < 250; i++) {
  const studentName = studentNames[i % studentNames.length];
  const stage = Math.max(1, 6 - Math.floor(i / 50));

  const item = {
    studentName: studentName,
    animalName: studentName,
    evolutionStage: "Majestatyczna Bestia",
    imageUrl: `images/evolution-stages/${stage}.jpg`,
    position: i + 1,
    group: groups[i % groups.length],
  };
  allData.push(item);
}

// export interface GradableEventResponseDTO {
//   id: number;
//   name: string;
//   topic?: string;
//   gainedXp: number;
//   order: number;
// }

// interface PointsSummaryResponseDTO {
//   name: string;
//   gainedXp: number;
//   percentageBonus: PercentageBonus;
//   flatBonus: FlatBonus;
//   totalXp: number;
// }

// interface PercentageBonus {
//   xp: number;
//   items: BonusInfoItem[];
//   percentage: number;
// }

// interface FlatBonus {
//   xp: number;
//   items: BonusInfoItem[];
// }

// interface ProjectVariantResponseDTO {
//   name: string;
//   category: string;
//   shortCode: string;
//   imageUrl: string;
// }

const mockMarkdownStore: Record<number, string> = {
  15: lab1,
  16: lab2,
  30: lab0,
  33: proj1,
  34: "# Dlaczego prosty CRUD nie jest prosty? \n < Content >",
  32: "# Dlaczego refactoring hell to zło? \n < Content >",
};

const eventSectionData: EventSectionResponseDTO[] = [
  {
    id: 2,
    name: "Laboratorium",
    type: "assignment",
    order_index: 2,
  },
  {
    id: 3,
    name: "Projekt 1",
    type: "project",
    order_index: 4,
  },
  {
    id: 1,
    name: "Kartkówka",
    type: "test",
    order_index: 1,
  },
  {
    id: 4,
    name: "Git",
    type: "assignment",
    order_index: 0,
  },
  {
    id: 5,
    name: "Specjalny lab",
    type: "assignment",
    order_index: 3,
  },
  {
    id: 6,
    name: "Projekt 2",
    type: "project",
    order_index: 5,
  },
];

export const EventSectionService = {
  getEventSection: async (
    eventSectionId: number
  ): Promise<EventSectionResponseDTO> => {
    const eventSection: EventSectionResponseDTO | undefined =
      eventSectionData.find((section) => section.id === eventSectionId);
    if (!eventSection) {
      throw new Error("This event section does not exist.");
    }
    return eventSection;
  },
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionResponseDTO[]> => {
    return eventSectionData.sort((a, b) => a.order_index - b.order_index);
  },
  getGradableEvents: async (
    eventSectionId: number
  ): Promise<GradableEventResponseDTO[]> => {
    if (eventSectionId === 1) {
      const events: GradableEventResponseDTO[] = [
        {
          id: 1,
          type: "test",
          name: "Test 1",
          topic: "Instrukcje sterujące",
          gainedXp: 1.5,
          order_index: 1,
        },
        {
          id: 2,
          type: "test",
          name: "Test 2",
          topic: "Model obiektowy",
          gainedXp: 0.0,
          order_index: 2,
        },
        {
          id: 3,
          type: "test",
          name: "Test 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
          order_index: 3,
        },
        {
          id: 4,
          type: "test",
          name: "Test 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
          order_index: 4,
        },
        {
          id: 5,
          type: "test",
          name: "Test 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
          order_index: 5,
        },
        {
          id: 6,
          type: "test",
          name: "Test 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
          order_index: 6,
        },
        {
          id: 7,
          type: "test",
          name: "Test 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
          order_index: 7,
        },
        {
          id: 8,
          type: "test",
          name: "Test 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
          order_index: 8,
        },
        {
          id: 9,
          type: "test",
          name: "Test 9",
          topic: "Lambdy, streamy i zarządzanie zasobami",
          gainedXp: 0.0,
          order_index: 9,
        },
        {
          id: 10,
          type: "test",
          name: "Test 10",
          topic: "Kotlin jako alternatywa dla Javy",
          gainedXp: 0.0,
          order_index: 10,
        },
        {
          id: 11,
          type: "test",
          name: "Test 11",
          topic: "A może Rust?",
          gainedXp: 0.0,
          order_index: 11,
        },
        {
          id: 12,
          type: "test",
          name: "Test 12",
          topic: "Jak wycentrować diva",
          gainedXp: 0.0,
          order_index: 12,
        },
      ];
      return events.sort((a, b) => a.order_index - b.order_index);
    } else if (eventSectionId === 2) {
      const events: GradableEventResponseDTO[] = [
        {
          id: 15,
          type: "assignment",
          name: "Lab 1",
          topic: "Instrukcje sterujące w Javie",
          gainedXp: 2.0,
          order_index: 1,
        },
        {
          id: 16,
          type: "assignment",
          name: "Lab 2",
          topic: "Model obiektowy",
          gainedXp: 0.0,
          order_index: 2,
        },
        {
          id: 17,
          type: "assignment",
          name: "Lab 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
          order_index: 3,
        },
        {
          id: 18,
          type: "assignment",
          name: "Lab 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
          order_index: 4,
        },
        {
          id: 19,
          type: "assignment",
          name: "Lab 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
          order_index: 5,
        },
        {
          id: 20,
          type: "assignment",
          name: "Lab 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
          order_index: 6,
        },
        {
          id: 21,
          type: "assignment",
          name: "Lab 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
          order_index: 7,
        },
        {
          id: 22,
          type: "assignment",
          name: "Lab 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
          order_index: 8,
        },
      ];
      return events.sort((a, b) => a.order_index - b.order_index);
    } else if (eventSectionId === 4) {
      return [
        {
          id: 30,
          type: "assignment",
          name: "Lab 0",
          topic: "Git jest cool",
          gainedXp: 0.0,
          order_index: 1,
        },
      ];
    } else if (eventSectionId === 6) {
      return [
        {
          id: 32,
          type: "project",
          name: "Projekt 2",
          topic: "Refactoring hell",
          gainedXp: 0.0,
          order_index: 1,
        },
      ];
    } else if (eventSectionId === 3) {
      return [
        {
          id: 33,
          type: "project",
          name: "Projekt 1a",
          topic: "Darwin World",
          gainedXp: 0.0,
          order_index: 1,
        },
        {
          id: 34,
          type: "project",
          name: "Projekt 1b",
          topic: "Polymorphia",
          gainedXp: 0.0,
          order_index: 2,
        },
      ];
    } else {
      return [];
    }
  },
  getPointsSummary: async (
    eventSectionId: number
  ): Promise<PointsSummaryResponseDTO> => {
    if (eventSectionId === 1) {
      return {
        gainedXp: 3.5,
        percentageBonus: {
          xp: 0.2,
          percentage: 5,
          assignedItems: [
            {
              id: 1,
              item: {
                id: 1,
                name: "Pietruszka",
                bonusText: "+5% do kategorii Kartkówka",
                imageUrl: "images/items/parsley.jpg",
              },
              receivedDate: "07.06.2025",
              xp: 0.2,
            },
          ],
        },
        flatBonus: {
          xp: 0,
          assignedItems: [],
        },
        totalXp: 3.7,
      };
    } else if (eventSectionId === 2) {
      return {
        gainedXp: 2.0,
        percentageBonus: {
          xp: 0.0,
          percentage: 0,
          assignedItems: [],
        },
        flatBonus: {
          xp: 0,
          assignedItems: [],
        },
        totalXp: 2.0,
      };
    } else {
      return {
        gainedXp: 0,
        percentageBonus: {
          xp: 0.0,
          percentage: 0,
          assignedItems: [],
        },
        flatBonus: {
          xp: 0,
          assignedItems: [],
        },
        totalXp: 0,
      };
    }
  },

  getMarkdown: async (
    gradableEventId: number
  ): Promise<MarkdownResponseDTO> => {
    const markdown = mockMarkdownStore[gradableEventId];
    if (markdown !== undefined) {
      await new Promise<void>((resolve) => setTimeout(resolve, 300));
      return { markdown };
    } else {
      return { markdown: "" };
    }
  },

  saveMarkdown: async (
    gradableEventId: number,
    newMarkdown: string
  ): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    mockMarkdownStore[gradableEventId] = newMarkdown;
  },

  getReward: async (gradableEventId: number): Promise<GradableEvent> => {
    if (gradableEventId === 30) {
      return {
        id: 1,
        name: "Git",
        grade: {
          gainedXp: 2.0,
          createdDate: "07.06.2025",
          modifiedDate: "07.06.2025",
          chests: [
            {
              id: 1,
              assignedChestId: 3,
              name: "Srebrna Skrzynia",
              imageUrl: "images/chests/s1.png",
              opened: true,
              receivedDate: "07.06.2025",
            },
          ],
        },
        maxXp: 2.0,
        hidden: false,
        topic: "Git jest cool",
      };
    }
    if (gradableEventId === 15) {
      return {
        id: 1,
        name: "Lab 1",
        grade: {
          gainedXp: 0.75,
          createdDate: "07.06.2025",
          modifiedDate: "07.06.2025",
          chests: [
            {
              id: 1,
              assignedChestId: 3,
              name: "Srebrna Skrzynia",
              imageUrl: "images/chests/s2.jpg",
              opened: true,
              receivedDate: "07.06.2025",
            },
          ],
        },
        maxXp: 2.0,
        hidden: false,
        topic: "Lab 1",
      };
    }

    if (gradableEventId === 1) {
      return {
        id: 1,
        name: "Lab 1",
        grade: {
          gainedXp: 0.75,
          createdDate: "07.06.2025",
          modifiedDate: "07.06.2025",
          chests: [
            {
              id: 1,
              assignedChestId: 3,
              name: "Srebrna Skrzynia",
              imageUrl: "images/chests/s2.jpg",
              opened: true,
              receivedDate: "07.06.2025",
            },
          ],
        },
        maxXp: 2.0,
        hidden: false,
        topic: "Lab 1",
      };
    }

    return {};
  },

  getProjectVariant: async (
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    return [
      {
        shortCode: "G",
        name: "Pożary",
        category: "Mapa i roślinność",
        imageUrl: "images/general/pozary.jpg",
      },
      {
        shortCode: "2",
        name: "Podmianka",
        category: "Zwierzaki",
        imageUrl: "images/general/podmianka.jpg",
      },
    ];
  },
  getRandomPeople: async (searchTerm: string): Promise<UserDetailsDTO[]> => {
    let filteredData = allData;

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.studentName.toLowerCase().includes(lowerSearch)
      );
    }

    return filteredData;
  },
};
