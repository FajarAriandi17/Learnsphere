import { Badge } from "@/components/ui/badge";
import { EmptyRow } from "@/components/ui/empty-state";
import { PlannedAction } from "@/components/ui/planned";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableScroll,
} from "@/components/ui/table";
import { formatShortDate } from "@/lib/format";
import type { DocumentStatus, GeneratedDocument } from "@/types";

export const documentStatusLabel: Record<DocumentStatus, string> = {
  siap: "Siap",
  diproses: "Diproses",
  gagal: "Gagal",
};

export const documentStatusTone = {
  siap: "tuntas",
  diproses: "amber",
  gagal: "mark",
} as const;

/**
 * The archive row, shared by /documents and the student profile. No hooks, so
 * the filtering shell on /documents can stay a client component around it.
 */
export function DocumentTable({
  documents,
  showContext = true,
  emptyTitle = "Belum ada dokumen",
  emptyDescription = "Dokumen yang Anda hasilkan dari soal, raport, absensi, atau portofolio akan tersimpan di sini.",
}: {
  documents: GeneratedDocument[];
  showContext?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const span = showContext ? 6 : 5;

  return (
    <TableScroll>
      <Table>
        <THead>
          <tr>
            <TH>Dokumen</TH>
            <TH>Format</TH>
            {showContext ? <TH>Cakupan</TH> : null}
            <TH numeric>Ukuran</TH>
            <TH>Status</TH>
            <TH numeric>Dibuat</TH>
          </tr>
        </THead>
        <TBody>
          {documents.length === 0 ? (
            <EmptyRow
              span={span}
              title={emptyTitle}
              description={emptyDescription}
            />
          ) : (
            documents.map((doc) => (
              <TR key={doc.id}>
                <TD className="min-w-56">
                  <span className="block font-medium text-ink">{doc.name}</span>
                  <span className="text-[12px] text-faint">{doc.kind}</span>
                </TD>
                <TD className="whitespace-nowrap">{doc.format}</TD>
                {showContext ? (
                  <TD className="whitespace-nowrap text-muted">{doc.context}</TD>
                ) : null}
                <TD numeric className="whitespace-nowrap">
                  {doc.size}
                </TD>
                <TD>
                  <span className="flex items-center gap-2">
                    <Badge tone={documentStatusTone[doc.status]}>
                      {documentStatusLabel[doc.status]}
                    </Badge>
                    {doc.status === "gagal" ? (
                      <PlannedAction
                        size="sm"
                        variant="quiet"
                        reason="Layanan dokumen belum tersambung"
                      >
                        Buat ulang
                      </PlannedAction>
                    ) : null}
                  </span>
                </TD>
                <TD numeric className="whitespace-nowrap">
                  {formatShortDate(doc.createdAt, true)}
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </TableScroll>
  );
}
