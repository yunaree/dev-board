import { Button } from '@/components/ui/button';
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/shared/AppSidebar';
import AuthTest from '@/components/auth-test';
import UserDashboardsList from '@/components/dashboards/UserDashboardsList';
import { LogOut } from 'lucide-react';

export default function page() {
    return (
    <div className="flex flex-col min-h-screen">
        {/* <UserDashboardsList></UserDashboardsList> */}
        <LogOut className="w-6 h-6 text-red-500" />
    </div>
    );
}