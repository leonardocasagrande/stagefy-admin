import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { login, logout, refreshAccessToken } from 'services/sessions';
import { IUser, ProfileRoleEnum } from '../types/index.d';
// import { IUser, ProfileRoleEnum } from 'types';

interface IAuthContextProps {
  children: ReactNode;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IAuthContextData {
  user: IUser;
  token: string;
  refreshToken: string;
  signIn(credentials: SigninCredentials): Promise<ProfileRoleEnum>;
  signOut(): Promise<void>;
  refreshUserToken(): Promise<void>;
  clearAuth(): void;
}

const allowedRoles = [ProfileRoleEnum.Admin, ProfileRoleEnum.Professional];

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@stagefy_admin:user');
    const token = localStorage.getItem('@stagefy_admin:token');
    const refreshToken = localStorage.getItem('@stagefy_admin:refresh_token');

    if (user && token && refreshToken) {
      return { user: JSON.parse(user), token, refreshToken };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { refreshToken, user, token } = await login({
      email,
      password,
    });

    if (!allowedRoles.includes(user.profileRole))
      throw new Error('Usuário não permitido');
    localStorage.setItem('@stagefy_admin:token', token);
    localStorage.setItem('@stagefy_admin:user', JSON.stringify(user));
    localStorage.setItem('@stagefy_admin:refresh_token', refreshToken);

    setAuthData({ token, user, refreshToken });
    return user.profileRole;
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    localStorage.removeItem('@stagefy_admin:token');
    localStorage.removeItem('@stagefy_admin:user');
    localStorage.removeItem('@stagefy_admin:refresh_token');
    setAuthData({} as IAuthState);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('@stagefy_admin:token');
    localStorage.removeItem('@stagefy_admin:user');
    localStorage.removeItem('@stagefy_admin:refresh_token');
    setAuthData({} as IAuthState);
  };

  const refreshUserToken = useCallback(async () => {
    const { token, user, refreshToken } = await refreshAccessToken(
      authData.refreshToken
    );
    localStorage.setItem('@stagefy_admin:token', token);
    localStorage.setItem('@stagefy_admin:user', JSON.stringify(user));
    localStorage.setItem('@stagefy_admin:refresh_token', refreshToken);
    setAuthData({ token, user, refreshToken });
  }, [authData]);

  useEffect(() => {
    if (localStorage.getItem('@stagefy_admin:refresh_token')) {
      refreshUserToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: authData.user,
        token: authData.token,
        refreshToken: authData.refreshToken,
        signOut,
        refreshUserToken,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
