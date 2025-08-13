'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/shared/AppSidebar';
import AuthTest from '@/components/auth-test';
import UserDashboardsList from '@/components/dashboards/UserDashboardsList';
import { useAuthStore } from '@/store/auth.store';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function page() {
    const isMounted = useIsMounted();
    const { user, tokens } = useAuthStore();

      if (!isMounted) {
        return null; // рендеримо пусто, але порядок хуків зберігається
    }

    return (
    <div className="flex flex-col min-h-screen">
        {/* <UserDashboardsList></UserDashboardsList> */}
        <pre>{user?.username}
            {tokens?.access_token}
        </pre>
    </div>
    );
}