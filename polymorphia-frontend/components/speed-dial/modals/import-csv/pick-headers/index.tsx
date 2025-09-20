import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import toast from "react-hot-toast";
import "./index.css";
import "../index.css";

export default function PickCSVHeaders() {
  const {
    csvHeadersMutation,
    csvPreviewMutation,
    selectedFile,
    headerMapping,
    setHeaderMapping,
    goBackToUpload,
  } = useImportCSVContext();

  const isAllMapped = csvHeadersMutation.data?.requiredCSVHeaders.every(
    (csvHeader) => headerMapping[csvHeader]
  );

  const handlePickHeaders = () => {
    if (!isAllMapped) {
      toast.error("Nie wszystkie nagłówki zostały dopasowane!");
      return;
    }

    if (selectedFile) {
      csvPreviewMutation.mutate({
        file: selectedFile,
        csvHeaders: headerMapping,
      });
    }
  };

  return (
    <div className="import-csv">
      <div className="headers-mapping">
        {csvHeadersMutation.data?.requiredCSVHeaders.map((csvHeader) => {
          return (
            <div className="csv-header-mapping" key={csvHeader}>
              <h3>{csvHeader}</h3>
              <select
                className="csv-header-select"
                value={headerMapping[csvHeader] || ""}
                onChange={(event) => {
                  setHeaderMapping((prev) => ({
                    ...prev,
                    [csvHeader]: event.target.value,
                  }));
                }}
              >
                <option value="" disabled>
                  Wybierz kolumnę
                </option>
                {csvHeadersMutation.data?.fileCSVHeaders.map(
                  (fileCSVHeader) => (
                    <option key={fileCSVHeader} value={fileCSVHeader}>
                      {fileCSVHeader}
                    </option>
                  )
                )}
              </select>
            </div>
          );
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
  );
}
