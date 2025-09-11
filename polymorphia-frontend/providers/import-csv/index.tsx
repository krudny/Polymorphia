import {createContext, useEffect, useState} from "react";
import {ImportCSVContextInterface, ImportCSVProviderProps} from "@/providers/import-csv/types";
import useCSVHeadersUpdate from "@/hooks/general/CSV/useCSVHeadersUpdate";
import useCSVPreviewUpdate from "@/hooks/general/CSV/useCSVPreviewUpdate";
import useCSVProcessUpdate from "@/hooks/general/CSV/useCSVProcessUpdate";
import {EventTypes, ImportCSVType, ImportCSVTypes} from "@/interfaces/general";
import {useEventParams} from "@/hooks/general/useEventParams";
import Loading from "@/components/loading/Loading";

export const ImportCSVContext = createContext<ImportCSVContextInterface | undefined>(undefined);

export const ImportCSVProvider = ({ children }: ImportCSVProviderProps) => {
  const { eventType } = useEventParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<ImportCSVType | null>(null);
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>({});
  const { mutation: headersMutation } = useCSVHeadersUpdate();
  const { mutation: previewMutation } = useCSVPreviewUpdate();
  const { mutation: processMutation } = useCSVProcessUpdate();

  // TODO: not super logic
  useEffect(() => {
    if(eventType === EventTypes.TEST) {
      setImportType(ImportCSVTypes.GRADE_IMPORT)
    } else {
      setImportType(ImportCSVTypes.STUDENT_INVITE)
    }
  }, [eventType])

  const goBackToUpload = () => {
    setSelectedFile(null);
    setHeaderMapping({});
    headersMutation.reset();
    previewMutation.reset();
  };

  if(!importType) {
    return <Loading />
  }

  return (
    <ImportCSVContext.Provider value={{
      selectedFile,
      setSelectedFile,
      importType,
      headersMutation,
      previewMutation,
      processMutation,
      headerMapping,
      setHeaderMapping,
      goBackToUpload,
    }}>
      {children}
    </ImportCSVContext.Provider>
  )
}
