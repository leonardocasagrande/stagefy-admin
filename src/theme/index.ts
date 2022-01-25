import { createTheme } from '@mui/material';
import { colors } from 'contents/colorDefinitions';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Baloo Bhaijaan 2"',
          fontWeight: 500,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: '"Baloo Bhaijaan 2"',
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
          color: palette.text?.secondary,
          letterSpacing: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25);',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: colors.secondaryMain,
            fontFamily: '"Baloo Bhaijaan 2", Geneva, Tahoma, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            textAlign: 'center',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontSize: '0.75rem',
            fontWeight: 500,
            fontFamily: '"Baloo Bhaijaan 2", Geneva, Tahoma, sans-serif',
            lineHeight: '21px',
            letterSpacing: '-0.2px',
            textAlign: 'center',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderColor: colors.primaryMain,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondaryBg,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
