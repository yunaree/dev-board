import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';
import AvatarForm from './forms/AvatarForm';

function ChangeAvatar() {
    const { user } = useAuthStore();

    console.log("ChangeAvatar user:", user);

    return (
            <div className="lg:w-4x flex flex-col mt-5 space-x-4">
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Change Avatar</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>Upload a new image to update your profile. We recommend using a square photo that is at least 400×400 pixels in size. Supported formats: PNG.</p>

                <div className="flex items-center w-full lg:space-x-4 mb-4">
                    <Avatar className="w-12 h-12 m-5">
                        <AvatarFallback>
                                {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" />
                                ) : (
                                <span>{user?.username?.charAt(0).toUpperCase()}</span>
                                )}
                        </AvatarFallback>
                    </Avatar>
                    <AvatarForm/>
                </div>

                <Separator className="lg:w-lg w-full" />
            </div>
    );
}

export default ChangeAvatar;