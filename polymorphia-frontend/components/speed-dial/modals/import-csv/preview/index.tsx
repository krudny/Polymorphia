import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import useModalContext from "@/hooks/contexts/useModalContext";

export default function PreviewCSV() {
  const {previewMutation, processMutation, goBackToUpload} = useImportCSVContext();
  const { closeModal } = useModalContext();

  if (!previewMutation.data) {
    return null;
  }

  const handleConfirm = () => {
    processMutation.mutate({ type: 'GRADE_IMPORT', headers: previewMutation.data.headers, data: previewMutation.data.data });
    closeModal();
  }

  const { headers, data } = previewMutation.data;
  const gridTemplateColumns = `repeat(${headers.length}, minmax(150px, 1fr))`;

  return (
    <div className="w-full h-full">
      <div className="table-wrapper text-2xl" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'none' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: gridTemplateColumns,
          borderLeft: '1px solid #000',
        }}>
          {headers.map((header, index) => (
            <div key={`header-${index}`} style={{
              position: 'sticky',
              top: 0,
              padding: '8px',
              backgroundColor: '#d4d4d4',
              textAlign: 'left',
              fontWeight: 'normal',
              zIndex: 1,
              borderTop: '1px solid #000',
              borderBottom: '1px solid #000',
              borderRight: '1px solid #000',
            }}>
              {header}
            </div>
          ))}

          {data.flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} style={{
                padding: '8px',
                borderBottom: '1px solid #000',
                borderRight: '1px solid #000',
                minHeight: '40px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
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