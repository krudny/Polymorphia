import { createContext, useState } from "react";
import {
  ImportCSVContextInterface,
  ImportCSVProviderProps,
} from "@/providers/import-csv/types";
import useCSVHeadersUpdate from "@/hooks/app/csv/useCSVHeadersUpdate";
import useCSVPreviewUpdate from "@/hooks/app/csv/useCSVPreviewUpdate";
import useCSVProcessUpdate from "@/hooks/app/csv/useCSVProcessUpdate";

export const ImportCSVContext = createContext<
  ImportCSVContextInterface | undefined
>(undefined);

export const ImportCSVProvider = ({
  children,
  importType,
}: ImportCSVProviderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>(
    {}
  );
  const { mutation: csvHeadersMutation } = useCSVHeadersUpdate();
  const { mutation: csvPreviewMutation } = useCSVPreviewUpdate();
  const { mutation: csvProcessMutation } = useCSVProcessUpdate();

  const goBackToUpload = () => {
    setSelectedFile(null);
    setHeaderMapping({});
    csvHeadersMutation.reset();
    csvPreviewMutation.reset();
  };

  return (
    <ImportCSVContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        importType,
        csvHeadersMutation,
        csvPreviewMutation,
        csvProcessMutation,
        headerMapping,
        setHeaderMapping,
        goBackToUpload,
      }}
    >
      {children}
    </ImportCSVContext.Provider>
  );
};
