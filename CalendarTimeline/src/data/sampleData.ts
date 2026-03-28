import moment from "moment";
import type { CustomGroup, CustomItem } from "../types";

const Y = 2026;

/** Shorthand: timestamp for year 2026, month (1-based), day */
const d = (month: number, day: number): number =>
  moment({ year: Y, month: month - 1, day }).valueOf();

// ─── Phase colour presets ─────────────────────────────────────────────────────
const PHASE_COLORS = {
  bloom: { color: "#FED7AA", textColor: "#92400E", borderColor: "#FDBA74" },
  growth: { color: "#D6EEAA", textColor: "#3F6212", borderColor: "#BEF264" },
  harvest: { color: "#A0BFF8", textColor: "#1E40AF", borderColor: "#93C5FD" },
  midseason: { color: "#E7E5E4", textColor: "#44403C", borderColor: "#D6D3D1" },
};

// ─── Groups ───────────────────────────────────────────────────────────────────
export const INITIAL_GROUPS: CustomGroup[] = [
  // ── Segment: Fruits
  { id: "fruits", title: "Fruits", level: 0, height: 60 },
  {
    id: "fruits-summary",
    title: "",
    level: 2,
    segmentId: "fruits",
    height: 60,
  },
  {
    id: "practice-a",
    title: "Practice A",
    level: 1,
    segmentId: "fruits",
    height: 72,
  },
  {
    id: "practice-b",
    title: "Practice B",
    level: 1,
    segmentId: "fruits",
    height: 72,
  },
  {
    id: "practice-c",
    title: "Practice C",
    level: 1,
    segmentId: "fruits",
    height: 72,
  },
  {
    id: "practice-d",
    title: "Practice D",
    level: 1,
    segmentId: "fruits",
    height: 72,
  },
  {
    id: "practice-e",
    title: "Practice E",
    level: 1,
    segmentId: "fruits",
    height: 72,
  },

  // ── Segment: Cereals
  { id: "cereals", title: "Cereals", level: 0, height: 60 },
  {
    id: "cereals-summary",
    title: "",
    level: 2,
    segmentId: "cereals",
    height: 60,
  },
  {
    id: "practice-f",
    title: "Practice F",
    level: 1,
    segmentId: "cereals",
    height: 72,
  },
  {
    id: "practice-g",
    title: "Practice G",
    level: 1,
    segmentId: "cereals",
    height: 72,
  },
  {
    id: "practice-h",
    title: "Practice H",
    level: 1,
    segmentId: "cereals",
    height: 72,
  },
];

