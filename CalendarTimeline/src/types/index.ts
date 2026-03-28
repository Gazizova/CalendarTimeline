import type { TimelineGroupBase, TimelineItemBase } from 'react-calendar-timeline';

// ─── Phase (child block inside a parent item) ─────────────────────────────────
export interface PhaseConfig {
  id: string;
  title: string;
  start: number; // Unix ms timestamp
  end: number;   // Unix ms timestamp
  color: string;
  textColor: string;
  borderColor: string;
}

// ─── Groups (left sidebar rows) ───────────────────────────────────────────────
export interface CustomGroup extends TimelineGroupBase {
  /** 0 = segment header (Fruits / Cereals), 1 = practice row */
  level: number;
  /** Only on level-1 groups: which segment they belong to */
  segmentId?: string;
}

// ─── Items (timeline blocks) ──────────────────────────────────────────────────
export interface CustomItem extends TimelineItemBase<number> {
  /** Phase children rendered inside the parent block when expanded */
  phases: PhaseConfig[];
  /** True for the auto-generated summary block shown when a segment is collapsed */
  isSummary?: boolean;
  /** For summary items: which segment they belong to */
  segmentId?: string;
  /** Optional free-text detail shown in the tooltip */
  detail?: string;
}
