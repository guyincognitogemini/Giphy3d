import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // deep indigo
    },
    secondary: {
      main: '#FBBF24', // gold
    },
    background: {
      default: '#F3F4F6', // light gray
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Lightbox Overlay
        },
      },
    },
  },
});

export default theme;
