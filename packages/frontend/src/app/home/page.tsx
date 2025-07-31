import { Button } from '@/components/ui/button';
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/shared/AppSidebar';
import AuthTest from '@/components/auth-test';
import UserDashboardsList from '@/components/dashboards/UserDashboardsList';

export default function page() {
    return (
    <div className="flex flex-col min-h-screen">
        <UserDashboardsList></UserDashboardsList>
    </div>
    );
}