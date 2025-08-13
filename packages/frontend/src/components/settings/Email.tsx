import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

function Email() {
    return (
        <div className='lg:w-4xl flex flex-col mt-5 space-x-4'>
            <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Connect email</p>
            <p className='leading-7 [&:not(:first-child)]:mt-6'>Add your email address to be able to recover access to your account, receive notifications, and important updates.</p>
            
                <div className="flex w-full max-w-sm items-center gap-2 my-6">
                    <Input type="email" placeholder="Email" />
                    <Button type="submit" variant="outline">
                        Subscribe
                    </Button>
                </div>
            
            <Separator className="lg:w-lg w-full" />
        </div>
    );
}

export default Email;