import {useMutation} from "@tanstack/react-query";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import {UseCSVProcessUpdate, UseCSVProcessUpdateParams,} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import toast from "react-hot-toast";
import {useEventParams} from "@/hooks/general/useEventParams";

export default function useCSVProcessUpdate(): UseCSVProcessUpdate {
  const { gradableEventId } = useEventParams();

  const mutation = useMutation<void, Error, UseCSVProcessUpdateParams>({
    mutationFn: ({ csvHeaders, type, data }) =>
      CSVService.processCSV(type, csvHeaders, data, gradableEventId),
    onSuccess: () => {
      toast.success("Przetwarzanie zakończyło się sukcesem");
    },
    onError: ({ message }: Error) => {
      toast.error(message);
    }
  });

  return { mutation };
}
