import {
  CourseGroupResponse,
  CourseGroupType,
  CourseGroupTypes,
} from "@/services/course-groups/types";
import { ApiClient } from "@/services/api/client";
import { StudentLastActivityDTO } from "@/interfaces/api/course-groups";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { StudentSummaryResponseDTO } from "@/interfaces/api/student";

const CourseGroupsService = {
  getCourseGroups: async <T extends CourseGroupType>(
    courseId: number,
    type: T
  ): Promise<CourseGroupResponse<T>> => {
    const isShort =
      type === CourseGroupTypes.INDIVIDUAL_SHORT ||
      type === CourseGroupTypes.ALL_SHORT;
    const isIndividual =
      type === CourseGroupTypes.INDIVIDUAL_SHORT ||
      type === CourseGroupTypes.INDIVIDUAL_FULL;

    const shortPath = isShort ? "/short" : "";
    const mode = isIndividual ? "/individual" : "/all";

    return await ApiClient.get<CourseGroupResponse<T>>(
      `/course-groups${mode}${shortPath}?courseId=${courseId}`
    );
  },

  // should be sorted by grade date
  getStudentLastActivity: (userId: number): StudentLastActivityDTO[] => {
    return [
      {
        id: 1,
        gradableEventName: "Kartkówka 4",
        gainedXp: 2.3,
        hasReward: true,
        gradeDate: "24.10.2024",
      },
      {
        id: 2,
        gradableEventName: "Laboratorium 3",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
      {
        id: 3,
        gradableEventName: "Kartkówka 3",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
      {
        id: 4,
        gradableEventName: "Laboratorium 2",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
      {
        id: 5,
        gradableEventName: "Kartkówka 2",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
      {
        id: 6,
        gradableEventName: "Laboratorium 1",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
      {
        id: 7,
        gradableEventName: "Kartkówka 1",
        gainedXp: 2.3,
        hasReward: false,
        gradeDate: "24.10.2024",
      },
    ];
  },

  getStudentItems: (userId: number): EquipmentItemResponseDTO[] => {
    return [
      {
        base: {
          id: 1,
          name: "Pietruszka",
          imageUrl: "images/items/parsley.webp",
          orderIndex: 0,
          bonusText: "+5% do eventów z kategorii Kartkówka",
          shortBonusText: "+5% Kartkówka",
          itemBonusType: "PERCENTAGE_BONUS",
          percentage: 5,
          eventSectionId: 1,
          limit: 1,
          isLimitReached: false,
        },
        details: [
          {
            id: 16,
            receivedDate: "26.10.2025",
            usedDate: undefined,
            isUsed: false,
            gainedXp: "0.4",
          },
        ],
      },
      {
        base: {
          id: 2,
          name: "Marchewka",
          imageUrl: "images/items/carrot.webp",
          orderIndex: 1,
          bonusText: "+10% do eventów z kategorii Laboratorium",
          shortBonusText: "+10% Laboratorium",
          itemBonusType: "PERCENTAGE_BONUS",
          percentage: 10,
          eventSectionId: 2,
          limit: 1,
          isLimitReached: false,
        },
        details: [
          {
            id: 17,
            receivedDate: "26.10.2025",
            usedDate: undefined,
            isUsed: false,
            gainedXp: "2.6",
          },
        ],
      },
      {
        base: {
          id: 3,
          name: "Apteczka",
          imageUrl: "images/items/aid.webp",
          orderIndex: 2,
          bonusText: "+4.0 xp do eventów z kategorii Projekt 1",
          shortBonusText: "+4.0 xp Projekt 1",
          itemBonusType: "FLAT_BONUS",
          behavior: "ONE_EVENT_TRIGGERED",
          xp: "4",
          eventSectionId: 3,
          limit: 2,
          isLimitReached: false,
        },
        details: [],
      },
    ];
  },

  getStudentChests: (userId: number): EquipmentChestResponseDTO[] => {
    return [
      {
        base: {
          id: 101,
          name: "Srebrna Skrzynia",
          imageUrl: "images/chests/s1.webp",
          orderIndex: 0,
          behavior: "ALL",
          behaviorText: "Otrzymasz pełną zawartość skrzynki",
          chestItems: [
            {
              id: 1,
              name: "Pietruszka",
              imageUrl: "images/items/parsley.webp",
              orderIndex: 0,
              bonusText: "+5% do eventów z kategorii Kartkówka",
              shortBonusText: "+5% Kartkówka",
              itemBonusType: "PERCENTAGE_BONUS",
              percentage: 5,
              eventSectionId: 1,
              limit: 1,
              isLimitReached: false,
            },
            {
              id: 2,
              name: "Marchewka",
              imageUrl: "images/items/carrot.webp",
              orderIndex: 1,
              bonusText: "+10% do eventów z kategorii Laboratorium",
              shortBonusText: "+10% Laboratorium",
              itemBonusType: "PERCENTAGE_BONUS",
              percentage: 10,
              eventSectionId: 2,
              limit: 1,
              isLimitReached: false,
            },
          ],
        },
        details: {
          id: 1,
          receivedDate: "20.09.2025",
          usedDate: "26.10.2025",
          isUsed: true,
          receivedItems: [
            {
              base: {
                id: 1,
                name: "Pietruszka",
                imageUrl: "images/items/parsley.webp",
                orderIndex: 0,
                bonusText: "+5% do eventów z kategorii Kartkówka",
                shortBonusText: "+5% Kartkówka",
                itemBonusType: "PERCENTAGE_BONUS",
                percentage: 5,
                eventSectionId: 1,
                limit: 1,
                isLimitReached: false,
              },
              details: {
                id: 16,
                receivedDate: "26.10.2025",
                usedDate: undefined,
                isUsed: false,
                gainedXp: "0.4",
              },
            },
            {
              base: {
                id: 2,
                name: "Marchewka",
                imageUrl: "images/items/carrot.webp",
                orderIndex: 1,
                bonusText: "+10% do eventów z kategorii Laboratorium",
                shortBonusText: "+10% Laboratorium",
                itemBonusType: "PERCENTAGE_BONUS",
                percentage: 10,
                eventSectionId: 2,
                limit: 1,
                isLimitReached: false,
              },
              details: {
                id: 17,
                receivedDate: "26.10.2025",
                usedDate: undefined,
                isUsed: false,
                gainedXp: "2.6",
              },
            },
          ],
        },
      },
      {
        base: {
          id: 102,
          name: "Złota Skrzynia",
          imageUrl: "images/chests/s2.webp",
          orderIndex: 1,
          behavior: "ONE_OF_MANY",
          behaviorText: "Wybierz jeden przedmiot ze skrzynki",
          chestItems: [
            {
              id: 1,
              name: "Pietruszka",
              imageUrl: "images/items/parsley.webp",
              orderIndex: 0,
              bonusText: "+5% do eventów z kategorii Kartkówka",
              shortBonusText: "+5% Kartkówka",
              itemBonusType: "PERCENTAGE_BONUS",
              percentage: 5,
              eventSectionId: 1,
              limit: 1,
              isLimitReached: false,
            },
            {
              id: 2,
              name: "Marchewka",
              imageUrl: "images/items/carrot.webp",
              orderIndex: 1,
              bonusText: "+10% do eventów z kategorii Laboratorium",
              shortBonusText: "+10% Laboratorium",
              itemBonusType: "PERCENTAGE_BONUS",
              percentage: 10,
              eventSectionId: 2,
              limit: 1,
              isLimitReached: false,
            },
            {
              id: 3,
              name: "Apteczka",
              imageUrl: "images/items/aid.webp",
              orderIndex: 2,
              bonusText: "+4.0 xp do eventów z kategorii Projekt 1",
              shortBonusText: "+4.0 xp Projekt 1",
              itemBonusType: "FLAT_BONUS",
              behavior: "ONE_EVENT_TRIGGERED",
              xp: "4",
              eventSectionId: 3,
              limit: 2,
              isLimitReached: false,
            },
          ],
        },
        details: {
          id: 2,
          receivedDate: "20.09.2025",
          usedDate: "20.09.2025",
          isUsed: false,
          receivedItems: [],
        },
      },
      {
        base: {
          id: 103,
          name: "Srebrna Skrzynia",
          imageUrl: "images/chests/s1.webp",
          orderIndex: 0,
          behavior: "ONE_OF_MANY",
          behaviorText: "Wybierz jeden przedmiot ze skrzynki",
          chestItems: [
            {
              id: 3,
              name: "Apteczka",
              imageUrl: "images/items/aid.webp",
              orderIndex: 2,
              bonusText: "+4.0 xp do eventów z kategorii Projekt 1",
              shortBonusText: "+4.0 xp Projekt 1",
              itemBonusType: "FLAT_BONUS",
              behavior: "ONE_EVENT_TRIGGERED",
              xp: "4",
              eventSectionId: 3,
              limit: 2,
              isLimitReached: false,
            },
          ],
        },
        details: {
          id: 3,
          receivedDate: "27.10.2025",
          usedDate: undefined,
          isUsed: false,
          receivedItems: [],
        },
      },
    ];
  },

  getStudentSummary: (userId: number): StudentSummaryResponseDTO => {
    return {
      studentName: "Krzysztof Ligarski",
      animalName: "Gerard Waleczny",
      imageUrl: "images/evolution-stages/1.webp",
      leftEvolutionStage: {
        id: 1,
        name: "Samodzielny Zwierzak",
        minXp: 70,
        grade: 4.5,
      },
      rightEvolutionStage: {
        id: 1,
        name: "Majestatyczna Bestia",
        minXp: 80,
        grade: 5.0,
      },
      totalStudentsInCourse: 237,
      position: 4,
    };
  },
};

export default CourseGroupsService;
