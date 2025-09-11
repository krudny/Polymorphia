import {useContext} from "react";
import {ImportCSVContextInterface} from "@/providers/import-csv/types";
import {ImportCSVContext} from "@/providers/import-csv";

export default function useImportCSVContext(): ImportCSVContextInterface {
  const context = useContext(ImportCSVContext);

  if (!context) {
    throw new Error(
      "useImportCSVContext must be used within ImportCSVProvider"
    );
  }

  return context;
}
