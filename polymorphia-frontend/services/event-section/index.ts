/* eslint-disable */
// @ts-nocheck

import { ProjectVariantResponseDTO } from "@/interfaces/api/course/project";
import {
  GroupTargetTypes,
  StudentGroupTargetResponseDTO,
  StudentTargetData,
  TargetRequestDTO,
  TargetResponseDTO,
  TargetType,
  TargetTypes,
} from "@/interfaces/api/grade/target";
import {
  GradeRequestDTO,
  ShortGradeResponseDTO,
} from "@/interfaces/api/grade/grade";
import { PointsSummaryResponseDTO } from "@/interfaces/api/course/points-summary";
import {
  BaseGradableEventResponseDTO,
  EventSectionResponseDTO,
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/course";
import {
  Roles,
  StudentDetailsDTOWithName,
  StudentDetailsDTOWithType,
  UserDetailsDTO,
} from "@/interfaces/api/user";
import { EventTypes } from "@/interfaces/general";
import { API_HOST } from "@/services/api";
import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";
import {
  SubmissionDetailsResponseDTO,
  SubmissionRequirementResponseDTO,
} from "@/interfaces/api/grade/submission";
import { ChestBehaviors } from "@/interfaces/api/reward";

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
      fullName: studentName,
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

export const EventSectionService = {
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/event-sections?courseId=${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wydarzeń!");
    }

    return await response.json();
  },

  getStudentGradableEvents: async (
    eventSectionId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wydarzeń!");
    }

    return await response.json();
  },

  getInstructorGradableEvents: async (
    eventSectionId: number
  ): Promise<InstructorGradableEventResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wydarzeń!");
    }

    return await response.json();
  },

  getPointsSummary: async (
    eventSectionId: number
  ): Promise<PointsSummaryResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/gradable-events/points-summary?eventSectionId=${eventSectionId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać podsumowania!");
    }

    return await response.json();
  },

  getGradableEvent: async (
    eventSectionId: number,
    gradableEventId: number
  ): Promise<BaseGradableEventResponseDTO> => {
    return EventSectionService.getStudentGradableEvents(eventSectionId).then(
      (data) => {
        const gradableEvent = data.find(
          (gradableEvent) => gradableEvent.id === gradableEventId
        );

        if (!gradableEvent) {
          throw new Error("Gradable event not found.");
        }

        return gradableEvent;
      }
    );
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
                behavior: ChestBehaviors.ONE_OF_MANY,
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
                percentage: 5,
                limit: 5,
                isLimitReached: false,
                eventSectionId: 1,
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

  getShortGrade: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ShortGradeResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/gradable-events/short-grade?gradableEventId=${gradableEventId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target }),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać ocen!");
    }

    return await response.json();
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
        item.userDetails.fullName.toLowerCase().includes(lowerSearch)
      );
    }

    return filteredData;
  },

  getRandomPeopleWithPoints: async (
    searchTerm: string,
    sortBy: string[],
    sortOrder: string[],
    groups: string[]
  ): Promise<StudentTargetData[]> => {
    // await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    let initialData: StudentDetailsDTOWithName[] = (
      allData as StudentDetailsDTOWithType[]
    ).map((item) => item.userDetails);

    if (groups && !groups.includes("all")) {
      initialData = initialData.filter((item) => groups.includes(item.group));
    }

    let filteredData: StudentTargetData[] = initialData.map((item) => {
      const xp =
        Math.random() < 0.4 ? undefined : (Math.random() * 2.8).toFixed(2);
      return { ...item, gainedXp: xp };
    });

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.fullName.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortBy && sortOrder) {
      filteredData.sort((a, b) => {
        let valueA: any;
        let valueB: any;

        if (sortBy[0] === "name") {
          valueA = a.fullName;
          valueB = b.fullName;
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

  getRandomTargets: async (
    type: TargetType, // for mocking purposes only
    gradableEventId: number,
    sortBy: string[],
    sortOrder: string[],
    groups: string[],
    gradeStatus: string[]
  ): Promise<TargetResponseDTO[]> => {
    const data: TargetResponseDTO[] = [];

    // Filters are skipped in this mock.

    // TODO: [!!! IMPORTANT !!!] In real implementation on the backend,
    // we need to pay attention to gradeStatus when targets are student groups.
    // If one person has a grade and other students don't, I think that we should
    // show the entire group. (We could theoretically use only students without the grade,
    // but then should we represent them as a student group or single students?
    // If as a group, we need to always set divergent. Either way, I think that returning
    // the entire group is the way to go).

    for (let i = 0; i < 30; i++) {
      const xp =
        Math.random() < 0.4 ? undefined : (Math.random() * 2.8).toFixed(2);

      if (type === TargetTypes.STUDENT) {
        const student = allData[i].userDetails as StudentDetailsDTOWithName;
        data.push({
          type: TargetTypes.STUDENT,
          id: student.id,
          fullName: student.fullName,
          animalName: student.animalName,
          evolutionStage: student.evolutionStage,
          group: student.group,
          imageUrl: student.imageUrl,
          position: student.position,
          courseId: student.courseId,
          gainedXp: xp,
        });
      } else {
        const isDivergent = xp !== undefined && Math.random() < 0.5;

        const members: StudentTargetData[] = allData
          .slice(i * 2, (i + 1) * 2)
          .map((member) => ({
            ...(member as StudentDetailsDTOWithType).userDetails,
            gainedXp: isDivergent
              ? (Number(xp) + Math.random() - 0.5).toFixed(2)
              : xp,
          }));

        const group: StudentGroupTargetResponseDTO = {
          type: TargetTypes.STUDENT_GROUP,
          groupId: i + 1,
          groupType: isDivergent
            ? GroupTargetTypes.DIVERGENT
            : GroupTargetTypes.MATCHING,
          members: members,
        };
        data.push(group);
      }
    }

    return data;
  },

  submitGrade: async (gradeData: GradeRequestDTO): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
  },

  getSubmissionRequirements: async (
    courseId: number,
    eventSectionId: number,
    gradableEventId: number
  ): Promise<SubmissionRequirementResponseDTO[]> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));

    if (eventSectionId === 1) {
      throw new Error("Test events do not have submission requirements");
    }

    // assignment sections
    if (
      eventSectionId === 2 ||
      eventSectionId === 4 ||
      eventSectionId === 10 ||
      eventSectionId === 11
    ) {
      const baseRequirements: SubmissionRequirementResponseDTO[] = [
        {
          id: 1,
          name: "Wykonanie zadania",
          isMandatory: true,
          orderIndex: 1,
        },
      ];

      // add extra assignment for lab 4, 5, or 8
      const labsWithExtra = [12, 13, 16];
      if (labsWithExtra.includes(gradableEventId)) {
        baseRequirements.push({
          id: 2,
          name: "Zadanie dodatkowe",
          isMandatory: false,
          orderIndex: 2,
        });
      }

      return baseRequirements;
    }

    // Project sections
    if (eventSectionId === 3 || eventSectionId === 7) {
      return [
        {
          id: 3,
          name: "Repozytorium projektu",
          isMandatory: true,
          orderIndex: 1,
        },
      ];
    }

    // default fallback
    return [
      {
        id: 1,
        name: "Wykonanie zadania",
        isMandatory: true,
        orderIndex: 1,
      },
    ];
  },

  getSubmissionDetails: async (
    target: TargetRequestDTO,
    courseId: number,
    eventSectionId: number,
    gradableEventId: number
  ): Promise<SubmissionDetailsResponseDTO> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));

    if (eventSectionId === 1) {
      throw new Error("Test events do not have submission details");
    }

    // Always returns data for all requirements.
    // If there is no submission, url is set to ""
    // to simplify handling on the frontend.

    // assignment
    if (
      eventSectionId === 2 ||
      eventSectionId === 4 ||
      eventSectionId === 10 ||
      eventSectionId === 11
    ) {
      const result: SubmissionDetailsResponseDTO = {
        1: {
          url:
            Math.random() < 0.8
              ? `https://example.com/submissions/${gradableEventId}/1`
              : "",
          isLocked: Math.random() < 0.5,
        },
      };

      const labsWithExtra = [12, 13, 16];
      if (labsWithExtra.includes(gradableEventId)) {
        result[2] = {
          url:
            Math.random() < 0.3
              ? `https://example.com/submissions/${gradableEventId}/2/extra`
              : "",
          isLocked: Math.random() < 0.3,
        };
      }

      return result;
    }

    // project
    if (eventSectionId === 3 || eventSectionId === 7) {
      return {
        3: {
          url:
            Math.random() < 0.8
              ? `https://example.com/submissions/${gradableEventId}/repo`
              : "",
          isLocked: Math.random() < 0.1,
        },
      };
    }

    return {
      1: {
        url:
          Math.random() < 0.8
            ? `https://example.com/submissions/${gradableEventId}/1`
            : "",
        isLocked: Math.random() < 0.5,
      },
    };
  },

  submitSubmissions: async (
    target: TargetRequestDTO,
    courseId: number,
    eventSectionId: number,
    gradableEventId: number,
    submissionDetails: SubmissionDetailsResponseDTO
  ): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
  },
};
