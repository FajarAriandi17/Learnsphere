"use client";

import { CircleAlert, RotateCw, Sparkles } from "lucide-react";

import { SoalSheet } from "@/components/ai/soal-sheet";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/format";
import type { ChatMessage, Question } from "@/types";

function Dots() {
  return (
    <span aria-hidden className="inline-flex gap-1 pb-0.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="dot size-1 rounded-full bg-muted" />
      ))}
    </span>
  );
}

export function Message({
  message,
  revealCount,
  onQuestionsChange,
  onRetry,
  retryLabel,
}: {
  message: ChatMessage;
  revealCount?: number;
  onQuestionsChange?: (questions: Question[]) => void;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  if (message.role === "teacher") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-[var(--radius-sheet)] bg-ink/[0.055] px-3.5 py-2.5">
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap text-ink">
            {message.body}
          </p>
          <p className="mt-1 text-right text-[11px] text-faint">
            {formatTime(message.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  const writing = message.status === "writing";
  const total = message.questions?.length ?? 0;
  const shown = writing ? Math.min(revealCount ?? 0, total) : total;

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Sparkles aria-hidden className="size-3.5 text-mark" />
        <p className="text-[12px] font-semibold text-ink">Learnsphere AI</p>
        {writing ? (
          <>
            <span className="text-[12px] text-muted">
              {total > 0 && shown > 0
                ? `menyusun soal ${shown} dari ${total}`
                : "menyiapkan soal"}
            </span>
            <Dots />
          </>
        ) : null}
      </div>

      {message.status === "failed" ? (
        <div className="border-l-2 border-mark bg-mark-tint/50 px-3.5 py-3">
          <p className="flex gap-2 text-[13.5px] leading-relaxed text-ink">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-mark" />
            {message.body}
          </p>
          {onRetry ? (
            <Button variant="outline" size="sm" onClick={onRetry} className="mt-3">
              <RotateCw aria-hidden />
              {retryLabel ?? "Coba lagi"}
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          {message.body ? (
            <p className="mb-3 max-w-[68ch] text-[14px] leading-relaxed text-ink-soft">
              {message.body}
            </p>
          ) : null}

          {message.questions && message.context && shown > 0 ? (
            <SoalSheet
              questions={message.questions}
              context={message.context}
              visible={writing ? shown : undefined}
              onChange={writing ? undefined : onQuestionsChange}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
