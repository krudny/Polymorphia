import { useMutation } from "@tanstack/react-query";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import {
  UseCSVProcessUpdate,
  UseCSVProcessUpdateParams,
} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import AuthService from "@/services/AuthService";

export default function useCSVProcessUpdate(): UseCSVProcessUpdate {
  const { gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();

  const mutation = useMutation<void, Error, UseCSVProcessUpdateParams>({
    mutationFn: ({ csvHeaders, type, data }) => {
      return toast.promise(
        CSVService.processCSV(
          type,
          csvHeaders,
          data,
          courseId,
          gradableEventId
        ),
        {
          loading: "Przetwarzanie...",
          success: "Przetwarzanie zakończyło się sukcesem",
          error: (error) => `${error.message}`,
        }
      );
    },
  });

  return { mutation };
}
