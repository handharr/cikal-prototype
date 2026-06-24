"use client";

/**
 * Dropzone-style file picker (visual). Reports the selected file name; the
 * prototype does not upload or persist the file.
 */
export function FileDropzone({
  label,
  hint,
  accept,
  fileName,
  onFileChange,
}: {
  label: string;
  hint?: string;
  accept?: string;
  fileName: string | null;
  onFileChange: (fileName: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[var(--radius)] border border-dashed border-[var(--border)] px-4 py-14 text-center hover:bg-[var(--muted)]">
        <span className="font-medium">{label}</span>
        {hint && <span className="typo-label text-[var(--muted-foreground)]">{hint}</span>}
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files?.[0]?.name ?? null)}
        />
      </label>
      {fileName && (
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--border)] px-3 py-2">
          <span className="typo-label truncate">{fileName}</span>
          <button
            type="button"
            className="typo-label shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            onClick={() => onFileChange(null)}
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}
