"use client";

import * as React from "react";
import {
  Building2,
  Check,
  FileText,
  Save,
  School,
  Settings2,
  Sliders,
  Sparkles,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Segmented } from "@/components/ui/segmented";
import { Sheet } from "@/components/ui/sheet";
import { activePeriod, school, teacher } from "@/lib/mock/teacher-data";

export function SettingsView() {
  const [tab, setTab] = React.useState<"profile" | "school" | "grading" | "ai">(
    "profile",
  );
  const [savedNotice, setSavedNotice] = React.useState(false);

  // Form states initialized with mock data
  const [teacherState, setTeacherState] = React.useState(teacher);
  const [schoolState, setSchoolState] = React.useState(school);
  const [curriculum, setCurriculum] = React.useState("Kurikulum Merdeka");
  const [kkm, setKkm] = React.useState(75);
  const [knowledgeWeight, setKnowledgeWeight] = React.useState(60);
  const [skillsWeight, setSkillsWeight] = React.useState(40);
  const [aiTone, setAiTone] = React.useState("formal");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented
          value={tab}
          onChange={setTab}
          label="Menu pengaturan"
          options={[
            { value: "profile", label: "Profil Guru" },
            { value: "school", label: "Identitas Sekolah" },
            { value: "grading", label: "Standar Penilaian" },
            { value: "ai", label: "Preferensi AI" },
          ]}
        />

        <div className="flex items-center gap-2">
          {savedNotice ? (
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-tuntas">
              <Check className="size-4" /> Pengaturan tersimpan (lokal)
            </span>
          ) : null}
          <Button variant="solid" onClick={handleSave}>
            <Save aria-hidden />
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {tab === "profile" && (
        <Sheet className="p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-paper text-ink font-serif text-[18px] font-medium border border-rule">
              {teacherState.initials}
            </div>
            <div>
              <h3 className="font-serif text-[18px] font-medium text-ink">
                Informasi Guru & Akun
              </h3>
              <p className="text-[13px] text-muted">
                Data identitas yang akan tercantum pada berkas naskah soal, kop ujian, dan tanda tangan raport.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid gap-5 sm:grid-cols-2">
            <Field label="Nama Lengkap & Gelar">
              <Input
                value={teacherState.name}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, name: e.target.value })
                }
              />
            </Field>

            <Field label="Nomor Induk Pegawai (NIP)">
              <Input
                value={teacherState.nip}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, nip: e.target.value })
                }
              />
            </Field>

            <Field label="Mata Pelajaran Utama">
              <Input
                value={teacherState.subject}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, subject: e.target.value })
                }
              />
            </Field>

            <Field label="Tugas Tambahan / Wali Kelas">
              <Input
                value={teacherState.homeroom || ""}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, homeroom: e.target.value })
                }
              />
            </Field>

            <Field label="Alamat Email Dinas / Akun">
              <Input
                type="email"
                value={teacherState.email}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, email: e.target.value })
                }
              />
            </Field>

            <Field label="Nomor Telepon / WhatsApp">
              <Input
                value={teacherState.phone}
                onChange={(e) =>
                  setTeacherState({ ...teacherState, phone: e.target.value })
                }
              />
            </Field>
          </form>
        </Sheet>
      )}

      {tab === "school" && (
        <Sheet className="p-6">
          <div className="mb-6">
            <h3 className="font-serif text-[18px] font-medium text-ink">
              Data Satuan Pendidikan (Kop & Legalitas)
            </h3>
            <p className="text-[13px] text-muted">
              Identitas resmi instansi untuk cetak kop surat naskah ujian dan buku raport siswa.
            </p>
          </div>

          <form onSubmit={handleSave} className="grid gap-5 sm:grid-cols-2">
            <Field label="Nama Satuan Pendidikan" className="sm:col-span-2">
              <Input
                value={schoolState.name}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, name: e.target.value })
                }
              />
            </Field>

            <Field label="Nomor Pokok Sekolah Nasional (NPSN)">
              <Input
                value={schoolState.npsn}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, npsn: e.target.value })
                }
              />
            </Field>

            <Field label="Nomor Telepon Sekolah">
              <Input
                value={schoolState.phone}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, phone: e.target.value })
                }
              />
            </Field>

            <Field label="Alamat Lengkap Sekolah" className="sm:col-span-2">
              <Input
                value={schoolState.address}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, address: e.target.value })
                }
              />
            </Field>

            <Field label="Kota / Kabupaten">
              <Input
                value={schoolState.city}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, city: e.target.value })
                }
              />
            </Field>

            <Field label="Provinsi">
              <Input
                value={schoolState.province}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, province: e.target.value })
                }
              />
            </Field>

            <Field label="Nama Kepala Sekolah">
              <Input
                value={schoolState.principal}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, principal: e.target.value })
                }
              />
            </Field>

            <Field label="NIP Kepala Sekolah">
              <Input
                value={schoolState.principalNip}
                onChange={(e) =>
                  setSchoolState({ ...schoolState, principalNip: e.target.value })
                }
              />
            </Field>
          </form>

          {/* Kop Preview */}
          <div className="mt-8 border-t border-rule-soft pt-5">
            <h4 className="text-[13px] font-medium text-ink">
              Pratinjau Kop Surat Resmi
            </h4>
            <div className="mt-3 rounded-[var(--radius-control)] border border-rule bg-paper/40 p-6 text-center">
              <p className="text-[12px] font-medium tracking-wide uppercase text-muted">
                Pemerintah Provinsi {schoolState.province} · Dinas Pendidikan
              </p>
              <h4 className="font-serif text-[18px] font-bold text-ink uppercase tracking-wider mt-1">
                {schoolState.name}
              </h4>
              <p className="text-[12px] text-muted mt-0.5">
                {schoolState.address}, {schoolState.city} {schoolState.postalCode} · Telp: {schoolState.phone} · NPSN: {schoolState.npsn}
              </p>
              <div className="mt-3 border-b-2 border-t border-ink my-2 h-1" />
            </div>
          </div>
        </Sheet>
      )}

      {tab === "grading" && (
        <Sheet className="p-6">
          <div className="mb-6">
            <h3 className="font-serif text-[18px] font-medium text-ink">
              Formula & Kebijakan Penilaian Raport
            </h3>
            <p className="text-[13px] text-muted">
              Aturan perhitungan nilai akhir semester, kriteria ketuntasan (KKM/KKTP), dan bobot aspek penilaian.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kurikulum Acuan">
              <Select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
              >
                <option value="Kurikulum Merdeka">Kurikulum Merdeka (2024)</option>
                <option value="Kurikulum 2013">Kurikulum 2013 (K13 Revisi)</option>
              </Select>
            </Field>

            <Field label="Tahun Ajaran & Semester Aktif">
              <Input
                value={`${activePeriod.academicYear} · Semester ${activePeriod.semester} (Ganjil)`}
                disabled
              />
            </Field>

            <Field label="Kriteria Ketuntasan Minimal (KKM / KKTP)">
              <Input
                type="number"
                value={kkm}
                onChange={(e) => setKkm(Number(e.target.value))}
                min={50}
                max={100}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Bobot Pengetahuan (%)">
                <Input
                  type="number"
                  value={knowledgeWeight}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setKnowledgeWeight(val);
                    setSkillsWeight(100 - val);
                  }}
                  min={0}
                  max={100}
                />
              </Field>

              <Field label="Bobot Keterampilan (%)">
                <Input
                  type="number"
                  value={skillsWeight}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSkillsWeight(val);
                    setKnowledgeWeight(100 - val);
                  }}
                  min={0}
                  max={100}
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 border-t border-rule-soft pt-4">
            <h4 className="text-[12.5px] font-medium text-faint">
              Skala Rentang Predikat Otomatis:
            </h4>
            <div className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-4 text-[12.5px]">
              <div className="rounded-[var(--radius-control)] bg-paper/60 p-2.5">
                <span className="font-semibold text-tuntas">Predikat A (Sangat Baik)</span>
                <p className="mt-0.5 text-muted figures">Nilai 90 – 100</p>
              </div>
              <div className="rounded-[var(--radius-control)] bg-paper/60 p-2.5">
                <span className="font-semibold text-ink">Predikat B (Baik)</span>
                <p className="mt-0.5 text-muted figures">Nilai 80 – 89</p>
              </div>
              <div className="rounded-[var(--radius-control)] bg-paper/60 p-2.5">
                <span className="font-semibold text-amber-700">Predikat C (Cukup)</span>
                <p className="mt-0.5 text-muted figures">Nilai {kkm} – 79</p>
              </div>
              <div className="rounded-[var(--radius-control)] bg-paper/60 p-2.5">
                <span className="font-semibold text-mark">Predikat D (Perlu Bimbingan)</span>
                <p className="mt-0.5 text-muted figures">Nilai &lt; {kkm}</p>
              </div>
            </div>
          </div>
        </Sheet>
      )}

      {tab === "ai" && (
        <Sheet className="p-6">
          <div className="mb-6">
            <h3 className="font-serif text-[18px] font-medium text-ink">
              Preferensi Asisten AI Guru
            </h3>
            <p className="text-[13px] text-muted">
              Sesuaikan karakteristik gaya bahasa narasi raport, standar tingkat kesukaran soal, dan perlindungan privasi siswa.
            </p>
          </div>

          <div className="space-y-5">
            <Field label="Gaya Bahasa Narasi Capaian Raport">
              <Select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
              >
                <option value="formal">
                  Formal Edukatif (Sesuai panduan resmi Kemendikbudristek)
                </option>
                <option value="motivational">
                  Afirmatif & Penuh Motivasi (Mendorong potensi siswa)
                </option>
                <option value="concise">
                  Ringkas & Langsung ke Target Capaian (To-the-point)
                </option>
              </Select>
            </Field>

            <div className="rounded-[var(--radius-control)] border border-rule-soft bg-paper/40 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="size-4.5 text-mark shrink-0 mt-0.5" />
                <div className="text-[13px]">
                  <p className="font-medium text-ink">
                    Prinsip Privasi & Keamanan Data Siswa (PRD §30)
                  </p>
                  <p className="mt-1 text-muted leading-relaxed">
                    AI Student tidak pernah membagikan identitas pribadi siswa (NIK/NISN) ke model pihak ketiga tanpa anonimisasi. Seluruh instruksi pembuatan soal dan narasi raport dieksekusi secara terisolasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sheet>
      )}

      <PlannedNote>
        Sinkronisasi otomatis dengan Dapodik / e-Rapor Kemendikbudristek dan integrasi SSO Akun Belajar.id akan tersedia pada tahap peluncuran integrasi nasional.
      </PlannedNote>
    </div>
  );
}
