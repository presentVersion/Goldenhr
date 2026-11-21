import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chip, ChipVariant } from "@/components/ui/chip"

export interface UploadedFileItem {
  id: string
  name: string
  size: number
  type: string
  status: ChipVariant
  aiFlag?: string
}

interface UploadDropzoneProps {
  onFilesAccepted: (files: File[]) => void
  uploadedFiles?: UploadedFileItem[]
  onRemoveFile?: (id: string) => void
  acceptText?: string
  maxFiles?: number
  disabled?: boolean
  className?: string
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFilesAccepted,
  uploadedFiles = [],
  onRemoveFile,
  acceptText,
  disabled = false,
  className,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled,
  })

  return (
    <div className={cn("space-y-3 w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-6 min-h-[160px] rounded-card border-2 border-dashed border-border transition-colors cursor-pointer text-center bg-surface hover:bg-navy-100/20",
          isDragActive && "border-teal-500 bg-teal-50/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="h-12 w-12 rounded-full bg-navy-100/70 flex items-center justify-center text-navy-700 mb-2">
          <Upload className="h-6 w-6 text-navy-700" />
        </div>
        <p className="text-body font-semibold text-navy-700">
          <span className="md:hidden">Tap to add</span>
          <span className="hidden md:inline">Drop files or browse</span>
        </p>
        <p className="text-micro text-text-muted mt-1">
          {acceptText || "PDF, JPG, PNG up to 10 MB. No Aadhaar stored."}
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-3 p-3 rounded-btn border border-border bg-surface text-navy-700 text-small shadow-e1"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {file.type.includes("pdf") ? (
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-teal-500 flex-shrink-0" />
                )}
                <div className="truncate">
                  <div className="font-medium truncate">{file.name}</div>
                  <div className="text-micro text-text-muted">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {file.aiFlag && (
                  <Chip variant="ai" label={file.aiFlag} />
                )}
                <Chip variant={file.status} label={file.status} />
                {onRemoveFile && (
                  <button
                    type="button"
                    onClick={() => onRemoveFile(file.id)}
                    className="p-1 rounded-full text-text-muted hover:text-red-600 hover:bg-red-600/10 transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
