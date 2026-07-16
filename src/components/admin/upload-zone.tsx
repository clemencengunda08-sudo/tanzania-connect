"use client";

import { useState, useRef, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadFile } from "@/lib/upload";
import type { MediaCategory } from "@/types";
import { Spinner } from "@/components/spinner";

interface UploadZoneProps {
  category: MediaCategory;
  onUploadComplete?: (url: string) => void;
  maxSize?: number; // MB
  accept?: string;
}

interface FileUpload {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
  error?: string;
  preview?: string;
}

export function UploadZone({
  category,
  onUploadComplete,
  maxSize = 10,
  accept = "image/*,application/pdf",
}: UploadZoneProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (newFiles: File[]): Promise<void> => {
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name} exceeds ${maxSize}MB limit`);
        return false;
      }
      return true;
    });

    const fileUploads: FileUpload[] = await Promise.all(
      validFiles.map(async (file) => {
        let preview: string | undefined;
        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }
        return {
          file,
          progress: 0,
          status: "pending" as const,
          preview,
        };
      })
    );

    const currentFilesCount = files.length;
    setFiles((prev) => [...prev, ...fileUploads]);

    for (let i = 0; i < fileUploads.length; i++) {
      const globalIndex = currentFilesCount + i;

      setFiles((prev) =>
        prev.map((f, idx) => (idx === globalIndex ? { ...f, status: "uploading" } : f))
      );

      const result = await uploadFile(
        fileUploads[i].file,
        category,
        fileUploads[i].file.name.split(".")[0],
        (progress) => {
          setFiles((prev) =>
            prev.map((f, idx) => (idx === globalIndex ? { ...f, progress } : f))
          );
        }
      );

      setFiles((prev) =>
        prev.map((f, idx) =>
          idx === globalIndex
            ? {
                ...f,
                status: result.success ? "success" : "error",
                url: result.url,
                error: result.error,
                progress: 100,
              }
            : f
        )
      );

      if (result.success && result.url) {
        onUploadComplete?.(result.url);
      }
    }
  };

  const removeFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed 
          rounded-3xl p-12 text-center cursor-pointer
          transition-all duration-300
          ${dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
          }
        `}
      >
        <input ref={inputRef} type="file" multiple accept={accept} onChange={handleSelect} className="hidden" />

        <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }} className="text-6xl mb-4">
          {dragActive ? "📥" : "📤"}
        </motion.div>

        <h3 className="text-lg font-bold mb-2">{dragActive ? "Drop files here!" : "Drag & drop files"}</h3>
        <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>

        <div className="inline-flex items-center gap-4 text-xs text-muted-foreground">
          <span>📷 Images</span>
          <span>📄 PDFs</span>
          <span>Max {maxSize}MB</span>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Uploads ({files.length})</h4>

            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background flex items-center justify-center shrink-0">
                  {file.preview ? (
                    <img src={file.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">📄</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {file.status === "uploading" && (
                    <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${file.progress}%` }} className="h-full gradient-tanzania" />
                    </div>
                  )}
                  {file.error && <p className="text-xs text-destructive mt-1">{file.error}</p>}
                </div>

                <div className="shrink-0">
                  {file.status === "uploading" && <Spinner size="sm" />}
                  {file.status === "success" && <span className="text-2xl">✅</span>}
                  {file.status === "error" && <span className="text-2xl">❌</span>}
                </div>

                <button onClick={() => removeFile(index)} className="text-muted-foreground hover:text-destructive transition-colors text-xl">
                  ×
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
