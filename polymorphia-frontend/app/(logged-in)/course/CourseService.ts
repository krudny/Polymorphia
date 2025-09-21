/* eslint-disable -- unused courseId due to mock */
import {CourseGroupsResponseDTO} from "@/interfaces/api/course";

export const CourseService = {
  getCourseGroups: async (courseId: number): Promise<string[]> => {
    return [
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
  },

  getCourseGroups2: async (courseId: number, userId: number): Promise<CourseGroupsResponseDTO[]> => {
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
    ]

  }
};
