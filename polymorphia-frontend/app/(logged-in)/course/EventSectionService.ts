/* eslint-disable */
// @ts-nocheck

import { lab0, lab1, lab2, proj1 } from "@/app/(logged-in)/course/sampleData";
import { ProjectVariantResponseDTO } from "@/interfaces/api/course/project";
import {
  CriterionResponseDTO,
  GradeResponseDTO,
  ShortGradeResponseDTO,
} from "@/interfaces/api/grade";
import { MarkdownResponseDTO } from "@/interfaces/api/markdown";
import { PointsSummaryResponseDTO } from "@/interfaces/api/course/points-summary";
import {
  EventSectionResponseDTO,
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/course";
import {
  Roles,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";
import { EventTypes } from "@/interfaces/general";
import { CriteriaDetails } from "@/providers/grading/gradingReducer/types";

export const studentNames = [
  "Gerard Małoduszny",
  "Gerard Małosolny",
  "Gerard Kiszony",
  "Gerard Solny",
  "Kamil Rudny",
  "Anna Nowak",
  "Jan Kowalski",
  "Maria Wiśniewska",
  "Tomasz Zieliński",
  "Paulina Kaczmarek",
];

export const groups = [
  "MI-15-00",
  "BM-16-00",
  "BM-17-00",
  "BM-18-00",
  "BM-19-00",
  "BM-20-00",
  "BM-21-00",
  "BM-22-00",
  "BM-23-00",
  "BM-01-00",
  "BM-02-00",
  "BM-03-00",
];

const allData: UserDetailsDTO[] = [];

for (let i = 0; i < 250; i++) {
  const studentName = studentNames[i % studentNames.length];
  const stage = Math.max(1, 6 - Math.floor(i / 50));

  const item = {
    userRole: Roles.STUDENT,
    userDetails: {
      id: i,
      userName: studentName,
      animalName: studentName,
      evolutionStage: "Majestatyczna Bestia",
      imageUrl: `images/evolution-stages/${stage}.jpg`,
      position: i + 1,
      group: groups[i % groups.length],
      courseId: 1,
    },
  };
  allData.push(item);
}

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
    type: EventTypes.ASSIGNMENT,
    orderIndex: 2,
  },
  {
    id: 3,
    name: "Projekt 1",
    type: EventTypes.PROJECT,
    orderIndex: 4,
  },
  {
    id: 1,
    name: "Kartkówka",
    type: EventTypes.TEST,
    orderIndex: 1,
  },
  {
    id: 4,
    name: "Git",
    type: EventTypes.ASSIGNMENT,
    orderIndex: 0,
  },
  {
    id: 5,
    name: "Specjalny lab",
    type: EventTypes.ASSIGNMENT,
    orderIndex: 3,
  },
  {
    id: 6,
    name: "Projekt 2",
    type: EventTypes.PROJECT,
    orderIndex: 5,
  },
];

