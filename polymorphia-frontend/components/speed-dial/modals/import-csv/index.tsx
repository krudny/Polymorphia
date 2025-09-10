"use client"
import {SpeedDialModalProps} from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import {ReactNode, useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import useCSVHeadersUpdate from "@/hooks/general/CSV/useCSVHeaders";
import toast from "react-hot-toast";

export default function ImportCSVModal({
  onClosedAction,
}: SpeedDialModalProps): ReactNode {
  const { mutation } = useCSVHeadersUpdate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    disabled: mutation.isPending,
  });

  const handleUpload = () => {
    if (selectedFile) {
      mutation.mutate({ file: selectedFile, type: 'GRADE_IMPORT' });
    }
  };

  const resetFile = () => {
    setSelectedFile(null);
    mutation.reset();
  };

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV">
      <div className="import-csv">
        <div
          {...getRootProps()}
          className={`
            import-csv-upload-wrapper
            ${isDragActive ? 'drag-active' : ''}
            ${isDragReject ? 'drag-reject' : ''}
            ${selectedFile ? 'file-selected' : ''}
            ${mutation.isPending ? 'uploading' : ''}
          `}
        >
          <input {...getInputProps()} />

          {mutation.isSuccess ?  (
            <div className="import-csv-success">
              {mutation.data.requiredHeaders.map((header) => {
                return (
                  <div className="csv-header-mapping" key={header}>
                    <h3>{header}</h3>
                    <select
                      className="csv-header-select"
                      onChange={(event) => {
                        console.log(`${header} -> ${event.target.value}`);
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Wybierz kolumnę z pliku
                      </option>
                      {mutation.data?.fileHeaders.map((fileHeader) => (
                        <option key={fileHeader} value={fileHeader}>
                          {fileHeader}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })}
            </div>
          ) : mutation.isPending  ? (
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
            text={mutation.isPending ? "Przesyłanie..." : "Prześlij"}
            className="!mx-0 !py-0 !w-full"
            onClick={handleUpload}
          />
          {selectedFile && <ButtonWithBorder
              text="Usuń"
              className="!mx-0 !py-0 !w-full"
              onClick={resetFile}
          />}
        </div>
      </div>
    </Modal>
  );
}
