import { useMutation } from "@tanstack/react-query";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import {
  UseCSVProcessUpdateParams,
  UseCSVProcessUpdate,
} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { ImportCSVTypes } from "@/interfaces/general";
import { csvMessages } from "@/hooks/general/CSV/useCSVProcessUpdate/messages";
import useFetch from "@/hooks/general/useFetch";

export default function useCSVProcessUpdate(): UseCSVProcessUpdate {
  const { gradableEventId, courseGroupId } = useEventParams();
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();

  const mutation = useMutation<void, Error, UseCSVProcessUpdateParams>({
    mutationFn: async (params) => {
      const promise = (async () => {
        switch (params.type) {
          case ImportCSVTypes.GRADE_IMPORT:
            return await CSVService.processGradeImport(
              fetchFn,
              params.csvHeaders,
              params.data,
              gradableEventId
            );
          case ImportCSVTypes.STUDENT_INVITE:
            return await CSVService.processStudentCourseInvite(
              fetchFn,
              params.csvHeaders,
              params.data,
              courseId
            );
          case ImportCSVTypes.GROUP_INVITE:
            return await CSVService.processStudentGroupInvite(
              fetchFn,
              params.csvHeaders,
              params.data,
              courseGroupId
            );
        }
      })();

      return toast.promise(promise, csvMessages[params.type]);
    },
  });

  return { mutation };
}
