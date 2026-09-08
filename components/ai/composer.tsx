"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { difficultyLabel, questionTypeLabel } from "@/lib/format";
import type { GenerationContext } from "@/types";

export function Composer({
  context,
  pending,
  onSend,
}: {
  context: GenerationContext;
  pending: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = React.useState("");
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const grow = React.useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 200)}px`;
  }, []);

  const send = () => {
    const value = text.trim();
    if (!value || pending) return;
    onSend(value);
    setText("");
    requestAnimationFrame(grow);
  };

  const creditEstimation = context.count;
  const isOverLimit = creditEstimation > 50; // PRD §16 MAX_PER_REQUEST is 50

  return (
    <div className="sticky bottom-0 border-t border-rule bg-paper/92 pt-3 pb-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] text-muted">
          Akan dibuat: {context.count} soal{" "}
          {context.types.map((t) => questionTypeLabel[t].toLowerCase()).join(" dan ")}{" "}
          tingkat {difficultyLabel[context.difficulty].toLowerCase()} — {context.subject},{" "}
          {context.topic || "materi belum dipilih"}
        </p>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
            isOverLimit
              ? "bg-blush text-blush-ink"
              : "bg-lemon text-lemon-ink"
          )}
        >
          <span className="size-1.5 rounded-full bg-current opacity-40" />
          Estimasi: {creditEstimation} kredit
        </div>
      </div>

      <div className="flex items-end gap-2 rounded-[var(--radius-control)] border border-rule bg-sheet p-2 focus-within:border-ink/40">
        <textarea
          ref={ref}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            grow();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Minta soal, misal: buat 20 soal pilihan ganda Teorema Pythagoras tingkat sedang"
          aria-label="Pesan untuk asisten"
          className="max-h-[200px] min-h-9 flex-1 resize-none bg-transparent px-1.5 py-1.5 text-[14px] leading-relaxed text-ink outline-none"
        />
        <Button
          variant="solid"
          size="icon"
          onClick={send}
          disabled={pending || text.trim().length === 0}
        >
          {pending ? (
            <div className="flex gap-0.5">
              <span className="dot size-1 rounded-full bg-current" />
              <span className="dot size-1 rounded-full bg-current" />
              <span className="dot size-1 rounded-full bg-current" />
            </div>
          ) : (
            <ArrowUp aria-hidden />
          )}
          <span className="sr-only">{pending ? "Memproses..." : "Kirim"}</span>
        </Button>
      </div>

      <p className="mt-2 text-[11.5px] text-faint">
        Enter untuk kirim, Shift + Enter untuk baris baru. Setiap soal memakai satu
        kredit AI.
      </p>
    </div>
  );
}
