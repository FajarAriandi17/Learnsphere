import type { Metadata } from "next";

import { ChatWorkspace } from "@/components/ai/chat-workspace";

export const metadata: Metadata = {
  title: "AI Buat Soal",
  description:
    "Minta soal ujian sesuai kurikulum, jenjang, dan materi, lalu periksa dan ubah sebelum dipakai.",
};

export default function AiPage() {
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col">
      <ChatWorkspace />
    </div>
  );
}
