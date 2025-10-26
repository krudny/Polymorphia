import { API_HOST } from "@/services/api";
import {
  CourseGroupResponse,
  CourseGroupType,
  CourseGroupTypes,
} from "@/services/course-groups/types";
import {
  StudentGradableEventDetailsDTO,
  StudentLastGradableEventsDTO,
} from "@/interfaces/api/course-groups";

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

    const response = await fetch(
      `${API_HOST}/course-groups${mode}${shortPath}?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grup zajęciowych!");
    }

    return await response.json();
  },

  // should be sorted by grade date
  getStudentLastGradableEvents: (
    userId: number
  ): StudentLastGradableEventsDTO[] => {
    return [
      {
        id: 1,
        gradableEventName: "Kartkówka 4",
      },
      {
        id: 2,
        gradableEventName: "Laboratorium 3",
      },
      {
        id: 3,
        gradableEventName: "Kartkówka 3",
      },
      {
        id: 4,
        gradableEventName: "Laboratorium 2",
      },
      {
        id: 5,
        gradableEventName: "Kartkówka 2",
      },
      {
        id: 6,
        gradableEventName: "Laboratorium 1",
      },
      {
        id: 7,
        gradableEventName: "Kartkówka 1",
      },
    ];
  },

  getStudentGradableEventDetails: (
    userId: number,
    gradableEventId: number
  ): StudentGradableEventDetailsDTO[] => {
    return [
      {
        id: 1,
        criteriaName: "Wykonanie zadania",
        gainedXp: 4.0,
        hasReward: false,
        gradeDate: "22.10.2025",
      },
      {
        id: 2,
        criteriaName: "Zadanie dodatkowe",
        gainedXp: 2.7,
        hasReward: true,
        gradeDate: "23.10.2025",
      },
    ];
  },
};

export default CourseGroupsService;
