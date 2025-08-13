"use client"

import ChangeAvatar from '@/components/settings/ChangeAvatar';
import ChangePassword from '@/components/settings/ChangePassword';
import Email from '@/components/settings/Email';
import LogOut from '@/components/settings/LogOut';
import Username from '@/components/settings/Username';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAuthStore } from '@/store/auth.store';

import React from 'react';

export default function Page(){
    return (
        <div className="flex flex-col items-center min-h-screen max-w-4xl mx-auto lg:p-0 p-4">

            <Username />

            <ChangeAvatar />

             <Email/>

            <ChangePassword />

            <LogOut />
            
        </div>
    );
}