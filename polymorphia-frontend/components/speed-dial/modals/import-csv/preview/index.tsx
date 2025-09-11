import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import useModalContext from "@/hooks/contexts/useModalContext";
import "./index.css";
import "../index.css";

export default function PreviewCSV() {
  const {selectedFile, previewMutation, processMutation, goBackToUpload} = useImportCSVContext();
  const { closeModal } = useModalContext();

  if (!previewMutation.data || !selectedFile) {
    return null;
  }

  const handleConfirm = () => {
    processMutation.mutate({ type: 'GRADE_IMPORT', headers: previewMutation.data.headers, data: previewMutation.data.data });
    closeModal();
  }

  const { headers, data } = previewMutation.data;
  const gridTemplateColumns = `repeat(${headers.length}, minmax(150px, 1fr))`;

  return (
    <div className="import-csv">
      <div className="table-wrapper">
        <div className="table" style={{
          gridTemplateColumns: gridTemplateColumns,
        }}>
          {headers.map((header, index) => (
            <div className="table-header" key={`header-${index}`}>
              {header}
            </div>
          ))}

          {data.flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div className="table-cell" key={`${rowIndex}-${cellIndex}`}>
                {cell || '—'}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="import-csv-button-wrapper">
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