"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth.store';
import { Edit3, LogOut } from 'lucide-react';
import React from 'react';

function page() {
    const { user, logout } = useAuthStore();

    return (
        <div className="flex flex-col items-center min-h-screen max-w-4xl mx-auto p-4">
            <div className='w-4xl flex flex-col mt-2 space-x-4'>
                <div className="flex mt-3 space-x-4 items-center mb-3">
                    <p className='text-4xl font-bold'>{user?.username}</p>
                    <Button variant="outline" size="sm" className="flex items-center">
                        <Edit3/>
                    </Button>
                </div>
                <Separator className="w-lg" />
            </div>

            <div className="w-4xl flex flex-col mt-5 space-x-4">
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Change Avatar</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>Upload a new image to update your profile. We recommend using a square photo that is at least 400×400 pixels in size. Supported formats: JPG, PNG.</p>

                <div className="flex items-center w-full space-x-4 mb-4">
                    <Avatar className="w-12 h-12 m-5">
                        <AvatarFallback>
                                {user?.username ? user.username.charAt(0).toUpperCase() : ''}
                        </AvatarFallback>
                    </Avatar>
                    <Input id="picture" type="file" className='w-auto' />
                </div>

                <Separator className="w-lg" />
            </div>

            <div className='w-4xl flex flex-col mt-5 space-x-4'>
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Connect email</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>Add your email address to be able to recover access to your account, receive notifications, and important updates.</p>
                
                    <div className="flex w-full max-w-sm items-center gap-2 my-6">
                        <Input type="email" placeholder="Email" />
                        <Button type="submit" variant="outline">
                            Subscribe
                        </Button>
                    </div>
                
                <Separator className="w-lg" />
            </div>

            <div className='w-4xl flex flex-col mt-5 space-x-4'>
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Change password</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>To protect your account, we recommend that you update your password regularly. Enter your current password and create a new one.</p>
                
                <div className="flex justify-between">
                    <div className="flex w-full max-w-sm items-end gap-2 my-6">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">Old password</Label>
                            <Input type="text" id="oldPassword" />
                        </div>

                        <Button variant="outline" className='mt-3'>Change password</Button>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-3 my-6">
                        <Label htmlFor="email">New password <p className='italic'>(Press Enter to change)</p></Label>
                        <Input disabled type="text" id="oldPassword"/>
                    </div>
                </div>

                    <blockquote className="my-6 border-l-2 pl-6 italic">
                    Note: Passwords must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
                    </blockquote>
                
                <Separator className="w-lg" />
            </div>

            <div className="flex items-center mt-8 w-full">
                <Button onClick={logout} variant="ghost" className=' w-full'><div className='flex space-x-2 items-center'><LogOut></LogOut> <p>Leave</p></div></Button>
            </div>
            
        </div>
    );
}

export default page;