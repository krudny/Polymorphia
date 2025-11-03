import {
  CourseGroupResponse,
  CourseGroupType,
  CourseGroupTypes,
} from "@/services/course-groups/types";
import { fetchJson, getEndpoint } from "@/services/api/client";

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

    return await fetchJson<CourseGroupResponse<T>>(
      getEndpoint(`/course-groups${mode}${shortPath}?courseId=${courseId}`)
    );
  },
};

export default CourseGroupsService;
