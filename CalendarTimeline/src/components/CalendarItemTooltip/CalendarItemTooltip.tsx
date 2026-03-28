import React from 'react';
import moment from 'moment';

import type { CustomItem } from '../../types';
import {
  StyledTooltip,
  TooltipCard,
  TooltipTitle,
  TooltipRow,
  TooltipDot,
  TooltipLabel,
  TooltipValue,
  TooltipDivider,
} from './CalendarItemTooltip.styles';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface CalendarItemTooltipProps {
  item: CustomItem;
  children: React.ReactElement;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (ts: number) => moment(ts).format('DD/MM/YY');

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip content
// ─────────────────────────────────────────────────────────────────────────────
const TooltipContent: React.FC<{ item: CustomItem }> = ({ item }) => (
  <TooltipCard>
    <TooltipTitle>{item.title as string}</TooltipTitle>

    {item.phases.map((phase) => (
      <TooltipRow key={phase.id}>
        <TooltipDot $color={phase.color} />
        <TooltipLabel>{phase.title}</TooltipLabel>
        <TooltipValue>
          {fmt(phase.start)} – {fmt(phase.end)}
        </TooltipValue>
      </TooltipRow>
    ))}

    {item.detail && (
      <>
        <TooltipDivider />
        <TooltipRow>
          <TooltipLabel>Detailed</TooltipLabel>
          <TooltipValue>{item.detail}</TooltipValue>
        </TooltipRow>
      </>
    )}
  </TooltipCard>
);

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const CalendarItemTooltip: React.FC<CalendarItemTooltipProps> = ({ item, children }) => {
  if (item.isSummary || item.phases.length === 0) return children;

  return (
    <StyledTooltip
      title={<TooltipContent item={item} />}
      placement="top"
      arrow
      disableInteractive
    >
      {children}
    </StyledTooltip>
  );
};

export default CalendarItemTooltip;
