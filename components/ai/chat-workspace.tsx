"use client";

import * as React from "react";

import { Composer } from "@/components/ai/composer";
import { ContextPanel } from "@/components/ai/context-panel";
import { Message } from "@/components/ai/message";
import { Starters } from "@/components/ai/starters";
import { Sheet } from "@/components/ui/sheet";
import { MAX_PER_REQUEST, applyIntent, validate } from "@/lib/mock/intent";
import { generateQuestions } from "@/lib/mock/soal-generator";
import type { ChatMessage, GenerationContext, Question } from "@/types";

const initialContext: GenerationContext = {
  level: "SMP",
  grade: "8",
  className: "VIII-A",
  subject: "Matematika",
  curriculum: "Kurikulum Merdeka",
  academicYear: "2026/2027",
  semester: "1",
  topic: "Teorema Pythagoras",
  count: 20,
  types: ["multiple_choice"],
  difficulty: "sedang",
};

interface RetryPlan {
  text: string;
  count: number;
  label: string;
}

export function ChatWorkspace() {
  const [context, setContext] = React.useState(initialContext);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [stream, setStream] = React.useState<{
    id: string;
    revealed: number;
    total: number;
  } | null>(null);
  const [retries, setRetries] = React.useState<Record<string, RetryPlan>>({});
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length]);

  // Paces the reveal so soal land on the sheet one after another.
  React.useEffect(() => {
    if (!stream) return;
    if (stream.revealed >= stream.total) {
      const id = stream.id;
      const done = window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: "done" } : m)),
        );
        setStream(null);
      }, 240);
      return () => window.clearTimeout(done);
    }
    const step = Math.max(1, Math.round(stream.total / 16));
    const tick = window.setTimeout(
      () =>
        setStream((s) =>
          s ? { ...s, revealed: Math.min(s.total, s.revealed + step) } : s,
        ),
      stream.revealed === 0 ? 620 : 130,
    );
    return () => window.clearTimeout(tick);
  }, [stream]);

  const run = (text: string, countOverride?: number) => {
    // Stop any existing stream before running a new request
    setStream(null);

    const stamp = Date.now();
    const parsed = applyIntent(text, context);
    console.log("Parsed context:", parsed);
    const next = countOverride ? { ...parsed, count: countOverride } : parsed;
    setContext(next);

    const teacherMessage: ChatMessage = {
      id: `t-${stamp}`,
      role: "teacher",
      body: text,
      status: "done",
      createdAt: new Date().toISOString(),
    };
    const assistantId = `a-${stamp}`;
    const reason = validate(next);

    if (reason) {
      setMessages((prev) => [
        ...prev,
        teacherMessage,
        {
          id: assistantId,
          role: "assistant",
          body: reason,
          status: "failed",
          createdAt: new Date().toISOString(),
        },
      ]);
      if (next.count > MAX_PER_REQUEST) {
        setRetries((prev) => ({
          ...prev,
          [assistantId]: {
            text,
            count: MAX_PER_REQUEST,
            label: `Buat ${MAX_PER_REQUEST} soal saja`,
          },
        }));
      }
      return;
    }

    // Swap this for the generation request; the shape it returns is the same.
    const questions = generateQuestions(next, messages.length);

    setMessages((prev) => [
      ...prev,
      teacherMessage,
      {
        id: assistantId,
        role: "assistant",
        body: `Saya susun ${next.count} soal ${next.subject.toLowerCase()} tentang ${next.topic.toLowerCase()} untuk kelas ${next.className}. Periksa dan ubah bagian yang perlu sebelum dipakai.`,
        questions,
        context: next,
        status: "writing",
        createdAt: new Date().toISOString(),
      },
    ]);
    setStream({ id: assistantId, revealed: 0, total: questions.length });
  };

  const updateQuestions = (id: string, questions: Question[]) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, questions } : m)),
    );

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 sm:px-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <details className="mt-4 lg:hidden">
          <summary className="cursor-pointer rounded-[var(--radius-control)] border border-rule bg-sheet px-3.5 py-2.5 text-[13px] text-ink-soft">
            Konteks kelas — {context.subject}, kelas {context.className}
          </summary>
          <Sheet className="mt-2 overflow-hidden">
            <ContextPanel value={context} onChange={setContext} />
          </Sheet>
        </details>

        {messages.length === 0 ? (
          <Starters onPick={run} />
        ) : (
          <div className="space-y-7 pt-6 pb-8">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                revealCount={stream?.id === message.id ? stream.revealed : undefined}
                onQuestionsChange={(questions) =>
                  updateQuestions(message.id, questions)
                }
                onRetry={
                  retries[message.id]
                    ? () =>
                        run(retries[message.id].text, retries[message.id].count)
                    : undefined
                }
                retryLabel={retries[message.id]?.label}
              />
            ))}
          </div>
        )}

        <div ref={endRef} className="scroll-mb-44" />
        <div className="mt-auto">
          <Composer context={context} pending={Boolean(stream)} onSend={run} />
        </div>
      </div>

      <aside className="hidden w-[19rem] shrink-0 lg:block">
        <div className="sticky top-14 pt-6">
          <div className="ledger-heading mb-3">
            <h2 className="font-serif text-[17px] leading-none font-medium">
              Konteks kelas
            </h2>
          </div>
          <Sheet className="overflow-hidden">
            <ContextPanel value={context} onChange={setContext} />
          </Sheet>
          <p className="mt-3 text-[11.5px] leading-relaxed text-faint">
            Pilihan di sini dikirim bersama permintaan Anda supaya soal terikat
            pada kurikulum, jenjang, dan materi yang benar.
          </p>
        </div>
      </aside>
    </div>
  );
}
