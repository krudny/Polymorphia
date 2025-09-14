import {Dispatch, ReactNode, SetStateAction} from "react";
import {UseMutationResult} from "@tanstack/react-query";
import {UseCSVHeadersUpdateParams} from "@/hooks/general/CSV/useCSVHeadersUpdate/types";
import {UseCSVPreviewUpdateParams} from "@/hooks/general/CSV/useCSVPreviewUpdate/types";
import {UseCSVProcessUpdateParams} from "@/hooks/general/CSV/useCSVProcessUpdate/types";
import {ImportCSVType} from "@/interfaces/general";
import {CSVHeadersResponseDTO, CSVPreviewResponseDTO} from "@/interfaces/api/CSV";

export interface ImportCSVContextInterface {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  importType: ImportCSVType;
  csvHeadersMutation: UseMutationResult<CSVHeadersResponseDTO, Error, UseCSVHeadersUpdateParams>;
  csvPreviewMutation: UseMutationResult<CSVPreviewResponseDTO, Error, UseCSVPreviewUpdateParams>;
  csvProcessMutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
  headerMapping: Record<string, string>;
  setHeaderMapping: Dispatch<SetStateAction<Record<string, string>>>;
  goBackToUpload: () => void;
}

export interface ImportCSVProviderProps {
  children: ReactNode;
}