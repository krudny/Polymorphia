"use client"
import {SpeedDialModalProps} from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import useCSVHeadersUpdate from "@/hooks/general/CSV/useCSVHeaders";
import toast from "react-hot-toast";
import useCSVPreviewUpdate from "@/hooks/general/CSV/useCSVPreview";

export default function ImportCSVModal({
                                         onClosedAction,
                                       }: SpeedDialModalProps): ReactNode {
  const { mutation: headersMutation } = useCSVHeadersUpdate();
  const { mutation: previewMutation } = useCSVPreviewUpdate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [headerMapping, setHeaderMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    console.log(headerMapping);
  },[headerMapping]);

  const upload = (): ReactNode => {
    return (
      <div className="import-csv">
        <div
          {...getRootProps()}
          className={`
            import-csv-upload-wrapper
            ${isDragActive ? 'drag-active' : ''}
            ${isDragReject ? 'drag-reject' : ''}
            ${selectedFile ? 'file-selected' : ''}
            ${headersMutation.isPending ? 'uploading' : ''}
          `}
        >
          <input {...getInputProps()} />

          {headersMutation.isPending ? (
            <>
              <span className="import-csv-upload-icon">hourglass_empty</span>
              <span className="import-csv-text">Przesyłanie...</span>
            </>
          ) : selectedFile ? (
            <>
              <span className="import-csv-upload-icon">description</span>
              <span className="import-csv-text">{selectedFile.name}</span>
            </>
          ) : isDragActive ? (
            <>
              <span className="import-csv-upload-icon">cloud_upload</span>
              <span className="import-csv-text">Upuść plik tutaj</span>
            </>
          ) : (
            <>
              <span className="import-csv-upload-icon">cloud_upload</span>
              <span className="import-csv-text">Przeciągnij lub wgraj plik CSV tutaj</span>
            </>
          )}
        </div>

        <div className="import-csv-button-wrapper">
          <ButtonWithBorder
            text={headersMutation.isPending ? "Przesyłanie..." : selectedFile ? "Analizuj plik" : "Prześlij"}
            className="!mx-0 !py-0 !w-full"
            onClick={handleUpload}
          />
          {selectedFile && (
            <ButtonWithBorder
              text="Usuń"
              className="!mx-0 !py-0 !w-full"
              onClick={resetFile}
            />
          )}
        </div>
      </div>
    )
  }

  const pickHeaders = (): ReactNode => {
    const isAllMapped = headersMutation.data?.requiredHeaders.every(
      header => headerMapping[header]
    );

    return (
      <div className="import-csv-headers">
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
                    Wybierz kolumnę z pliku
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
            onClick={handlePreview}
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

  const preview = (): ReactNode => {
    if (!previewMutation.data) {
      return null;
    }

    const { headers, data } = previewMutation.data;
    const gridTemplateColumns = `repeat(${headers.length}, minmax(150px, 1fr))`;

    return (
      <div className="w-full h-full">
        <div className="table-wrapper text-2xl" style={{ maxHeight: '400px', overflowY: 'auto', overscrollBehavior: 'none' }}>
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
            onClick={handlePreview}
          />
          <ButtonWithBorder
            text="Powrót"
            className="!mx-0 !py-0 !w-full"
            onClick={goBackToUpload}
          />
        </div>
      </div>
    );
  };



  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
    } else {
      toast.error("Plik nie jest w formacie csv!");
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
    disabled: headersMutation.isPending,
  });

  const handleUpload = () => {
    if (selectedFile) {
      headersMutation.mutate({ file: selectedFile, type: 'GRADE_IMPORT' });
    }
  };

  const handlePreview = () => {
    if (selectedFile) {
      previewMutation.mutate({ file: selectedFile, headers: headerMapping});
    }
  }

  const resetFile = () => {
    setSelectedFile(null);
    setHeaderMapping({});
    headersMutation.reset();
  };

  const goBackToUpload = () => {
    setHeaderMapping({});
    headersMutation.reset();
  };

  const renderContent = (): ReactNode => {
    if (previewMutation.isSuccess && previewMutation.data) {
      return preview();
    }
    else if (headersMutation.isSuccess && headersMutation.data) {
      return pickHeaders();
    }
    return upload();
  };

  const getSubtitle = (): string | undefined => {
    if (previewMutation.isSuccess && previewMutation.data) {
      return "Sprawdź, czy dane się zgadzają:"
    }
    if (headersMutation.isSuccess && headersMutation.data) {
      return "Dopasuj kolumny z pliku do wymaganych pól:"
    }
  }

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV" subtitle={getSubtitle()}>
      {renderContent()}
    </Modal>
  );
}
