import { TrackedSite } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  site: TrackedSite;
  onCheck: (id: string) => void;
  checking: boolean;
}

export default function SiteCard({ site, onCheck, checking }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-5 flex flex-col gap-4 transition-colors hover:border-foreground/20"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="font-mono text-sm truncate">{site.url}</span>
        </div>
        <StatusBadge status={site.status} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Last checked: {site.lastChecked.toLocaleTimeString()}
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onCheck(site.id)}
          disabled={checking}
          className="gap-1.5"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${checking ? "animate-spin" : ""}`} />
          Check Now
        </Button>
      </div>
    </motion.div>
  );
}
