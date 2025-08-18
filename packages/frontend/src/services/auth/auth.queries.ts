import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register, refresh, logout, getMe } from './auth.service';
import { AuthCredentials, RefreshRequest } from '../../types/auth.types';

export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
}

export function useRefresh() {
    return useMutation({
        mutationFn: refresh,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['me'] });
        },
    });
}

export function useMe(token?: string) {
    return useQuery({
        queryKey: ['me', token],
        queryFn: () => (token ? getMe(token) : Promise.reject('No token')),
        enabled: !!token,
    });
} 