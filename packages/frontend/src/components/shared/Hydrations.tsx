'use client';

import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';


export default function Hydrations() {
    useEffect(() => {
        useAuthStore.persist.rehydrate();
    }, []);

    return null;
}