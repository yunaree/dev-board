import { getMe } from '@/features/auth/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
    const router = useRouter();
    const { setTokens, setUser } = useAuthStore();

    useEffect(() => {
        if (!router.isReady) return;

        const { access_token, refresh_token } = router.query;

        if (typeof access_token === 'string' && typeof refresh_token === 'string') {
            const tokens = { access_token, refresh_token };
            setTokens(tokens);

            getMe(access_token)
                .then(setUser)
                .then(() => router.replace('/home')) // або інша сторінка
                .catch(() => router.replace('/login'));
        } else {
            router.replace('/login');
        }
    }, [router, setTokens, setUser]);

    return <p>Завантаження, чекай трохи…</p>;
}
