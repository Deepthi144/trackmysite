export type ChangeStatus = "no-change" | "minor-change" | "major-change";

export interface TrackedSite {
  id: string;
  url: string;
  status: ChangeStatus;
  lastChecked: Date;
  label?: string;
}

export interface HistoryEntry {
  id: string;
  siteId: string;
  url: string;
  status: ChangeStatus;
  checkedAt: Date;
}
