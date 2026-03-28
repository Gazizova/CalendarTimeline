import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const SummaryPill = styled(Box)<{ $bgcolor: string }>(({ $bgcolor }) => ({
  position: 'absolute',
  top: '6px',
  bottom: '6px',
  left: 0,
  right: 0,
  backgroundColor: $bgcolor,
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  '&:hover': { filter: 'brightness(0.97)' },
}));

export const PhaseBlock = styled(Box)<{
  $color: string;
  $left: string;
  $width: string;
  $px: string;
}>(({ $color, $left, $width, $px }) => ({
  position: 'absolute',
  left: $left,
  width: $width,
  top: '8px',
  bottom: '8px',
  backgroundColor: $color,
  borderRadius: '6px',
  cursor: 'pointer',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: $px,
  paddingRight: $px,
  '&:hover': { filter: 'brightness(0.95)' },
}));

export const CollapsedBlock = styled(Box)({
  position: 'absolute',
  top: '8px',
  bottom: '8px',
  left: 0,
  right: 0,
  backgroundColor: '#E7E5E4',
  borderRadius: '6px',
  cursor: 'pointer',
  '&:hover': { filter: 'brightness(0.95)' },
});
