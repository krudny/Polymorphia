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
};

export default TargetListService;
