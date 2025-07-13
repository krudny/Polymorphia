/* eslint-disable */
// @ts-nocheck

import { lab1, lab2, proj1 } from "@/app/(logged-in)/course/sampleData";

type EventSectionType = "assignment" | "project" | "test";

interface EventSectionResponseDTO {
  id: number;
  name: string;
  eventSectionType: EventSectionType;
  order: number;
}

export interface GradableEventResponseDTO {
  id: number;
  name: string;
  topic?: string;
  gainedXp: number;
}

interface BonusItem {
  id: number;
  assignedItemId: number;
  assignedChestId: number;
  name: string;
  imageUrl: string;
  receivedDate: string;
  xp: number;
  percentage: number;
}

interface PercentageBonus {
  xp: number;
  items: BonusItem[];
  percentage: number;
}

interface FlatBonus {
  xp: number;
  items: BonusItem[];
}

interface PointsSummaryResponseDTO {
  name: string;
  gainedXp: number;
  percentageBonus: PercentageBonus;
  flatBonus: FlatBonus;
  totalXp: number;
}

interface MarkdownResponseDTO {
  markdown: string;
}

interface PointSummaryResponseDTO {}

export const BetterEventSectionService = {
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionResponseDTO[]> => {
    const data = [
      {
        id: 2,
        name: "Laboratorium",
        eventSectionType: "assignment",
        order: 2,
      },
      { id: 3, name: "Projekt", eventSectionType: "project", order: 4 },
      { id: 1, name: "Kartkówka", eventSectionType: "test", order: 1 },
      { id: 4, name: "Git", eventSectionType: "assignment", order: 0 },
      { id: 5, name: "Specjalne", eventSectionType: "assignment", order: 3 },
      {
        id: 6,
        name: "Projekt wiosenny",
        eventSectionType: "project",
        order: 5,
      },
    ];

    data.sort((a, b) => a.order - b.order);
    return data;
  },
  getGradableEvents: async (
    eventSectionId: number
  ): Promise<GradableEventResponseDTO[]> => {
    if (eventSectionId === 1) {
      return [
        {
          id: 1,
          name: "Test 1",
          topic: "Instrukcje sterujące",
          gainedXp: 1.5,
        },
        {
          id: 2,
          name: "Test 2",
          topic: "Model obiektowy",
          gainedXp: 2.0,
        },
        {
          id: 3,
          name: "Test 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
        },
        {
          id: 4,
          name: "Test 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
        },
        {
          id: 5,
          name: "Test 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
        },
        {
          id: 6,
          name: "Test 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
        },
        {
          id: 7,
          name: "Test 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
        },
        {
          id: 8,
          name: "Test 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
        },
        {
          id: 9,
          name: "Test 9",
          topic: "Lambdy, streamy i zarządzanie zasobami",
          gainedXp: 0.0,
        },
        {
          id: 10,
          name: "Test 10",
          topic: "Kotlin jako alternatywa dla Javy",
          gainedXp: 0.0,
        },
        {
          id: 11,
          name: "Test 11",
          topic: "A może Rust?",
          gainedXp: 0.0,
        },
        {
          id: 12,
          name: "Test 12",
          topic: "Jak wycentrować diva",
          gainedXp: 0.0,
        },
      ];
    } else if (eventSectionId === 2) {
      return [
        {
          id: 16,
          name: "Lab 2",
          topic: "Model obiektowy",
          gainedXp: 0.0,
        },
        {
          id: 17,
          name: "Lab 3",
          topic: "Interakcje między obiektami",
          gainedXp: 0.0,
        },
        {
          id: 18,
          name: "Lab 4",
          topic: "Interfejsy i mapy",
          gainedXp: 0.0,
        },
        {
          id: 19,
          name: "Lab 5",
          topic: "Dziedziczenie",
          gainedXp: 0.0,
        },
        {
          id: 20,
          name: "Lab 6",
          topic: "Refactoring kodu",
          gainedXp: 0.0,
        },
        {
          id: 21,
          name: "Lab 7",
          topic: "Wielowątkowość",
          gainedXp: 0.0,
        },
        {
          id: 22,
          name: "Lab 8",
          topic: "Interfejs graficzny",
          gainedXp: 0.0,
        },
        {
          id: 15,
          name: "Lab 1",
          topic: "Instrukcje sterujące w Javie",
          gainedXp: 2.0,
        },
      ];
    } else if (eventSectionId === 3) {
      return [];
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
          items: [
            {
              id: 1,
              assignedItemId: 1,
              assignedChestId: 3,
              name: "Pietruszka",
              imageUrl: "images/items/parsley.jpg",
              receivedDate: "07.06.2025",
              xp: 0.2,
              percentage: 5,
            },
          ],
          percentage: 5,
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
          items: [],
          percentage: 0,
        },
        flatBonus: {
          xp: 0,
          items: [],
        },
        totalXp: 2.0,
      };
    } else if (eventSectionId === 3) {
      return {};
    } else {
      return {};
    }
  },
  getMarkdown: async (
    eventSectionId: number,
    eventId: number
  ): Promise<MarkdownResponseDTO> => {
    if (eventSectionId === 1) {
      return {};
    } else if (eventSectionId === 2 && eventId === 15) {
      return { markdown: { lab1 } };
    } else if (eventSectionId === 2 && eventId === 16) {
      return { markdown: { lab2 } };
    } else if (eventSectionId === 3 && eventId === 1) {
      return { markdown: { proj1 } };
    } else {
      return {};
    }
  },
};
