import { HistoryEntry } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryTable({ history }: { history: HistoryEntry[] }) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Checked At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                No history yet
              </TableCell>
            </TableRow>
          )}
          {history.map((h) => (
            <TableRow key={h.id}>
              <TableCell className="font-mono text-xs">{h.url}</TableCell>
              <TableCell><StatusBadge status={h.status} /></TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                {h.checkedAt.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
