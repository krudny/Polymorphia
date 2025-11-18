import { StudentTargetResponseDTO } from "@/interfaces/api/target";
import { ApiClient } from "@/services/api/client";

const TargetListService = {
  getGroupsForGradingFilters: async (
    gradableEventId: number
  ): Promise<string[]> => {
    return ApiClient.get(
      `/target-lists/grading/groups?gradableEventId=${gradableEventId}`
    );
  },
  getCourseGroupTargetList: async (
    courseGroupId: number,
    searchTerm: string,
    searchBy: string,
    sortBy: string,
    sortOrder: string
  ): Promise<StudentTargetResponseDTO[]> => {
    return ApiClient.post(`/target-lists/course-group`, {
      courseGroupId: courseGroupId,
      searchTerm: !searchTerm || searchTerm.trim() === "" ? "" : searchTerm,
      searchBy: searchBy,
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  },
  getGradingTargetList: async (
    gradableEventId: number,
    searchTerm: string,
    searchBy: string,
    sortBy: string,
    sortOrder: string,
    groups: string[],
    gradeStatus: string
  ): Promise<StudentTargetResponseDTO[]> => {
    return ApiClient.post(`/target-lists/grading`, {
      gradableEventId: gradableEventId,
      searchTerm: !searchTerm || searchTerm.trim() === "" ? "" : searchTerm,
      searchBy: searchBy,
      sortBy: sortBy,
      sortOrder: sortOrder,
      groups: groups,
      gradeStatus: gradeStatus,
    });
  },
};

export default TargetListService;
