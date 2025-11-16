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

  getStudentItems: async (
    courseId: number,
    userId: number
  ): Promise<EquipmentItemResponseDTO[]> => {
    return await ApiClient.get<EquipmentItemResponseDTO[]>(
      `/equipment/items?courseId=${courseId}&studentId=${userId}`
    );
  },

  getStudentChests: async (
    courseId: number,
    userId: number
  ): Promise<EquipmentChestResponseDTO[]> => {
    return await ApiClient.get<EquipmentChestResponseDTO[]>(
      `/equipment/chests?courseId=${courseId}&studentId=${userId}`
    );
  },

  getStudentSummary: async (
    courseId: number,
    userId: number
  ): Promise<StudentSummaryResponseDTO> => {
    return await ApiClient.get<StudentSummaryResponseDTO>(
      `/students/${userId}/profile?courseId=${courseId}`
    );
  },
};

export default CourseGroupsService;
