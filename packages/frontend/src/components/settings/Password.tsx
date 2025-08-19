'use client'

import React from 'react';
import { Separator } from '../ui/separator';
import { useAuthStore } from '@/store/auth.store';
import ChangePasswordForm from './forms/ChangePasswordForm';
import AddPasswordForm from './forms/AddPasswordForm';

function ChangePassword() {
    const { user } = useAuthStore();

    return (
            <div className='lg:w-4xl flex flex-col mt-5 space-x-4'>
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Change password</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>To protect your account, we recommend that you update your password regularly. Enter your current password and create a new one.</p>
                
                {user?.isPasswordExist ? (
                    <ChangePasswordForm />
                ) : (
                    <AddPasswordForm />
                )}

                <blockquote className="my-6 border-l-2 pl-6 italic">
                    Note: Passwords must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
                </blockquote>
                
                <Separator className="lg:w-lg w-full" />
            </div>
    );
}

export default ChangePassword;