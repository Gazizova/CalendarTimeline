import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#111318',
    border: '1.5px solid rgba(96, 165, 250, 0.55)',
    borderRadius: '12px',
    padding: 0,
    maxWidth: 300,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&::before': {
      backgroundColor: '#111318',
      border: '1.5px solid rgba(96, 165, 250, 0.55)',
    },
  },
});

export const TooltipCard = styled(Box)({
  padding: '14px 16px',
});

export const TooltipTitle = styled(Box)({
  fontSize: '15px',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: 1.3,
  marginBottom: '12px',
});

export const TooltipRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '6px',
});

export const TooltipDot = styled(Box)<{ $color: string }>(({ $color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: $color,
  flexShrink: 0,
}));

export const TooltipLabel = styled(Box)({
  fontSize: '12px',
  color: '#9CA3AF',
  fontWeight: 400,
  minWidth: 76,
});

export const TooltipValue = styled(Box)({
  fontSize: '12px',
  color: '#FFFFFF',
  fontWeight: 500,
});

export const TooltipDivider = styled(Box)({
  height: '1px',
  backgroundColor: 'rgba(255,255,255,0.08)',
  margin: '10px 0',
});
