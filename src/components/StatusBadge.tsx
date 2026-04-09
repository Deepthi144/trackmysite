import { ChangeStatus } from "@/lib/types";
import { statusLabel } from "@/lib/simulation";

const styles: Record<ChangeStatus, string> = {
  "no-change": "bg-status-none-bg text-status-none",
  "minor-change": "bg-status-minor-bg text-status-minor",
  "major-change": "bg-status-major-bg text-status-major",
};

export default function StatusBadge({ status }: { status: ChangeStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse-dot ${
        status === "no-change" ? "bg-status-none" : status === "minor-change" ? "bg-status-minor" : "bg-status-major"
      }`} />
      {statusLabel(status)}
    </span>
  );
}
