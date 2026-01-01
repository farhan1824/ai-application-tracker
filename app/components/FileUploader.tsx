import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] || null;
      setFile(selectedFile);
      onFileSelect(selectedFile);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: !!file,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  return (
    <div className="gradient-border w-full">
      <div {...getRootProps()} className="cursor-pointer rounded-lg">
        <input {...getInputProps()} />

        <div className="space-y-4 p-4 sm:p-6 md:p-8 text-center">
          <div className="flex flex-col items-center">
            {file ? (
              <div
                className="uploader-selected-file "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <img
                    src="/images/pdf.png"
                    className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
                    alt="File icon"
                  />

                  <div className="text-left min-w-0 flex-1">
                    <p className="text-gray-700 font-semibold text-sm sm:text-base break-words">
                      {file.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Size: {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <img
                  src="/icons/cross.svg"
                  className="w-4 h-4 shrink-0 ml-auto cursor-pointer"
                  alt="Remove file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    onFileSelect(null);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <img
                  src="/icons/info.svg"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  alt="Upload icon"
                />

                {isDragActive ? (
                  <p className="text-blue-500 font-medium text-sm sm:text-base">
                    Drop the file here...
                  </p>
                ) : (
                  <>
                    <p className="text-sm sm:text-base md:text-lg font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      PDF, PNG, JPG, GIF
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
