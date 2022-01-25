import { Axios } from 'config/axiosFetcher';
import { IUser } from '../types/index.d';

interface ILogin {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

const login = async (body: ILogin) => {
  const { data } = await Axios.post<ILoginResponse>('/sessions', body);
  return data;
};

const logout = async () => {
  await Axios.delete('/sessions');
};

const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await Axios.post<ILoginResponse>('/sessions/refresh-token', {
    refresh_token: refreshToken,
  });
  return data;
};

export { login, logout, refreshAccessToken };
