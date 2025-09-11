import {useMutation} from "@tanstack/react-query";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import {UseCSVProcessUpdate, UseCSVProcessUpdateParams} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import toast from "react-hot-toast";

export default function useCSVProcessUpdate(): UseCSVProcessUpdate {
  const mutation = useMutation<void, Error, UseCSVProcessUpdateParams>({
    mutationFn: ({ headers, type, data }) => CSVService.processCSV(type, headers, data),
    onSuccess: () => {
      toast.success("Przetwarzanie zakończyło się sukcesem");
    },
    onError: (error) => {
      toast.error("Wystąpił błąd " + error.message);
    }
  });

  return { mutation };
}