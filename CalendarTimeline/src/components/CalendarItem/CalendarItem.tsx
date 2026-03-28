import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

import type { CustomItem } from '../../types';
import { SummaryPill, PhaseBlock, CollapsedBlock } from './CalendarItem.styles';
import CalendarItemTooltip from '../CalendarItemTooltip/CalendarItemTooltip';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
export const SEGMENT_COLORS: Record<string, string> = {
  fruits:  '#FFF7ED',
  cereals: '#EEF2FF',
};

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface CalendarItemProps {
  item: CustomItem & { isExpanded?: boolean };
  itemContext: { dimensions: { width: number } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemProps: (overrides?: object) => any;
  onToggleItem: (id: string) => void;
  onToggleSegment: (segId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const CalendarItem: React.FC<CalendarItemProps> = ({
  item,
  itemContext,
  getItemProps,
  onToggleItem,
  onToggleSegment,
}) => {
  const baseProps = getItemProps({
    style: { background: 'transparent', border: 'none', overflow: 'visible' },
  });

  // Stop drag only when DnD is disabled — when enabled, let mousedown reach the library
  const stopDrag = (e: React.MouseEvent) => { if (!item.canMove) e.stopPropagation(); };

  // ── Summary pill (shown when segment is collapsed) ─────────────────────────
  if (item.isSummary) {
    const segId = item.segmentId as string;
    return (
      <Box {...baseProps}>
        <SummaryPill
          $bgcolor={SEGMENT_COLORS[segId] ?? '#F3F4F6'}
          onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); onToggleSegment(segId); }}
        >
          <Typography variant="body2" fontWeight={600} fontSize={13} sx={{ color: '#1E293B' }}>
            {item.title as string}
          </Typography>
          <OpenInFullIcon sx={{ fontSize: 13, color: '#64748B' }} />
        </SummaryPill>
      </Box>
    );
  }

  // ── Regular practice item ──────────────────────────────────────────────────
  const isExpanded    = item.isExpanded ?? true;
  const totalDuration = item.end_time - item.start_time;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleItem(item.id.toString());
  };

  return (
    <CalendarItemTooltip item={item}>
      <Box {...baseProps}>
        {isExpanded
          ? item.phases.map((phase) => {
              const leftPct  = ((phase.start - item.start_time) / totalDuration) * 100;
              const widthPct = ((phase.end   - phase.start)     / totalDuration) * 100;
              const pxWidth  = widthPct * itemContext.dimensions.width / 100;
              const showLabel = pxWidth >= 36;
              return (
                <PhaseBlock
                  key={phase.id}
                  $color={phase.color}
                  $left={`${leftPct}%`}
                  $width={`${widthPct}%`}
                  $px={showLabel ? '6px' : '0'}
                  onMouseDown={stopDrag}
                  onClick={handleClick}
                >
                  {showLabel && (
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{ fontSize: '11px', fontWeight: 500, color: phase.textColor, lineHeight: 1 }}
                    >
                      {phase.title}
                    </Typography>
                  )}
                </PhaseBlock>
              );
            })
          : (
            <CollapsedBlock
              onMouseDown={stopDrag}
              onClick={handleClick}
            />
          )
        }
      </Box>
    </CalendarItemTooltip>
  );
};

export default CalendarItem;
