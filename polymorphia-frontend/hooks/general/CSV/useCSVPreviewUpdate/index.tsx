import CSVService, {CSVPreviewResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";
import {useMutation} from "@tanstack/react-query";
import {UseCSVPreviewUpdate, UseCSVPreviewUpdateParams} from "@/hooks/general/CSV/useCSVPreviewUpdate/types";

export default function useCSVPreviewUpdate(): UseCSVPreviewUpdate {
  const mutation = useMutation<CSVPreviewResponseDTO, Error, UseCSVPreviewUpdateParams>({
    mutationFn: ({ file, headers }) => CSVService.getPreview(file, headers),
    onSuccess: (data) => {
      console.log('Headers fetched:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch headers:', error);
    }
  });

  return { mutation };
}