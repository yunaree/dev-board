"use client"

import LogOut from '@/components/settings/buttons/LogOut';
import ChangeAvatar from '@/components/settings/ChangeAvatar';
import ChangePassword from '@/components/settings/ChangePassword';
import Email from '@/components/settings/Email';
import Username from '@/components/settings/Username';

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