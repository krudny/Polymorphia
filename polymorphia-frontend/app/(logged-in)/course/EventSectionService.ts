/* eslint-disable */
// @ts-nocheck

import { lab0, lab1, lab2, proj1 } from "@/app/(logged-in)/course/sampleData";
import {
  groups,
  studentNames,
} from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { UserDetailsDTO } from "@/interfaces/api/DTO";
import {
  BonusInfoItem,
  EventSectionResponseDTO,
} from "@/components/course/event-section/types";

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

export interface GradableEventResponseDTO {
  id: number;
  name: string;
  topic?: string;
  gainedXp: number;
  order: number;
  hasChest: boolean;
  isLocked: boolean;
}

interface PointsSummaryResponseDTO {
  name: string;
  gainedXp: number;
  percentageBonus: PercentageBonus;
  flatBonus: FlatBonus;
  totalXp: number;
}

interface PercentageBonus {
  xp: number;
  items: BonusInfoItem[];
  percentage: number;
}

interface FlatBonus {
  xp: number;
  items: BonusInfoItem[];
}

interface ProjectVariantResponseDTO {
  name: string;
  category: string;
  shortCode: string;
  imageUrl: string;
}

const mockMarkdownStore: Record<number, string> = {
  15: lab1,
  16: lab2,
  30: lab0,
  33: proj1,
  34: "# Dlaczego prosty CRUD nie jest prosty? \n < Content >",
  32: "# Dlaczego refactoring hell to zło? \n < Content >",
};

export const EventSectionService = {
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionResponseDTO[]> => {
    const data = [
      {
        id: 2,
        name: "Laboratorium",
        type: "assignment",
        order: 2,
        hidden: false,
      },
      {
        id: 3,
        name: "Projekt 1",
        type: "project",
        order: 4,
        hidden: false,
      },
      {
        id: 1,
        name: "Kartkówka",
        type: "test",
        order: 1,
        hidden: false,
      },
      {
        id: 4,
        name: "Git",
        type: "assignment",
        order: 0,
        hidden: false,
      },
      {
        id: 5,
        name: "Specjalny lab",
        type: "assignment",
        order: 3,
        hidden: false,
      },
      {
        id: 6,
        name: "Projekt 2",
        type: "project",
        order: 5,
        hidden: false,
      },
    ];
    return data.sort((a, b) => a.order - b.order);
  },
  getGradableEvents: async (
    eventSectionId: number
  ): Promise<GradableEventResponseDTO[]> => {
    if (eventSectionId === 1) {
      const events = [
        {
          id: 1,
          name: "Kartkówka 1",
          topic: "Instrukcje sterujące",
          gainedXp: 1.5,
          order: 1,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 2,
          name: "Kartkówka 2",
          topic: "Model obiektowy",
          gainedXp: 0.0,
          order: 2,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 3,
          name: "Kartkówka 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
          order: 3,
          hasChest: true,
          isLocked: false,
        },
        {
          id: 4,
          name: "Kartkówka 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
          order: 4,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 5,
          name: "Kartkówka 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
          order: 5,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 6,
          name: "Kartkówka 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
          order: 6,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 7,
          name: "Kartkówka 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
          order: 7,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 8,
          name: "Kartkówka 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
          order: 8,
          hasChest: true,
          isLocked: false,
        },
        {
          id: 9,
          name: "Kartkówka 9",
          topic: "Lambdy, streamy i zarządzanie zasobami",
          gainedXp: 0.0,
          order: 9,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 10,
          name: "Kartkówka 10",
          topic: "Kotlin jako alternatywa dla Javy",
          gainedXp: 0.0,
          order: 10,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 11,
          name: "Kartkówka 11",
          topic: "A może Rust?",
          gainedXp: 0.0,
          order: 11,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 12,
          name: "Kartkówka 12",
          topic: "Jak wycentrować diva",
          gainedXp: 0.0,
          order: 12,
          hasChest: false,
          isLocked: false,
        },
      ];
      return events.sort((a, b) => a.order - b.order);
    } else if (eventSectionId === 2) {
      const events = [
        {
          id: 15,
          name: "Laboratorium 1",
          topic: "Instrukcje sterujące w Javie",
          gainedXp: 2.0,
          order: 1,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 16,
          name: "Laboratorium 2",
          topic: "Model obiektowy",
          gainedXp: 0.0,
          order: 2,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 17,
          name: "Laboratorium 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
          order: 3,
          hasChest: true,
          isLocked: false,
        },
        {
          id: 18,
          name: "Laboratorium 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
          order: 4,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 19,
          name: "Laboratorium 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
          order: 5,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 20,
          name: "Laboratorium 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
          order: 6,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 21,
          name: "Laboratorium 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
          order: 7,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 22,
          name: "Laboratorium 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
          order: 8,
          hasChest: false,
          isLocked: false,
        },
      ];
      return events.sort((a, b) => a.order - b.order);
    } else if (eventSectionId === 4) {
      return [
        {
          id: 30,
          name: "Laboratorium 0",
          topic: "Git jest cool",
          gainedXp: 0.0,
          order: 1,
          hasChest: true,
          isLocked: false,
        },
      ];
    } else if (eventSectionId === 6) {
      return [
        {
          id: 32,
          name: "Projekt 2",
          topic: "Refactoring hell",
          gainedXp: 0.0,
          order: 1,
          hasChest: false,
          isLocked: false,
        },
      ];
    } else if (eventSectionId === 3) {
      return [
        {
          id: 33,
          name: "Projekt 1a",
          topic: "Darwin World",
          gainedXp: 0.0,
          order: 1,
          hasChest: false,
          isLocked: false,
        },
        {
          id: 34,
          name: "Projekt 1b",
          topic: "Polymorphia",
          gainedXp: 0.0,
          order: 2,
          hasChest: true,
          isLocked: false,
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
        name: "Kartkówka",
        gainedXp: 3.5,
        percentageBonus: {
          xp: 0.2,
          percentage: 5,
          items: [
            {
              assignedId: 1,
              item: {
                id: 1,
                name: "Pietruszka",
                imageUrl: "images/items/parsley.jpg",
              },
              receivedDate: "07.06.2025",
              bonusXp: "0.2",
              bonusPercentage: "5",
            },
          ],
        },
        flatBonus: {
          xp: 0,
          items: [],
        },
        totalXp: 3.7,
      };
    } else if (eventSectionId === 2) {
      return {
        name: "Laboratorium",
        gainedXp: 2.0,
        percentageBonus: {
          xp: 0.0,
          percentage: 0,
          items: [],
        },
        flatBonus: {
          xp: 0,
          items: [],
        },
        totalXp: 2.0,
      };
    } else {
      return {
        name: "",
        gainedXp: 0,
        percentageBonus: {
          xp: 0.0,
          percentage: 0,
          items: [],
        },
        flatBonus: {
          xp: 0,
          items: [],
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
        name: "Laboratorium 1",
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
        topic: "Laboratorium 1",
      };
    }

    if (gradableEventId === 1) {
      return {
        id: 1,
        name: "Laboratorium 1",
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
        topic: "Laboratorium 1",
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
