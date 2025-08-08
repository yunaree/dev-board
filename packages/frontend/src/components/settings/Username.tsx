import { useAuthStore } from '@/store/auth.store';
import React from 'react';
import { Separator } from '../ui/separator';
import { Edit3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function Username() {
    const { user } = useAuthStore();

        if (!user) {
        return (
            <div className='lg:w-4xl w-full flex flex-col mt-2 md:space-x-4'>
                <div className="flex mt-3 space-x-4 items-center mb-3">
                    <Skeleton className="h-10 w-32 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
                <Skeleton className="h-px w-full" />
            </div>
        );
    }

    return (
        <div className='lg:w-4xl w-full flex flex-col mt-2 md:space-x-4'>
            <div className="flex mt-3 space-x-4 items-center mb-3">
                <p className='text-4xl font-bold'>{user?.username}</p>
                <Button variant="outline" size="sm" className="flex items-center">
                    <Edit3/>
                </Button>
            </div>
            <Separator className="lg:w-lg w-full" />
        </div>
    );
}

export default Username;