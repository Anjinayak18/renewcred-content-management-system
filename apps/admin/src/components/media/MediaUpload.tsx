"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { toast } from "sonner";

import Button from "@/components/common/Button";

interface MediaUploadProps {
  accept?: string;
  maxFileSize?: number;
  multiple?: boolean;
  uploading?: boolean;
  onUpload: (files: File[]) => Promise<void> | void;
}

export default function MediaUpload({
  accept = "image/*",
  maxFileSize = 5 * 1024 * 1024,
  multiple = true,
  uploading = false,
  onUpload
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const validateFiles = (files: File[]) => {
    const validFiles: File[] = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        toast.error(
          `${file.name} exceeds the maximum file size.`
        );
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = validateFiles(Array.from(files));

    setSelectedFiles(fileArray);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setDragActive(false);

    handleFiles(event.dataTransfer.files);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    handleFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files.");
      return;
    }

    await onUpload(selectedFiles);

    setSelectedFiles([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
          dragActive
            ? "border-primary bg-blue-50"
            : "border-border bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() =>
          setDragActive(false)
        }
        onDrop={handleDrop}
      >
        <h3 className="text-lg font-semibold">
          Drag & Drop Files
        </h3>

        <p className="mt-2 text-sm text-text-secondary">
          or click below to browse files
        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />

        <Button
          className="mt-6"
          onClick={() =>
            inputRef.current?.click()
          }
        >
          Select Files
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold">
            Selected Files
          </h3>

          <ul className="space-y-3">
            {selectedFiles.map((file) => (
              <li
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="font-medium">
                    {file.name}
                  </p>

                  <p className="text-sm text-text-secondary">
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <Button
              loading={uploading}
              onClick={handleUpload}
            >
              Upload Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}