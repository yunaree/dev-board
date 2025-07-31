import { api } from '../../lib/api';
import { AuthCredentials, AuthResponse, RefreshRequest, User } from '../../types/auth.types';

export const login = (data: AuthCredentials) =>
    Promise.resolve(api.post<AuthResponse>('/auth/login', data).then((res) => res.data));

export const register = (data: AuthCredentials) =>
    Promise.resolve(api.post<AuthResponse>('/auth/register', data).then(({ data }) => data));

export const refresh = (data: RefreshRequest) =>
    Promise.resolve(api.post<AuthResponse>('/auth/refresh', data).then(({ data }) => data));

export const logout = (data: RefreshRequest) =>
    Promise.resolve(api.post<{ message: string }>('/auth/logout', data).then(({ data }) => data));

export const getMe = (token: string) =>
    Promise.resolve(api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => data)); 


