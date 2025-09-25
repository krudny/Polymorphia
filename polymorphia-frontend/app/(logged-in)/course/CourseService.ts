/* eslint-disable -- unused courseId due to mock */
import { CourseGroupsResponseDTO } from "@/interfaces/api/course";

export const CourseService = {
  getCourseGroups: async (
    courseId: number
  ): Promise<CourseGroupsResponseDTO[]> => {
    return [
      {
        id: 1,
        name: "BM-ŚR-1600",
        subtitle: "Subtitle",
        studentCount: 12,
      },
      {
        id: 2,
        name: "BM-ŚR-1700",
        subtitle: "Subtitle",
        studentCount: 11,
      },
      {
        id: 3,
        name: "BM-ŚR-1800",
        subtitle: "Subtitle",
        studentCount: 9,
      },
      {
        id: 4,
        name: "BM-WT-1300",
        subtitle: "Subtitle",
        studentCount: 10,
      },
      {
        id: 5,
        name: "BM-WT-1700",
        subtitle: "Subtitle",
        studentCount: 14,
      },
    ];
  },
};
