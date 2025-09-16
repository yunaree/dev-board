'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/shared/AppSidebar';
import { useAuthStore } from '@/store/auth.store';
import { useIsMounted } from '@/hooks/useIsMounted';
import CreateDashboardForm from '@/components/dashboards/forms/CreateDashboardForm';
import DashboardsList from '@/components/dashboards/DashboardsList';
import TasksUpdates from '@/components/updates/TasksUpdates';

export default function page() {
    const { user, tokens } = useAuthStore();

    return (
    <div className="flex flex-col min-h-screen px-4 md:px-20 lg:px-40">
        <DashboardsList/>

        {/* <TasksUpdates /> */}
    </div>
    );
}