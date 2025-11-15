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
} from "@/interfaces/api/target";
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
import { API_HOST } from "@/services/api";
import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";
import { ApiClient } from "@/services/api/client";

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
    return await ApiClient.get<EventSectionResponseDTO[]>(
      `/event-sections?courseId=${courseId}`
    );
  },

  getStudentGradableEvents: async (
    eventSectionId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    return ApiClient.get(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`
    );
  },

  getInstructorGradableEvents: async (
    eventSectionId: number
  ): Promise<InstructorGradableEventResponseDTO[]> => {
    return ApiClient.get(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`
    );
  },

  getPointsSummary: async (
    eventSectionId: number
  ): Promise<PointsSummaryResponseDTO> => {
    return ApiClient.get(
      `${API_HOST}/gradable-events/points-summary?eventSectionId=${eventSectionId}`
    );
  },

  getGradableEvent: async (
    eventSectionId: number,
    gradableEventId: number
  ): Promise<BaseGradableEventResponseDTO> => {
    // TODO: fix
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
    return ApiClient.get(
      `${API_HOST}/gradable-events/criteria?gradableEventId=${gradableEventId}`
    );
  },

  getShortGrade: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ShortGradeResponseDTO> => {
    return ApiClient.post<ShortGradeResponseDTO>(
      `${API_HOST}/gradable-events/short-grade?gradableEventId=${gradableEventId}`,
      { target }
    );
  },

  getProjectVariant: async (
    userId: number,
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    return ApiClient.get(
      `${API_HOST}/projects/variants?userId=${userId}&projectId=${gradableEventId}`
    );
  },

  getProjectGroup: async (
    studentId: number,
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithType[]> => {
    return ApiClient.get(
      `${API_HOST}/projects/group?studentId=${studentId}&projectId=${gradableEventId}`
    );
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
};
