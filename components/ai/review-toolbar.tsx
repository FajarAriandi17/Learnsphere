import * as React from "react";
import { Download, Library, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Floating toolbar for the question review screen.
 * Keeps actions (Save to bank, Download) accessible while reviewing.
 */
export function ReviewToolbar({
  questionCount,
  onSaveToBank,
  onDownload,
}: {
  questionCount: number;
  onSaveToBank: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="sticky bottom-6 z-30 flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-full border border-rule bg-sheet/95 px-5 py-2.5 shadow-float backdrop-blur-md">
        <span className="text-[13px] font-medium text-ink">
          {questionCount} soal siap
        </span>
        <span aria-hidden className="mx-2 h-4 w-px bg-rule" />
        <Button size="sm" variant="quiet" onClick={onSaveToBank}>
          <Library className="size-4" />
          Simpan
        </Button>
        <Button size="sm" variant="solid" onClick={onDownload}>
          <Download className="size-4" />
          Unduh
        </Button>
      </div>
    </div>
  );
}
