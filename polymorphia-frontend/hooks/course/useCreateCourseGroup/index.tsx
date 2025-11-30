import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";
import CourseGroupsService from "@/services/course-groups";
import { UseCreateCourseGroup } from "@/hooks/course/useCreateCourseGroup/types";
import useModalContext from "@/hooks/contexts/useModalContext";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";

export default function useCreateCourseGroup(): UseCreateCourseGroup {
  const { closeModal } = useModalContext();
  const queryClient = useQueryClient();
  const { courseId } = useUserDetails();

  const mutation = useMutation<void, Error, CreateCourseGroupRequestDTO>({
    mutationFn: (request: CreateCourseGroupRequestDTO) => {
      return toast.promise(CourseGroupsService.createCourseGroup(request), {
        loading: "Tworzenie...",
        success: "Utworzono grupę zajęciową!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseGroups", courseId, CourseGroupTypes.INDIVIDUAL_FULL],
      });
      closeModal();
    },
  });

  return { mutation };
}
