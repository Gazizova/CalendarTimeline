import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CalendarTimeline from './components/CalendarTimeline';

const theme = createTheme({
  palette: {
    background: { default: '#F5F5F5' },
    primary: { main: '#1976D2' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        body: { margin: 0, padding: 0 },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CalendarTimeline />
    </ThemeProvider>
  );
}

export default App;