// ─── Items ────────────────────────────────────────────────────────────────────
export const INITIAL_ITEMS: CustomItem[] = [
  // ── Practice A  (May 1 → Jul 15)
  {
    id: "item-a",
    group: "practice-a",
    title: "Practice A",
    start_time: d(5, 1),
    end_time: d(7, 15),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "a-1",
        title: "Bloom",
        start: d(5, 1),
        end: d(5, 15),
        ...PHASE_COLORS.bloom,
      },
      {
        id: "a-2",
        title: "Growth",
        start: d(5, 16),
        end: d(6, 30),
        ...PHASE_COLORS.growth,
      },
      {
        id: "a-3",
        title: "Harvest",
        start: d(7, 1),
        end: d(7, 15),
        ...PHASE_COLORS.harvest,
      },
    ],
  },

  // ── Practice B  (Jul 1 → Oct 15)
  {
    id: "item-b",
    group: "practice-b",
    title: "Practice B",
    start_time: d(7, 1),
    end_time: d(10, 15),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "b-1",
        title: "Midseason",
        start: d(7, 1),
        end: d(7, 20),
        ...PHASE_COLORS.midseason,
      },
      {
        id: "b-2",
        title: "Growth",
        start: d(7, 21),
        end: d(10, 15),
        ...PHASE_COLORS.growth,
      },
    ],
  },

  // ── Practice C  (Jun 1 → Aug 15)
  {
    id: "item-c",
    group: "practice-c",
    title: "Practice C",
    start_time: d(6, 1),
    end_time: d(8, 15),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "c-1",
        title: "Bloom",
        start: d(6, 1),
        end: d(6, 20),
        ...PHASE_COLORS.bloom,
      },
      {
        id: "c-2",
        title: "Growth",
        start: d(6, 21),
        end: d(7, 31),
        ...PHASE_COLORS.growth,
      },
      {
        id: "c-3",
        title: "Harvest",
        start: d(8, 1),
        end: d(8, 15),
        ...PHASE_COLORS.harvest,
      },
    ],
  },

  // ── Practice D  (Sep 1 → Nov 15)
  {
    id: "item-d",
    group: "practice-d",
    title: "Practice D",
    start_time: d(9, 1),
    end_time: d(11, 15),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "d-1",
        title: "Midseason",
        start: d(9, 1),
        end: d(9, 20),
        ...PHASE_COLORS.midseason,
      },
      {
        id: "d-2",
        title: "Growth",
        start: d(9, 21),
        end: d(11, 15),
        ...PHASE_COLORS.growth,
      },
    ],
  },

  // ── Practice E  (Sep 10 → Oct 31)
  {
    id: "item-e",
    group: "practice-e",
    title: "Practice E",
    start_time: d(9, 10),
    end_time: d(10, 31),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "e-1",
        title: "Midseason",
        start: d(9, 10),
        end: d(9, 25),
        ...PHASE_COLORS.midseason,
      },
      {
        id: "e-2",
        title: "Bloom",
        start: d(9, 26),
        end: d(10, 15),
        ...PHASE_COLORS.bloom,
      },
      {
        id: "e-3",
        title: "Harvest",
        start: d(10, 16),
        end: d(10, 31),
        ...PHASE_COLORS.harvest,
      },
    ],
  },

  // ── Practice F  (Apr 1 → Jul 31)
  {
    id: "item-f",
    group: "practice-f",
    title: "Practice F",
    start_time: d(4, 1),
    end_time: d(7, 31),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "f-1",
        title: "Midseason",
        start: d(4, 1),
        end: d(4, 30),
        ...PHASE_COLORS.midseason,
      },
      {
        id: "f-2",
        title: "Growth",
        start: d(5, 1),
        end: d(6, 30),
        ...PHASE_COLORS.growth,
      },
      {
        id: "f-3",
        title: "Harvest",
        start: d(7, 1),
        end: d(7, 31),
        ...PHASE_COLORS.harvest,
      },
    ],
  },

  // ── Practice G  (May 15 → Sep 15)
  {
    id: "item-g",
    group: "practice-g",
    title: "Practice G",
    start_time: d(5, 15),
    end_time: d(9, 15),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "g-1",
        title: "Bloom",
        start: d(5, 15),
        end: d(6, 14),
        ...PHASE_COLORS.bloom,
      },
      {
        id: "g-2",
        title: "Growth",
        start: d(6, 15),
        end: d(8, 15),
        ...PHASE_COLORS.growth,
      },
      {
        id: "g-3",
        title: "Harvest",
        start: d(8, 16),
        end: d(9, 15),
        ...PHASE_COLORS.harvest,
      },
    ],
  },

  // ── Practice H  (Jun 1 → Oct 1)
  {
    id: "item-h",
    group: "practice-h",
    title: "Practice H",
    start_time: d(6, 1),
    end_time: d(10, 1),
    canMove: false,
    canResize: false,
    phases: [
      {
        id: "h-1",
        title: "Midseason",
        start: d(6, 1),
        end: d(6, 20),
        ...PHASE_COLORS.midseason,
      },
      {
        id: "h-2",
        title: "Growth",
        start: d(6, 21),
        end: d(8, 31),
        ...PHASE_COLORS.growth,
      },
      {
        id: "h-3",
        title: "Harvest",
        start: d(9, 1),
        end: d(10, 1),
        ...PHASE_COLORS.harvest,
      },
    ],
  },
];
