import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Switcher from 'components/Switcher';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { AppContextProvider } from 'hooks/AppContext';
import { AuthProvider } from 'hooks/AuthContext';
import theme from './theme';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
          <AuthProvider>
            <Switcher />
          </AuthProvider>
        </AppContextProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
