import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useModalContext from "@/hooks/contexts/useModalContext";
import { UseUpdateCourseGroup } from "@/hooks/course/useUpdateCourseGroup/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { UpdateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

export default function useUpdateCourseGroup(): UseUpdateCourseGroup {
  const queryClient = useQueryClient();
  const { courseId } = useUserDetails();
  const { courseGroupId } = useEventParams();
  const { closeModal } = useModalContext();

  const mutation = useMutation<void, Error, UpdateCourseGroupRequestDTO>({
    mutationFn: (data: UpdateCourseGroupRequestDTO) => {
      if (!courseGroupId) {
        throw new Error("Nie znaleziono ID grupy zajęciowej w parametrach.");
      }

      return toast.promise(
        CourseGroupsService.updateCourseGroup(courseGroupId, data),
        {
          loading: "Aktualizowanie...",
          success: "Zaktualizowano grupę zajęciową!",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseGroups", courseId, CourseGroupTypes.INDIVIDUAL_FULL],
      });
      queryClient.invalidateQueries({
        queryKey: ["courseGroupDetails", courseGroupId],
      });
      closeModal();
    },
  });

  return { mutation };
}
