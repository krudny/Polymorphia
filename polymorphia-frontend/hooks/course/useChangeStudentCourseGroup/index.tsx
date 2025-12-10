import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useModalContext from "@/hooks/contexts/useModalContext";
import { UseChangeStudentCourseGroup } from "@/hooks/course/useChangeStudentCourseGroup/types";
import { ChangeStudentCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

export default function useChangeStudentCourseGroup(): UseChangeStudentCourseGroup {
  const queryClient = useQueryClient();
  const { courseId } = useUserDetails();
  const { closeModal } = useModalContext();

  const mutation = useMutation<void, Error, ChangeStudentCourseGroupRequestDTO>(
    {
      mutationFn: (data: ChangeStudentCourseGroupRequestDTO) => {
        return toast.promise(
          CourseGroupsService.changeStudentCourseGroup(data),
          {
            loading: "Przenoszenie studenta...",
            success: "Student został przeniesiony do nowej grupy!",
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "courseGroups",
            courseId,
            CourseGroupTypes.INDIVIDUAL_FULL,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["courseGroupTargets"],
        });
        closeModal();
      },
    }
  );

  return { mutation };
}
