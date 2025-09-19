import { createContext, useEffect, useState } from "react";
import {
  ImportCSVContextInterface,
  ImportCSVProviderProps,
} from "@/providers/import-csv/types";
import useCSVHeadersUpdate from "@/hooks/general/CSV/useCSVHeadersUpdate";
import useCSVPreviewUpdate from "@/hooks/general/CSV/useCSVPreviewUpdate";
import useCSVProcessUpdate from "@/hooks/general/CSV/useCSVProcessUpdate";
import {
  EventTypes,
  ImportCSVType,
  ImportCSVTypes,
} from "@/interfaces/general";
import { useEventParams } from "@/hooks/general/useEventParams";

export const ImportCSVContext = createContext<
  ImportCSVContextInterface | undefined
>(undefined);

export const ImportCSVProvider = ({ children }: ImportCSVProviderProps) => {
  const { eventType } = useEventParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<ImportCSVType | null>(null);
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>(
    {}
  );
  const { mutation: csvHeadersMutation } = useCSVHeadersUpdate();
  const { mutation: csvPreviewMutation } = useCSVPreviewUpdate();
  const { mutation: csvProcessMutation } = useCSVProcessUpdate();

  // TODO: not super logic
  useEffect(() => {
    if (eventType === EventTypes.TEST) {
      setImportType(ImportCSVTypes.GRADE_IMPORT);
    } else {
      setImportType(ImportCSVTypes.STUDENT_INVITE);
    }
  }, [eventType]);

  const goBackToUpload = () => {
    setSelectedFile(null);
    setHeaderMapping({});
    csvHeadersMutation.reset();
    csvPreviewMutation.reset();
  };

  if (!importType) {
    return null;
  }

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
