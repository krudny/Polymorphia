import { StudentTargetResponseDTO } from "@/interfaces/api/target";
import { API_HOST } from "../api";

const TargetListService = {
  getGroupsForGradingFilters: async (
    gradableEventId: number
  ): Promise<string[]> => {
    const response = await fetch(
      `${API_HOST}/target-lists/grading/groups?gradableEventId=${gradableEventId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się załadować grup!");
    }

    return await response.json();
  },
  getCourseGroupTargetList: async (
    courseGroupId: number,
    searchTerm: string,
    searchBy: string,
    sortBy: string,
    sortOrder: string
  ): Promise<StudentTargetResponseDTO[]> => {
    const response = await fetch(`${API_HOST}/target-lists/course-group`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseGroupId: courseGroupId,
        searchTerm: !searchTerm || searchTerm.trim() === "" ? "" : searchTerm,
        searchBy: searchBy,
        sortBy: sortBy,
        sortOrder: sortOrder,
      }),
    });

    if (!response.ok) {
      throw new Error("Nie udało się załadować członków grupy zajęciowej!");
    }

    return await response.json();
  },
};

export default TargetListService;
