"use client"

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {ReactNode, useCallback} from "react";
import toast from "react-hot-toast";
import {useDropzone} from "react-dropzone";
import useImportCSVContext from "@/hooks/contexts/useImportCSVContext";
import "./index.css"
import "../index.css"

export default function UploadCSV(): ReactNode {
  const { selectedFile, importType, setSelectedFile, headersMutation, goBackToUpload } = useImportCSVContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
    } else {
      toast.error("Plik nie jest w formacie csv!");
    }
  }, [setSelectedFile]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
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
      headersMutation.mutate({ file: selectedFile, type: importType });
    }
  };

  return (
    <div className="import-csv">
      <div
        {...getRootProps()}
        className={`
            import-csv-upload-wrapper
            ${isDragActive ? 'drag-active' : ''}
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
            onClick={goBackToUpload}
          />
        )}
      </div>
    </div>
  )
}