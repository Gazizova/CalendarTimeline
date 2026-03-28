import React, { useState, useMemo, useCallback } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import "react-calendar-timeline/style.css";
import moment from "moment";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { INITIAL_GROUPS, INITIAL_ITEMS } from "../../data/sampleData";
import type { CustomGroup, CustomItem } from "../../types";
import CalendarItem from "../CalendarItem/CalendarItem";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const SIDEBAR_WIDTH = 210;
const ITEM_HEIGHT_RATIO = 0.6;

// Default visible range: Apr 2026 → Oct 2026
const DEFAULT_START = moment({ year: 2026, month: 3, day: 1 }).valueOf(); // April
const DEFAULT_END = moment({ year: 2026, month: 9, day: 1 }).valueOf(); // October

// Pre-compute combined time bounds per segment (used for summary items)
const SEGMENT_BOUNDS: Record<string, { start: number; end: number }> = {};
for (const item of INITIAL_ITEMS) {
  const grp = INITIAL_GROUPS.find((g) => g.id === item.group);
  if (!grp?.segmentId) continue;
  const sid = grp.segmentId;
  if (!SEGMENT_BOUNDS[sid]) {
    SEGMENT_BOUNDS[sid] = { start: item.start_time, end: item.end_time };
  } else {
    SEGMENT_BOUNDS[sid].start = Math.min(
      SEGMENT_BOUNDS[sid].start,
      item.start_time,
    );
    SEGMENT_BOUNDS[sid].end = Math.max(SEGMENT_BOUNDS[sid].end, item.end_time);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const CalendarTimeline: React.FC = () => {
  // Which segment groups are collapsed (their practice rows hidden)
  const [collapsedSegments, setCollapsedSegments] = useState<Set<string>>(
    new Set(),
  );

  // ── Expanded state lives INSIDE the items record so that toggling produces
  //    a new array reference → react-calendar-timeline (PureComponent) sees the
  //    prop change and actually re-renders the items.
  const [itemExpandedState, setItemExpandedState] = useState<
    Record<string, boolean>
  >(() => Object.fromEntries(INITIAL_ITEMS.map((i) => [i.id, true])));

  // Drag-and-drop toggle
  const [dndEnabled, setDndEnabled] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const toggleSegment = useCallback((segId: string) => {
    setCollapsedSegments((prev) => {
      const next = new Set(prev);
      next.has(segId) ? next.delete(segId) : next.add(segId);
      return next;
    });
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setItemExpandedState((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const expandAll = useCallback(
    () => setCollapsedSegments(new Set()),
    [],
  );
  const collapseAll = useCallback(
    () => setCollapsedSegments(
      new Set(INITIAL_GROUPS.filter((g) => g.level === 0).map((g) => g.id.toString())),
    ),
    [],
  );

  // ── Derived groups ────────────────────────────────────────────────────────
  // level 0: always visible (segment headers)
  // level 1: visible only when segment is EXPANDED
  // level 2: visible only when segment is COLLAPSED (summary row)
  const visibleGroups = useMemo<CustomGroup[]>(
    () =>
      INITIAL_GROUPS.filter((g) => {
        if (g.level === 0) return true;
        const collapsed = collapsedSegments.has(g.segmentId ?? "");
        if (g.level === 2) return collapsed; // summary row
        return !collapsed; // practice rows
      }),
    [collapsedSegments],
  );

  // ── Items: practice items + summary items for collapsed segments ───────────
  const visibleItems = useMemo(() => {
    // Regular practice items (only for expanded segments)
    const practiceItems = INITIAL_ITEMS.filter((item) => {
      const grp = INITIAL_GROUPS.find((g) => g.id === item.group);
      return grp?.level === 1 && !collapsedSegments.has(grp.segmentId ?? "");
    }).map((item) => ({
      ...item,
      isExpanded: itemExpandedState[item.id.toString()] ?? true,
      canMove: dndEnabled,
      canResize: dndEnabled ? ("both" as const) : (false as const),
    }));

    // Summary items (one per collapsed segment)
    const summaryItems = Array.from(collapsedSegments)
      .filter((sid) => SEGMENT_BOUNDS[sid])
      .map((sid) => {
        const count = INITIAL_GROUPS.filter(
          (g) => g.level === 1 && g.segmentId === sid,
        ).length;
        const { start, end } = SEGMENT_BOUNDS[sid];
        return {
          id: `summary-${sid}`,
          group: `${sid}-summary`,
          title: `${count} practice${count !== 1 ? "s" : ""}`,
          start_time: start,
          end_time: end,
          phases: [],
          isSummary: true,
          segmentId: sid,
          isExpanded: false,
          canMove: false,
          canResize: false,
        } as CustomItem & { isExpanded: boolean };
      });

    return [...practiceItems, ...summaryItems];
  }, [itemExpandedState, dndEnabled, collapsedSegments]);

  // Pre-compute practice count per segment
  const practiceCountBySegment = useMemo<Record<string, number>>(
    () =>
      Object.fromEntries(
        INITIAL_GROUPS.filter((g) => g.level === 0).map((g) => [
          g.id,
          INITIAL_GROUPS.filter(
            (p) => p.level === 1 && p.segmentId === g.id.toString(),
          ).length,
        ]),
      ),
    [],
  );

  // ── Custom left-sidebar group renderer ────────────────────────────────────
  const groupRenderer = useCallback(
    ({ group }: { group: CustomGroup }) => {
      // ── Segment header row ──────────────────────────────────────────────────
      if (group.level === 0) {
        const isCollapsed = collapsedSegments.has(group.id.toString());
        const count = practiceCountBySegment[group.id.toString()] ?? 0;
        return (
          <Box
            onClick={() => toggleSegment(group.id.toString())}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              px: 1.5,
              gap: 0.75,
              cursor: "pointer",
              userSelect: "none",
              "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
            }}
          >
            {isCollapsed ? (
              <ChevronRightIcon
                sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
              />
            )}
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={13}
                lineHeight={1.3}
                noWrap
              >
                {group.title as string}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize={11}
                lineHeight={1.2}
                display="block"
              >
                {count} practice{count !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        );
      }

      // ── Summary row (empty sidebar) ─────────────────────────────────────────
      if (group.level === 2) {
        return <Box sx={{ height: "100%" }} />;
      }

      // ── Practice row ────────────────────────────────────────────────────────
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            pl: 5,
            pr: 1.5,
          }}
        >
          <Typography variant="body2" fontSize={13} color="text.primary" noWrap>
            {group.title as string}
          </Typography>
        </Box>
      );
    },
    [collapsedSegments, toggleSegment, practiceCountBySegment],
  );

  // ── Custom timeline item renderer ──────────────────────────────────────────
  const itemRenderer = useCallback(
    ({
      item,
      itemContext,
      getItemProps,
    }: {
      item: CustomItem & { isExpanded?: boolean };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      itemContext: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getItemProps: any;
    }) => (
      <CalendarItem
        item={item}
        itemContext={itemContext}
        getItemProps={getItemProps}
        onToggleItem={toggleItem}
        onToggleSegment={toggleSegment}
      />
    ),
    [toggleItem, toggleSegment],
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F5F5F5",
      }}
    >
      {/* ── Top app-bar ─────────────────────────────────────────────────────── */}
      <Paper
        elevation={2}
        square
        sx={{
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          fontSize={16}
          letterSpacing={0.3}
        >
          📅 Calendar Timeline
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Expand / Collapse all */}
          <Tooltip title="Expand all blocks">
            <IconButton size="small" onClick={expandAll}>
              <UnfoldMoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Collapse all blocks">
            <IconButton size="small" onClick={collapseAll}>
              <UnfoldLessIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Drag-and-drop toggle */}
          <Tooltip title="Enable / disable drag-and-drop">
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={dndEnabled}
                  onChange={(e) => setDndEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DragIndicatorIcon
                    sx={{
                      fontSize: 16,
                      color: dndEnabled ? "primary.main" : "text.disabled",
                    }}
                  />
                  <Typography variant="body2" fontSize={13}>
                    Drag &amp; Drop
                  </Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
          </Tooltip>
        </Box>
      </Paper>

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <Box
        sx={{ flex: 1, overflow: "hidden", ".rct-outer": { borderRadius: 0 } }}
      >
        <Timeline
          groups={visibleGroups}
          items={visibleItems}
          defaultTimeStart={DEFAULT_START}
          defaultTimeEnd={DEFAULT_END}
          sidebarWidth={SIDEBAR_WIDTH}
          lineHeight={72}
          itemHeightRatio={ITEM_HEIGHT_RATIO}
          canMove={dndEnabled}
          canResize={dndEnabled ? "both" : false}
          canChangeGroup={dndEnabled}
          groupRenderer={groupRenderer as never}
          itemRenderer={itemRenderer as never}
          // mousedown is stopped inside itemRenderer so the library never
          // starts its drag machinery → onItemClick is intentionally unused.
          onItemClick={() => {}}
          onItemSelect={() => {}} // prevent blue selection outline
          onCanvasClick={() => {}} // prevent canvas side-effects
          buffer={1.5}
        >
          <TimelineHeaders
            style={{
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #EBEBEB",
            }}
          >
            {/* Left-side header cell */}
            <SidebarHeader>
              {({ getRootProps }) => (
                <Box
                  {...(getRootProps() as object)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: 1.5,
                    fontWeight: 600,
                    fontSize: 13,
                    bgcolor: "#fff",
                    borderRight: "1px solid #E0E0E0",
                    borderLeft: "3px solid #7C4DFF",
                    color: "text.primary",
                  }}
                >
                  Segment name
                </Box>
              )}
            </SidebarHeader>

            {/* Year row */}
            <DateHeader unit="primaryHeader" />

            {/* Month row */}
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </Box>
    </Box>
  );
};

export default CalendarTimeline;
