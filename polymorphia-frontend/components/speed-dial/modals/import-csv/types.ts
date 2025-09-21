import { ImportCSVType } from "@/interfaces/general";

export interface ImportCSVModalProps {
  onClosedAction: () => void;
  importType: ImportCSVType;
}
