import {
  UseCSVHeadersUpdate,
  UseCSVHeadersUpdateParams,
} from "@/hooks/general/CSV/useCSVHeadersUpdate/types";
import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import { useMutation } from "@tanstack/react-query";
import { CSVHeadersResponseDTO } from "@/interfaces/api/CSV";

export default function useCSVHeadersUpdate(): UseCSVHeadersUpdate {
  const mutation = useMutation<
    CSVHeadersResponseDTO,
    Error,
    UseCSVHeadersUpdateParams
  >({
    mutationFn: ({ file, type }) => CSVService.getCSVHeaders(file, type),
  });

  return { mutation };
}
