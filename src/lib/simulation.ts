import { ChangeStatus, TrackedSite, HistoryEntry } from "./types";

let idCounter = 100;
const uid = () => String(++idCounter);

export function randomStatus(): ChangeStatus {
  const r = Math.random();
  if (r < 0.4) return "no-change";
  if (r < 0.75) return "minor-change";
  return "major-change";
}

export function statusLabel(s: ChangeStatus) {
  return s === "no-change" ? "No Change" : s === "minor-change" ? "Minor Change" : "Major Change";
}

const pastDate = (minsAgo: number) => new Date(Date.now() - minsAgo * 60000);

export const DEMO_SITES: TrackedSite[] = [
  { id: "1", url: "https://www.amazon.com", status: "minor-change", lastChecked: pastDate(12), label: "Amazon" },
  { id: "2", url: "https://news.ycombinator.com", status: "major-change", lastChecked: pastDate(5), label: "Hacker News" },
  { id: "3", url: "https://www.mit.edu", status: "no-change", lastChecked: pastDate(45), label: "MIT" },
];

export const DEMO_HISTORY: HistoryEntry[] = [
  { id: "h1", siteId: "1", url: "https://www.amazon.com", status: "no-change", checkedAt: pastDate(120) },
  { id: "h2", siteId: "2", url: "https://news.ycombinator.com", status: "minor-change", checkedAt: pastDate(90) },
  { id: "h3", siteId: "1", url: "https://www.amazon.com", status: "major-change", checkedAt: pastDate(60) },
  { id: "h4", siteId: "3", url: "https://www.mit.edu", status: "no-change", checkedAt: pastDate(30) },
  { id: "h5", siteId: "2", url: "https://news.ycombinator.com", status: "major-change", checkedAt: pastDate(15) },
];

export const DEMO_URLS: { label: string; url: string }[] = [
  { label: "Amazon Demo", url: "https://www.amazon.com" },
  { label: "News Website Demo", url: "https://news.ycombinator.com" },
  { label: "College Website Demo", url: "https://www.mit.edu" },
];

export function createSite(url: string): TrackedSite {
  return { id: uid(), url, status: randomStatus(), lastChecked: new Date() };
}

export function createHistoryEntry(site: TrackedSite): HistoryEntry {
  return { id: uid(), siteId: site.id, url: site.url, status: site.status, checkedAt: site.lastChecked };
}
