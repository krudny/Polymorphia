import {
  CourseGroupResponse,
  CourseGroupType,
  CourseGroupTypes,
} from "@/services/course-groups/types";
import { ApiClient } from "@/services/api/client";
import {
  CourseGroupDetailsResponseDTO,
  CreateCourseGroupRequestDTO,
  StudentLastActivityDTO,
  TeachingRoleUserResponseDTO,
  UpdateCourseGroupRequestDTO,
} from "@/interfaces/api/course-groups";
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

  getStudentLastActivity: async (
    userId: number,
    courseId: number
  ): Promise<StudentLastActivityDTO[]> => {
    return await ApiClient.get<StudentLastActivityDTO[]>(
      `/students/${userId}/activity?courseId=${courseId}`
    );
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

  createCourseGroup: async (
    body: CreateCourseGroupRequestDTO
  ): Promise<void> => {
    await ApiClient.post(`/course-groups`, body);
  },

  deleteCourseGroup: async (courseGroupId: number): Promise<void> => {
    await ApiClient.delete(`/course-groups/${courseGroupId}`);
  },

  getCourseGroupDetails: async (
    courseGroupId: number
  ): Promise<CourseGroupDetailsResponseDTO> => {
    return await ApiClient.get<CourseGroupDetailsResponseDTO>(
      `/course-groups/${courseGroupId}`
    );
  },

  updateCourseGroup: async (
    courseGroupId: number,
    body: UpdateCourseGroupRequestDTO
  ): Promise<void> => {
    await ApiClient.put(`/course-groups/${courseGroupId}`, body);
  },

  getTeachingRoleUsers: async (
    courseId: number
  ): Promise<TeachingRoleUserResponseDTO[]> => {
    return await ApiClient.get<TeachingRoleUserResponseDTO[]>(
      `/course-groups/teaching-role?courseId=${courseId}`
    );
  },
};

export default CourseGroupsService;
