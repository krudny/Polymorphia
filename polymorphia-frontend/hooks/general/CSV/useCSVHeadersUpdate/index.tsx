import {
  UseCSVHeadersUpdate,
  UseCSVHeadersUpdateParams,
} from "@/hooks/general/CSV/useCSVHeadersUpdate/types";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import { useMutation } from "@tanstack/react-query";
import { CSVHeadersResponseDTO } from "@/interfaces/api/CSV";
import toast from "react-hot-toast";
import useFetch from "@/hooks/general/useFetch";

export default function useCSVHeadersUpdate(): UseCSVHeadersUpdate {
  const { fetch: fetchFn } = useFetch();
  const mutation = useMutation<
    CSVHeadersResponseDTO,
    Error,
    UseCSVHeadersUpdateParams
  >({
    mutationFn: ({ file, type }) =>
      CSVService.getCSVHeaders(fetchFn, file, type),
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
