import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import toast from "react-hot-toast";
import "./index.css";
import "../index.css";

export default function PickCSVHeaders() {
  const {headersMutation, previewMutation, selectedFile, headerMapping, setHeaderMapping, goBackToUpload} = useImportCSVContext();

  const isAllMapped = headersMutation.data?.requiredHeaders.every(
    header => headerMapping[header]
  );

  const handlePickHeaders = () => {
    if (!isAllMapped) {
      toast.error("Nie wszystkie nagłówki zostały dopasowane!");
      return;
    }

    if (selectedFile) {
      previewMutation.mutate({ file: selectedFile, headers: headerMapping });
    }
  };

  return (
    <div className="import-csv">
      <div className="headers-mapping">
        {headersMutation.data?.requiredHeaders.map((header) => {
          return (
            <div className="csv-header-mapping" key={header}>
              <h3>{header}</h3>
              <select
                className="csv-header-select"
                value={headerMapping[header] || ""}
                onChange={(event) => {
                  setHeaderMapping(prev => ({
                    ...prev,
                    [header]: event.target.value
                  }));
                }}
              >
                <option value="" disabled>
                  Wybierz kolumnę
                </option>
                {headersMutation.data?.fileHeaders.map((fileHeader) => (
                  <option key={fileHeader} value={fileHeader}>
                    {fileHeader}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>

      <div className="import-csv-button-wrapper">
        <ButtonWithBorder
          text="Zatwierdź"
          className="!mx-0 !py-0 !w-full"
          onClick={handlePickHeaders}
        />
        <ButtonWithBorder
          text="Powrót"
          className="!mx-0 !py-0 !w-full"
          onClick={goBackToUpload}
        />
      </div>
    </div>
  )
}