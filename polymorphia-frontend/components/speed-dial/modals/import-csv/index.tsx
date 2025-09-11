"use client"
import {SpeedDialModalProps} from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import "./index.css";
import {ReactNode, useEffect} from "react";
import {ImportCSVProvider} from "@/providers/import-csv";
import UploadCSV from "@/components/speed-dial/modals/import-csv/upload";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import PickCSVHeaders from "@/components/speed-dial/modals/import-csv/pick-headers";
import PreviewCSV from "@/components/speed-dial/modals/import-csv/preview";

const ImportCSVContent = ({ onClosedAction }: SpeedDialModalProps) => {
  const {
    headersMutation,
    previewMutation,
    headerMapping,
  } = useImportCSVContext();

  useEffect(() => {
    console.log(headerMapping);
  }, [headerMapping]);

  const renderContent = (): ReactNode => {
    if (previewMutation.isSuccess && previewMutation.data) {
      return <PreviewCSV />
    }
    if (headersMutation.isSuccess && headersMutation.data) {
      return <PickCSVHeaders />
    }
    return <UploadCSV />;
  };

  const getSubtitle = (): string | undefined => {
    if (previewMutation.isSuccess && previewMutation.data) {
      return "Sprawdź, czy dane się zgadzają:";
    }
    if (headersMutation.isSuccess && headersMutation.data) {
      return "Dopasuj kolumny z pliku do wymaganych pól:";
    }
    return "";
  };

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV" subtitle={getSubtitle()}>
      {renderContent()}
    </Modal>
  );
};

export default function ImportCSVModal({ onClosedAction }: SpeedDialModalProps): ReactNode {
  return (
    <ImportCSVProvider>
      <ImportCSVContent onClosedAction={onClosedAction} />
    </ImportCSVProvider>
  );
}
