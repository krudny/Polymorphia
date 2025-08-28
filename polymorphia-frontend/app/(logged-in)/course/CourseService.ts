/* eslint-disable -- unused courseId due to mock */
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
};
