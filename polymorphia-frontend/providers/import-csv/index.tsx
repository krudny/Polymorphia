import {createContext, useState} from "react";
import {ImportCSVContextInterface, ImportCSVProviderProps} from "@/providers/import-csv/types";
import useCSVHeadersUpdate from "../../hooks/general/CSV/useCSVHeadersUpdate";
import useCSVPreviewUpdate from "../../hooks/general/CSV/useCSVPreviewUpdate";
import useCSVProcessUpdate from "@/hooks/general/CSV/useCSVProcessUpdate";

export const ImportCSVContext = createContext<ImportCSVContextInterface | undefined>(undefined);

export const ImportCSVProvider = ({ children }: ImportCSVProviderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>({});
  const { mutation: headersMutation } = useCSVHeadersUpdate();
  const { mutation: previewMutation } = useCSVPreviewUpdate();
  const { mutation: processMutation } = useCSVProcessUpdate();

  const goBackToUpload = () => {
    setHeaderMapping({});
    headersMutation.reset();
  };

  const resetFile = () => {
    setSelectedFile(null);
    setHeaderMapping({});
    headersMutation.reset();
  };

  return (
    <ImportCSVContext.Provider value={{
      selectedFile,
      setSelectedFile,
      headersMutation,
      previewMutation,
      processMutation,
      headerMapping,
      setHeaderMapping,
      resetFile,
      goBackToUpload,
    }}>
      {children}
    </ImportCSVContext.Provider>
  )
}
