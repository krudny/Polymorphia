"use client"
import {SpeedDialModalProps} from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import "./index.css";
import {ReactNode} from "react";
import {ImportCSVProvider} from "@/providers/import-csv";
import UploadCSV from "@/components/speed-dial/modals/import-csv/upload";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import PickCSVHeaders from "@/components/speed-dial/modals/import-csv/pick-headers";
import PreviewCSV from "@/components/speed-dial/modals/import-csv/preview";

const ImportCSVContent = ({ onClosedAction }: SpeedDialModalProps) => {
  const {
    headersMutation,
    previewMutation,
  } = useImportCSVContext();

  const renderData = (): { content: ReactNode; subtitle?: string } => {
    if (previewMutation.isSuccess && previewMutation.data) {
      return {
        content: <PreviewCSV />,
        subtitle: "Sprawdź, czy dane się zgadzają:",
      };
    }
    if (headersMutation.isSuccess && headersMutation.data) {
      return {
        content: <PickCSVHeaders />,
        subtitle: "Dopasuj kolumny z pliku do wymaganych pól:",
      };
    }
    return {
      content: <UploadCSV />,
      subtitle: "",
    };
  };

  const { content, subtitle } = renderData();

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV" subtitle={subtitle}>
      {content}
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
