import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import { UseTitleHook } from "@/providers/title/types";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { useParams } from "next/navigation";

const useCourseGroupTitle: UseTitleHook = () => {
  const { courseId } = useUserDetails();
  const { courseGroupId } = useParams();
  const { data: courseGroups, isError } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.INDIVIDUAL_FULL,
  });

  if (courseGroups) {
    return (
      courseGroups
        .find((courseGroup) => courseGroup.id === Number(courseGroupId))
        ?.name.toUpperCase() ?? ""
    );
  } else if (isError) {
    return "";
  } else {
    return undefined;
  }
};

export default useCourseGroupTitle;
