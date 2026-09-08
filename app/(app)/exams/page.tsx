import { getExams, getBankItems } from "@/app/actions/exams";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { BankList } from "@/components/exams/bank-list";
import { ExamList } from "@/components/exams/exam-list";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { activePeriod } from "@/lib/mock/teacher-data";

export const metadata = {
  title: "Bank Soal",
  description: "Paket ujian dan soal tersimpan.",
};

export default async function ExamsPage() {
  const [exams, bankItems] = await Promise.all([getExams(), getBankItems()]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={`Semester ${activePeriod.semester} · ${activePeriod.academicYear}`}
        title="Bank Soal"
        description="Setiap paket yang pernah dibuat tersimpan lengkap dengan kunci jawabannya, siap dipakai ulang atau diekspor kembali."
        action={
          <Button asChild variant="solid">
            <Link href="/ai">
              <Sparkles aria-hidden />
              Buat soal baru
            </Link>
          </Button>
        }
      />

      <div className="space-y-9">
        <Section id="packages" title="Paket ujian">
          <ExamList exams={exams} />
        </Section>

        <Section
          id="items"
          title="Soal lepas"
          note="Soal yang disimpan satu per satu, lepas dari paketnya, agar bisa disusun ulang menjadi paket baru."
        >
          <BankList items={bankItems} />
        </Section>
      </div>
    </div>
  );
}
