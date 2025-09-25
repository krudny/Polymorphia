import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import "./index.css";
import "../index.css";

export default function PreviewCSV() {
  const {
    selectedFile,
    importType,
    csvPreviewMutation,
    csvProcessMutation,
    goBackToUpload,
  } = useImportCSVContext();

  if (!csvPreviewMutation.data || !selectedFile) {
    return;
  }

  const handleConfirm = () => {
    csvProcessMutation.mutate({
      type: importType,
      csvHeaders: csvPreviewMutation.data.csvHeaders,
      data: csvPreviewMutation.data.data,
    });
  };

  const { csvHeaders, data } = csvPreviewMutation.data;
  const gridTemplateColumns = `repeat(${csvHeaders.length}, minmax(150px, 1fr))`;

  return (
    <div className="import-csv">
      <div className="table-wrapper">
        <div
          className="table"
          style={{
            gridTemplateColumns: gridTemplateColumns,
          }}
        >
          {csvHeaders.map((csvHeader, index) => (
            <div className="table-header" key={`header-${index}`}>
              {csvHeader}
            </div>
          ))}

          {data.flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div className="table-cell" key={`${rowIndex}-${cellIndex}`}>
                {cell || "—"}
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`import-csv-button-wrapper ${data.length > 10 && "preview-buttons-override"}`}>
        <ButtonWithBorder
          text="Zatwierdź"
          className="!mx-0 !py-0 !w-full"
          onClick={handleConfirm}
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