export const EventSectionService = {
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionResponseDTO[]> => {
    return eventSectionData.sort((a, b) => a.orderIndex - b.orderIndex);
  },

  getStudentGradableEvents: async (
    eventSectionId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    if (eventSectionId === 1) {
      const events: StudentGradableEventResponseDTO[] = [
        {
          id: 1,
          type: EventTypes.TEST,
          name: "Kartkówka 1",
          topic: "Instrukcje sterujące",
          gainedXp: "1.5",
          orderIndex: 1,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 2,
          type: EventTypes.TEST,
          name: "Kartkówka 2",
          topic: "Model obiektowy",
          gainedXp: "0.0",
          orderIndex: 2,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 3,
          type: EventTypes.TEST,
          name: "Kartkówka 3",
          topic: "Interakcje między obiektami",
          orderIndex: 3,
          isLocked: false,
          hasReward: true,
        },
        {
          id: 4,
          type: EventTypes.TEST,
          name: "Kartkówka 4",
          topic: "Interfejsy i mapy",
          orderIndex: 4,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 5,
          type: EventTypes.TEST,
          name: "Kartkówka 5",
          topic: "Dziedziczenie",
          orderIndex: 5,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 6,
          type: EventTypes.TEST,
          name: "Kartkówka 6",
          topic: "Refactoring kodu",
          orderIndex: 6,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 7,
          type: EventTypes.TEST,
          name: "Kartkówka 7",
          topic: "Wielowątkowość",
          orderIndex: 7,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 8,
          type: EventTypes.TEST,
          name: "Kartkówka 8",
          topic: "Interfejs graficzny",
          orderIndex: 8,
          isLocked: false,
          hasReward: true,
        },
        {
          id: 9,
          type: EventTypes.TEST,
          name: "Kartkówka 9",
          topic: "Lambdy, streamy i zarządzanie zasobami",
          orderIndex: 9,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 10,
          type: EventTypes.TEST,
          name: "Kartkówka 10",
          topic: "Kotlin jako alternatywa dla Javy",
          orderIndex: 10,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 11,
          type: EventTypes.TEST,
          name: "Kartkówka 11",
          topic: "A może Rust?",
          orderIndex: 11,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 12,
          type: EventTypes.TEST,
          name: "Kartkówka 12",
          topic: "Jak wycentrować diva",
          orderIndex: 12,
          isLocked: false,
          hasReward: false,
        },
      ];
      return events.sort((a, b) => a.orderIndex - b.orderIndex);
    } else if (eventSectionId === 2) {
      const events: StudentGradableEventResponseDTO[] = [
        {
          id: 15,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 1",
          topic: "Instrukcje sterujące w Javie",
          gainedXp: "2.0",
          orderIndex: 1,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 16,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 2",
          topic: "Model obiektowy",
          gainedXp: "0.0",
          orderIndex: 2,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 17,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 3",
          topic: "Interakcje między obiektami",
          orderIndex: 3,
          isLocked: false,
          hasReward: true,
        },
        {
          id: 18,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 4",
          topic: "Interfejsy i mapy",
          orderIndex: 4,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 19,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 5",
          topic: "Dziedziczenie",
          orderIndex: 5,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 20,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 6",
          topic: "Refactoring kodu",
          orderIndex: 6,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 21,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 7",
          topic: "Wielowątkowość",
          orderIndex: 7,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 22,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 8",
          topic: "Interfejs graficzny",
          orderIndex: 8,
          isLocked: false,
          hasReward: false,
        },
      ];
      return events.sort((a, b) => a.orderIndex - b.orderIndex);
    } else if (eventSectionId === 4) {
      return [
        {
          id: 30,
          type: EventTypes.ASSIGNMENT,
          name: "Laboratorium 0",
          topic: "Git jest cool",
          orderIndex: 1,
          isLocked: false,
          hasReward: true,
        },
      ];
    } else if (eventSectionId === 6) {
      return [
        {
          id: 32,
          type: EventTypes.PROJECT,
          name: "Projekt 2",
          topic: "Refactoring hell",
          orderIndex: 1,
          isLocked: false,
          hasReward: false,
        },
      ];
    } else if (eventSectionId === 3) {
      return [
        {
          id: 33,
          type: EventTypes.PROJECT,
          name: "Projekt 1a",
          topic: "Darwin World",
          orderIndex: 1,
          isLocked: false,
          hasReward: false,
        },
        {
          id: 34,
          type: EventTypes.PROJECT,
          name: "Projekt 1b",
          topic: "Polymorphia",
          orderIndex: 2,
          isLocked: false,
          hasReward: true,
        },
      ];
    } else {
      return [];
    }
  },

  getInstructorGradableEvents: async (
    eventSectionId: number
  ): Promise<InstructorGradableEventResponseDTO[]> => {
    if (eventSectionId === 1) {
      const events = [
        {
          type: EventTypes.TEST,
          id: 1,
          name: "Kartkówka 1",
          topic: "Instrukcje sterujące",
          orderIndex: 1,
          ungradedStudents: 3,
        },
        {
          type: EventTypes.TEST,
          id: 2,
          name: "Kartkówka 2",
          topic: "Model obiektowy",
          orderIndex: 2,
          ungradedStudents: 12,
        },
        {
          type: EventTypes.TEST,
          id: 3,
          name: "Kartkówka 3",
          topic: "Interakcje między obiektami",
          orderIndex: 3,
          ungradedStudents: 0,
        },
        {
          type: EventTypes.TEST,
          id: 4,
          name: "Kartkówka 4",
          topic: "Interfejsy i mapy",
          orderIndex: 4,
          ungradedStudents: 8,
        },
        {
          type: EventTypes.TEST,
          id: 5,
          name: "Kartkówka 5",
          topic: "Dziedziczenie",
          orderIndex: 5,
          ungradedStudents: 15,
        },
        {
          type: EventTypes.TEST,
          id: 6,
          name: "Kartkówka 6",
          topic: "Refactoring kodu",
          orderIndex: 6,
          ungradedStudents: 5,
        },
        {
          type: EventTypes.TEST,
          id: 7,
          name: "Kartkówka 7",
          topic: "Wielowątkowość",
          orderIndex: 7,
          ungradedStudents: 21,
        },
        {
          type: EventTypes.TEST,
          id: 8,
          name: "Kartkówka 8",
          topic: "Interfejs graficzny",
          orderIndex: 8,
          ungradedStudents: 7,
        },
        {
          type: EventTypes.TEST,
          id: 9,
          name: "Kartkówka 9",
          topic: "Lambdy, streamy i zarządzanie zasobami",
          orderIndex: 9,
          ungradedStudents: 18,
        },
        {
          type: EventTypes.TEST,
          id: 10,
          name: "Kartkówka 10",
          topic: "Kotlin jako alternatywa dla Javy",
          orderIndex: 10,
          ungradedStudents: 2,
        },
        {
          type: EventTypes.TEST,
          id: 11,
          name: "Kartkówka 11",
          topic: "A może Rust?",
          orderIndex: 11,
          ungradedStudents: 9,
        },
        {
          type: EventTypes.TEST,
          id: 12,
          name: "Kartkówka 12",
          topic: "Jak wycentrować diva",
          orderIndex: 12,
          ungradedStudents: 14,
        },
      ];
      return events.sort((a, b) => a.orderIndex - b.orderIndex);
    } else if (eventSectionId === 2) {
      const events = [
        {
          type: EventTypes.ASSIGNMENT,
          id: 15,
          name: "Laboratorium 1",
          topic: "Instrukcje sterujące w Javie",
          orderIndex: 1,
          ungradedStudents: 6,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 16,
          name: "Laboratorium 2",
          topic: "Model obiektowy",
          orderIndex: 2,
          ungradedStudents: 11,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 17,
          name: "Laboratorium 3",
          topic: "Interakcje między obiektami",
          orderIndex: 3,
          ungradedStudents: 4,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 18,
          name: "Laboratorium 4",
          topic: "Interfejsy i mapy",
          orderIndex: 4,
          ungradedStudents: 17,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 19,
          name: "Laboratorium 5",
          topic: "Dziedziczenie",
          orderIndex: 5,
          ungradedStudents: 1,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 20,
          name: "Laboratorium 6",
          topic: "Refactoring kodu",
          orderIndex: 6,
          ungradedStudents: 13,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 21,
          name: "Laboratorium 7",
          topic: "Wielowątkowość",
          orderIndex: 7,
          ungradedStudents: 8,
        },
        {
          type: EventTypes.ASSIGNMENT,
          id: 22,
          name: "Laboratorium 8",
          topic: "Interfejs graficzny",
          orderIndex: 8,
          ungradedStudents: 22,
        },
      ];
      return events.sort((a, b) => a.orderIndex - b.orderIndex);
    } else if (eventSectionId === 4) {
      return [
        {
          type: EventTypes.ASSIGNMENT,
          id: 30,
          name: "Laboratorium 0",
          topic: "Git jest cool",
          orderIndex: 1,
          ungradedStudents: 5,
        },
      ];
    } else if (eventSectionId === 6) {
      return [
        {
          type: EventTypes.PROJECT,
          id: 32,
          name: "Projekt 2",
          topic: "Refactoring hell",
          orderIndex: 1,
          ungradedStudents: 19,
        },
      ];
    } else if (eventSectionId === 3) {
      return [
        {
          type: EventTypes.PROJECT,
          id: 33,
          name: "Projekt 1a",
          topic: "Darwin World",
          orderIndex: 1,
          ungradedStudents: 7,
        },
        {
          type: EventTypes.PROJECT,
          id: 34,
          name: "Projekt 1b",
          topic: "Polymorphia",
          orderIndex: 2,
          ungradedStudents: 3,
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
        gained: {
          title: "Zdobyte xp",
          gainedXp: "3.5",
        },
        percentageBonus: {
          title: "Bonusy procentowe",
          gainedXp: "0.2",
          assignedItems: [
            {
              base: {
                id: 1,
                itemBonusType: "PERCENTAGE_BONUS",
                name: "Pietruszka",
                bonusText: "+5% do kategorii Kartkówka",
                imageUrl: "images/items/parsley.jpg",
                percentage: 5,
                orderIndex: 0,
                limit: 3,
                isLimitReached: false,
                eventSectionId: 1,
              },
              details: {
                id: 1,
                receivedDate: "07.06.2025",
                gainedXp: "0.2",
                isUsed: false,
              },
            },
          ],
        },
        flatBonus: {
          title: "Bonusy punktowe",
          gainedXp: "0.0",
          assignedItems: [],
        },
        total: {
          title: "Łącznie",
          gainedXp: "3.7",
        },
      };
    } else if (eventSectionId === 2) {
      return {
        gained: {
          title: "Zdobyte xp",
          gainedXp: "2.0",
        },
        percentageBonus: {
          title: "Bonusy procentowe",
          gainedXp: "0.0",
          assignedItems: [],
        },
        flatBonus: {
          title: "Bonusy punktowe",
          gainedXp: "0.0",
          assignedItems: [],
        },
        total: {
          title: "Łącznie",
          gainedXp: "2.0",
        },
      };
    } else {
      return {
        gained: {
          title: "Zdobyte xp",
          gainedXp: "0.0",
        },
        percentageBonus: {
          title: "Bonusy procentowe",
          gainedXp: "0.0",
          assignedItems: [],
        },
        flatBonus: {
          title: "Bonusy punktowe",
          gainedXp: "0.0",
          assignedItems: [],
        },
        total: {
          title: "Łącznie",
          gainedXp: "0.0",
        },
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

  getCriteria: async (
    gradableEventId: number
  ): Promise<CriterionResponseDTO[]> => {
    return [
      {
        id: 1,
        name: "Wykonanie zadania",
        maxXp: "4.0",
        assignableRewards: [
          {
            assignableReward: {
              rewardType: "CHEST",
              reward: {
                id: 1,
                name: "Srebrna Skrzynia",
                imageUrl: "images/chests/s1.webp",
                behavior: "ONE_OF_MANY",
                behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                orderIndex: 0,
                chestItems: [
                  {
                    id: 1,
                    itemBonusType: "PERCENTAGE_BONUS",
                    name: "Pietruszka",
                    bonusText: "+5% do kategorii Kartkówka",
                    imageUrl: "images/items/parsley.jpg",
                    percentage: 5,
                    orderIndex: 0,
                    limit: 3,
                    isLimitReached: false,
                    eventSectionId: 1,
                  },
                  {
                    id: 2,
                    itemBonusType: "PERCENTAGE_BONUS",
                    name: "Marchewka",
                    bonusText: "+5% do kategorii Kartkówka",
                    imageUrl: "images/items/parsley.jpg",
                    percentage: 5,
                    orderIndex: 0,
                    limit: 3,
                    isLimitReached: false,
                    eventSectionId: 1,
                  },
                  {
                    id: 3,
                    itemBonusType: "PERCENTAGE_BONUS",
                    name: "Apteczka",
                    bonusText: "+5% do kategorii Kartkówka",
                    imageUrl: "images/items/parsley.jpg",
                    percentage: 5,
                    orderIndex: 0,
                    limit: 3,
                    isLimitReached: false,
                    eventSectionId: 1,
                  },
                ],
              },
            },
            maxAmount: 2,
          },
          {
            assignableReward: {
              rewardType: "ITEM",
              reward: {
                id: 2,
                name: "Pietruszka",
                imageUrl: "images/items/parsley.webp",
                itemBonusType: "PERCENTAGE_BONUS",
                bonusText: "+5% do kategorii Kartkówka",
                orderIndex: 1,
              },
            },
            maxAmount: 3,
          },
        ],
      },
      {
        id: 2,
        name: "Dodatkowe kryterium",
        maxXp: "4.0",
        assignableRewards: [
          {
            assignableReward: {
              rewardType: "ITEM",
              reward: {
                id: 3,
                itemBonusType: "PERCENTAGE_BONUS",
                name: "Marchewka",
                bonusText: "+5% do kategorii Kartkówka",
                imageUrl: "images/items/carrot.webp",
                percentage: 5,
                orderIndex: 0,
                limit: 3,
                isLimitReached: false,
                eventSectionId: 1,
              },
            },
            maxAmount: 3,
          },
        ],
      },
    ];
  },

  //TODO: xd
  getGrade: async (gradableEventId: number): Promise<GradeResponseDTO> => {
    if (gradableEventId === 30) {
      return {
        details: {
          id: 1,
        },
        criteria: [
          {
            id: 1,
            name: "Wykonanie zadania",
            maxXp: "4.0",
            assignableRewards: [
              {
                reward: {
                  rewardType: "CHEST",
                  reward: {
                    id: 1,
                    name: "Srebrna Skrzynia",
                    imageUrl: "images/chests/s1.webp",
                    behavior: "ONE_OF_MANY",
                    behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                    orderIndex: 0,
                    chestItems: [
                      {
                        id: 1,
                        itemBonusType: "PERCENTAGE_BONUS",
                        name: "Pietruszka",
                        bonusText: "+5% do kategorii Kartkówka",
                        imageUrl: "images/items/parsley.jpg",
                        percentage: 5,
                        orderIndex: 0,
                        limit: 3,
                        isLimitReached: false,
                        eventSectionId: 1,
                      },
                    ],
                  },
                },
                maxAmount: 1,
              },
            ],
            criterionGrade: {
              id: 1,
              gainedXp: "3.5",
              assignedRewards: [
                {
                  rewardType: "CHEST",
                  assignedReward: {
                    base: {
                      id: 1,
                      name: "Srebrna Skrzynia",
                      imageUrl: "images/chests/s1.webp",
                      behavior: "ONE_OF_MANY",
                      behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                      orderIndex: 0,
                      chestItems: [
                        {
                          id: 1,
                          itemBonusType: "PERCENTAGE_BONUS",
                          name: "Pietruszka",
                          bonusText: "+5% do kategorii Kartkówka",
                          imageUrl: "images/items/parsley.jpg",
                          percentage: 5,
                          orderIndex: 0,
                          limit: 3,
                          isLimitReached: false,
                          eventSectionId: 1,
                        },
                      ],
                    },
                    details: {
                      id: 3,
                      receivedDate: "07.06.2025",
                      usedDate: "08.06.2025",
                      isUsed: true,
                    },
                  },
                },
              ],
            },
          },
        ],
      };
    }

    if (gradableEventId === 15 || gradableEventId === 1) {
      return {
        details: {
          id: 1,
        },
        criteria: [
          {
            id: 1,
            name: "Wykonanie zadania",
            maxXp: "2.0",
            assignableRewards: [
              {
                reward: {
                  rewardType: "CHEST",
                  reward: {
                    id: 1,
                    name: "Srebrna Skrzynia",
                    imageUrl: "images/chests/s1.webp",
                    behavior: "ONE_OF_MANY",
                    behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                    orderIndex: 0,
                    chestItems: [
                      {
                        id: 1,
                        itemBonusType: "PERCENTAGE_BONUS",
                        name: "Pietruszka",
                        bonusText: "+5% do kategorii Kartkówka",
                        imageUrl: "images/items/parsley.jpg",
                        percentage: 5,
                        orderIndex: 0,
                        limit: 3,
                        isLimitReached: false,
                        eventSectionId: 1,
                      },
                    ],
                  },
                },
                maxAmount: 1,
              },
            ],
            criterionGrade: {
              id: 1,
              gainedXp: "0.7",
              assignedRewards: [
                {
                  rewardType: "CHEST",
                  assignedReward: {
                    base: {
                      id: 1,
                      name: "Srebrna Skrzynia",
                      imageUrl: "images/chests/s1.webp",
                      behavior: "ONE_OF_MANY",
                      behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                      orderIndex: 0,
                      chestItems: [
                        {
                          id: 1,
                          itemBonusType: "PERCENTAGE_BONUS",
                          name: "Pietruszka",
                          bonusText: "+5% do kategorii Kartkówka",
                          imageUrl: "images/items/parsley.jpg",
                          percentage: 5,
                          orderIndex: 0,
                          limit: 3,
                          isLimitReached: false,
                          eventSectionId: 1,
                        },
                      ],
                    },
                    details: {
                      id: 3,
                      receivedDate: "07.06.2025",
                      usedDate: "08.06.2025",
                      isUsed: true,
                    },
                  },
                },
              ],
            },
          },
        ],
      };
    }

    return {
      criteria: [
        {
          id: 1,
          name: "Wykonanie zadania",
          maxXp: "4.0",
          assignableRewards: [
            {
              reward: {
                rewardType: "CHEST",
                reward: {
                  id: 1,
                  name: "Srebrna Skrzynia",
                  imageUrl: "images/chests/s1.webp",
                  behavior: "ONE_OF_MANY",
                  behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                  orderIndex: 0,
                  chestItems: [
                    {
                      id: 1,
                      itemBonusType: "PERCENTAGE_BONUS",
                      name: "Pietruszka",
                      bonusText: "+5% do kategorii Kartkówka",
                      imageUrl: "images/items/parsley.jpg",
                      percentage: 5,
                      orderIndex: 0,
                      limit: 3,
                      isLimitReached: false,
                      eventSectionId: 1,
                    },
                  ],
                },
              },
              maxAmount: 2,
            },
          ],
        },
      ],
    };
  },

  getGrade3: async (
    studentId,
    gradableEventId
  ): Promise<ShortGradeResponseDTO> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 300));

    return {
      comment:
        "Bardzo dobra praca! Student wykazał się doskonałą znajomością tematu.",
      criteria: [
        {
          id: 1,
          gainedXp: "3.5",
          assignedRewards: [
            {
              id: 1,
              imageUrl: "images/chests/s1.webp",
              quantity: 2,
            },
            {
              id: 2,
              imageUrl: "images/items/parsley.jpg",
              quantity: 1,
            },
          ],
        },
        {
          id: 2,
          gainedXp: "2.7",
          assignedRewards: [
            {
              id: 3,
              imageUrl: "images/items/carrot.jpg",
              quantity: 1,
            },
          ],
        },
      ],
    };
  },

  // TODO: assume that id is criterion id XD
  getGrade2: async (
    studentId: number,
    gradableEventId: number
  ): Promise<GradeResponseDTO> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 150));
    return {
      details: {
        id: 1,
        comment:
          "Bardzo dobra praca! Student wykazał się doskonałą znajomością tematu.",
      },
      criteria: [
        {
          id: 1,
          gainedXp: "3.5",
          assignedRewards: [
            {
              rewardType: "CHEST",
              assignedReward: {
                base: {
                  id: 1,
                  name: "Srebrna Skrzynia",
                  imageUrl: "images/chests/s1.webp",
                  behavior: "ONE_OF_MANY",
                  behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                  orderIndex: 0,
                  chestItems: [
                    {
                      id: 1,
                      itemBonusType: "PERCENTAGE_BONUS",
                      name: "Pietruszka",
                      bonusText: "+5% do kategorii Kartkówka",
                      imageUrl: "images/items/parsley.jpg",
                      percentage: 5,
                      orderIndex: 0,
                      limit: 3,
                      isLimitReached: false,
                      eventSectionId: 1,
                    },
                  ],
                },
                details: {
                  id: 3,
                  receivedDate: "07.06.2025",
                  usedDate: "08.06.2025",
                  isUsed: true,
                },
              },
            },
            {
              rewardType: "CHEST",
              assignedReward: {
                base: {
                  id: 1,
                  name: "Srebrna Skrzynia",
                  imageUrl: "images/chests/s1.webp",
                  behavior: "ONE_OF_MANY",
                  behaviorText: "Wybierz jeden przedmiot ze skrzynki",
                  orderIndex: 0,
                  chestItems: [
                    {
                      id: 1,
                      itemBonusType: "PERCENTAGE_BONUS",
                      name: "Pietruszka",
                      bonusText: "+5% do kategorii Kartkówka",
                      imageUrl: "images/items/parsley.jpg",
                      percentage: 5,
                      orderIndex: 0,
                      limit: 3,
                      isLimitReached: false,
                      eventSectionId: 1,
                    },
                  ],
                },
                details: {
                  id: 3,
                  receivedDate: "07.06.2025",
                  usedDate: "08.06.2025",
                  isUsed: true,
                },
              },
            },
            {
              rewardType: "ITEM",
              assignedReward: {
                base: {
                  id: 3,
                  itemBonusType: "PERCENTAGE_BONUS",
                  name: "Apteczka",
                  bonusText: "+5% do kategorii Kartkówka",
                  imageUrl: "images/items/parsley.jpg",
                  percentage: 5,
                  orderIndex: 0,
                  limit: 3,
                  isLimitReached: false,
                  eventSectionId: 1,
                },
                details: {
                  id: 3,
                  receivedDate: "07.06.2025",
                  usedDate: "08.06.2025",
                  isUsed: true,
                },
              },
            },
          ],
        },
      ],
    };
  },

  getProjectVariant: async (): Promise<ProjectVariantResponseDTO[]> => {
    return [
      {
        id: 1,
        shortCode: "G",
        name: "Pożary",
        categoryName: "Mapa i roślinność",
        imageUrl: "images/general/pozary.jpg",
      },
      {
        id: 2,
        shortCode: "2",
        name: "Podmianka",
        categoryName: "Zwierzaki",
        imageUrl: "images/general/podmianka.jpg",
      },
    ];
  },

  getRandomPeople: async (searchTerm: string): Promise<UserDetailsDTO[]> => {
    // await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    let filteredData = allData;

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.studentName.toLowerCase().includes(lowerSearch)
      );
    }

    return filteredData;
  },

  getRandomPeopleWithPoints: async (
    searchTerm: string,
    sortBy: string[],
    sortOrder: string[],
    groups: string[]
  ): Promise<(StudentDetailsDTOWithType & { gainedXp?: string })[]> => {
    // await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    let filteredData = allData;

    if (groups && !groups.includes("all")) {
      filteredData = filteredData.filter((item) => groups.includes(item.group));
    }

    filteredData = filteredData.map((item) => {
      const xp =
        Math.random() < 0.4 ? undefined : (Math.random() * 2.8).toFixed(2);
      return { ...item, gainedXp: xp };
    });

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.userName.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortBy && sortOrder) {
      filteredData.sort((a, b) => {
        let valueA: any;
        let valueB: any;

        if (sortBy[0] === "name") {
          valueA = a.studentName;
          valueB = b.studentName;
          const comparison = valueA.localeCompare(valueB);
          return sortOrder[0] === "asc" ? comparison : -comparison;
        } else {
          valueA = a.gainedXp ?? -100;
          valueB = b.gainedXp ?? -100;
          const comparison = valueA - valueB;
          return sortOrder[0] === "asc" ? comparison : -comparison;
        }
      });
    }

    return filteredData;
  },

  getRandomProjectGroups: async (): Promise<ProjectGroupResponseDTO[]> => {
    let data = [];

    for (let i = 0; i < 30; i++) {
      const xp =
        Math.random() < 0.4 ? undefined : (Math.random() * 2.8).toFixed(2);

      const members = allData.slice(i * 2, (i + 1) * 2).map((member) => ({
        ...member,
        gainedXp: xp,
      }));

      const group = {
        id: i + 1,
        members: members,
      };
      data.push(group);
    }

    return data;
  },

  submitGrade: async (gradeData: {
    studentId: number;
    gradableEventId: number;
    criteria: Record<number, CriteriaDetails>;
    comment: string;
  }): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
  },
};
