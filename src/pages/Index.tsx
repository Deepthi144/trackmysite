import { useState, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Activity, History, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";
import SiteCard from "@/components/SiteCard";
import HistoryTable from "@/components/HistoryTable";
import { TrackedSite, HistoryEntry } from "@/lib/types";
import {
  DEMO_SITES,
  DEMO_HISTORY,
  DEMO_URLS,
  randomStatus,
  createSite,
  createHistoryEntry,
  statusLabel,
} from "@/lib/simulation";

export default function Index() {
  const [sites, setSites] = useState<TrackedSite[]>(DEMO_SITES);
  const [history, setHistory] = useState<HistoryEntry[]>(DEMO_HISTORY);
  const [url, setUrl] = useState("");
  const [checkingId, setCheckingId] = useState<string | null>(null);

  const addSite = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const full = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const site = createSite(full);
    setSites((s) => [site, ...s]);
    setHistory((h) => [createHistoryEntry(site), ...h]);
    setUrl("");
    if (site.status === "major-change") {
      toast.error(`🚨 Major Change detected on ${full}`);
    } else {
      toast.success(`Tracking ${full} — ${statusLabel(site.status)}`);
    }
  }, [url]);

  const checkSite = useCallback((id: string) => {
    setCheckingId(id);
    setTimeout(() => {
      const newStatus = randomStatus();
      setSites((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: newStatus, lastChecked: new Date() } : s
        )
      );
      const site = sites.find((s) => s.id === id);
      if (site) {
        const entry: HistoryEntry = {
          id: String(Date.now()),
          siteId: id,
          url: site.url,
          status: newStatus,
          checkedAt: new Date(),
        };
        setHistory((h) => [entry, ...h]);
        if (newStatus === "major-change") {
          toast.error(`🚨 Major Change detected on ${site.url}`);
        }
      }
      setCheckingId(null);
    }, 800 + Math.random() * 700);
  }, [sites]);

  const stats = {
    total: sites.length,
    noChange: sites.filter((s) => s.status === "no-change").length,
    minor: sites.filter((s) => s.status === "minor-change").length,
    major: sites.filter((s) => s.status === "major-change").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5" />
            <h1 className="text-lg font-semibold tracking-tight">ChangeDetect</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* URL Input */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card p-6 space-y-4"
        >
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Track a Website
          </h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter website URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSite()}
              className="font-mono text-sm"
            />
            <Button onClick={addSite} className="gap-1.5 shrink-0">
              <Plus className="h-4 w-4" /> Track
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_URLS.map((d) => (
              <Button
                key={d.url}
                variant="outline"
                size="sm"
                onClick={() => setUrl(d.url)}
                className="text-xs"
              >
                {d.label}
              </Button>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Tracked", value: stats.total, icon: Activity },
            { label: "No Change", value: stats.noChange, color: "text-status-none" },
            { label: "Minor Changes", value: stats.minor, color: "text-status-minor" },
            { label: "Major Changes", value: stats.major, color: "text-status-major" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border bg-card p-4"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${"color" in s ? s.color : ""}`}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Site Cards */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4" /> Monitored Sites
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {sites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  onCheck={checkSite}
                  checking={checkingId === site.id}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* History */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <History className="h-4 w-4" /> Check History
          </h2>
          <HistoryTable history={history} />
        </section>
      </main>
    </div>
  );
}
