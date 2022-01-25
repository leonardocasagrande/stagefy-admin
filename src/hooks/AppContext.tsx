import { createContext, ReactNode, useContext, useState } from 'react';

type TProps = {
  children: ReactNode;
};

type AppStateType = {
  errorMessage: string | null;
  setErrorMessage: (error: string | null) => void;
  successMessage: string | null;
  setSuccessMessage: (msg: string | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
};

const AppContext = createContext<AppStateType>({
  errorMessage: null,
  setErrorMessage: () => undefined,
  successMessage: null,
  setSuccessMessage: () => undefined,
  loading: false,
  setLoading: () => undefined,
});

const AppState = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const appState = {
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
    successMessage,
    setSuccessMessage,
  };
  return appState;
};

const AppContextProvider = ({ children }: TProps) => (
  <AppContext.Provider value={AppState()}>{children}</AppContext.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const useApp = () => useContext(AppContext);

export { AppContextProvider, useApp };
