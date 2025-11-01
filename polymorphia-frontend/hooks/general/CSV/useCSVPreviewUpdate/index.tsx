import CSVService from "@/components/speed-dial/modals/import-csv/CSVService";
import { useMutation } from "@tanstack/react-query";
import {
  UseCSVPreviewUpdate,
  UseCSVPreviewUpdateParams,
} from "@/hooks/general/CSV/useCSVPreviewUpdate/types";
import { CSVPreviewResponseDTO } from "@/interfaces/api/CSV";
import toast from "react-hot-toast";
import useFetch from "@/hooks/general/useFetch";

export default function useCSVPreviewUpdate(): UseCSVPreviewUpdate {
  const { fetch: fetchFn } = useFetch();
  const mutation = useMutation<
    CSVPreviewResponseDTO,
    Error,
    UseCSVPreviewUpdateParams
  >({
    mutationFn: ({ file, csvHeaders }) =>
      CSVService.getCSVPreview(fetchFn, file, csvHeaders),
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
