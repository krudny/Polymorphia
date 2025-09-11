import {Dispatch, ReactNode, SetStateAction} from "react";
import {UseMutationResult} from "@tanstack/react-query";
import {CSVHeadersResponseDTO, CSVPreviewResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";
import {UseCSVHeadersUpdateParams} from "@/hooks/general/CSV/useCSVHeadersUpdate/types";
import {UseCSVPreviewUpdateParams} from "@/hooks/general/CSV/useCSVPreviewUpdate/types";
import {UseCSVProcessUpdateParams} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import {ImportCSVType} from "@/interfaces/general";

export interface ImportCSVContextInterface {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  importType: ImportCSVType;
  headersMutation: UseMutationResult<CSVHeadersResponseDTO, Error, UseCSVHeadersUpdateParams>;
  previewMutation: UseMutationResult<CSVPreviewResponseDTO, Error, UseCSVPreviewUpdateParams>;
  processMutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
  headerMapping: Record<string, string>;
  setHeaderMapping: Dispatch<SetStateAction<Record<string, string>>>;
  goBackToUpload: () => void;
}

export interface ImportCSVProviderProps {
  children: ReactNode;
}