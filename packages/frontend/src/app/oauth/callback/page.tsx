'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getMe } from '@/services/auth/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setTokens, setUser } = useAuthStore();

    useEffect(() => {
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');

        if (access_token && refresh_token) {
            const tokens = { access_token, refresh_token };
            setTokens(tokens);

            getMe(access_token)
                .then(setUser)
                .then(() => router.replace('/home'))
                .catch(() => router.replace('/login'));
        } else {
            router.replace('/login');
        }
    }, [router, searchParams, setTokens, setUser]);

    return <p>Завантаження, чекай трохи…</p>;
}
