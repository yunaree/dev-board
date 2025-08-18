import { create } from 'zustand';
import { AuthTokens, User } from '../types/auth.types';
import { login as loginApi, register as registerApi, refresh as refreshApi, getMe } from '../services/auth/auth.service';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    setUser: (user: User | null) => void;
    setTokens: (tokens: AuthTokens | null) => void;
    fetchMe: () => Promise<void>;
    logout: () => void;
    login: (creds: { username: string; pass: string }) => Promise<void>;
    register: (creds: { username: string; pass: string }) => Promise<void>;
    refresh: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            tokens: null,
            setUser: (user) => set({ user }),
            setTokens: (tokens) => set({ tokens }),
            logout: () => set({ user: null, tokens: null }),
            fetchMe: async () => {
                const token = get().tokens?.access_token;
                if (!token) return;
                try {
                const me = await getMe(token);
                set({ user: me });
                } catch (err) {
                console.error("Failed to fetch user:", err);
                }
            },
            login: async (creds) => {
                const tokens = await loginApi(creds);
                set({ tokens });
                const user = await getMe(tokens.access_token);
                set({ user });
            },
            register: async (creds) => {
                const tokens = await registerApi(creds);
                set({ tokens });
                const user = await getMe(tokens.access_token);
                set({ user });
            },
            refresh: async () => {
                const { tokens } = get();
                if (!tokens?.refresh_token) throw new Error('No refresh token');
                const newTokens = await refreshApi({ refreshToken: tokens.refresh_token });
                set({ tokens: newTokens });
                const user = await getMe(newTokens.access_token);
                set({ user });
            },
        }),
        {
            name: 'auth',
            partialize: (state) => ({ tokens: state.tokens, user: state.user }),
            skipHydration: true,
        }
    )
); 