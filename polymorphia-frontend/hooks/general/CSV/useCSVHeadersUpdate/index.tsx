import {UseCSVHeadersUpdate, UseCSVHeadersUpdateParams} from "@/hooks/general/CSV/useCSVHeadersUpdate/types";
import CSVService, {CSVHeadersResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";
import {useMutation} from "@tanstack/react-query";

export default function useCSVHeadersUpdate(): UseCSVHeadersUpdate {
  const mutation = useMutation<CSVHeadersResponseDTO, Error, UseCSVHeadersUpdateParams>({
    mutationFn: ({ file, type }) => CSVService.getHeaders(file, type),
    onSuccess: (data) => {
      console.log('Headers fetched:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch headers:', error);
    }
  });

  return { mutation };
}