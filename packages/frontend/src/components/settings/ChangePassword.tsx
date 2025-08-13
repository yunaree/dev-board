import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

function ChangePassword() {
    return (
            <div className='lg:w-4xl flex flex-col mt-5 space-x-4'>
                <p className='scroll-m-20 text-2xl font-semibold tracking-tight'>Change password</p>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>To protect your account, we recommend that you update your password regularly. Enter your current password and create a new one.</p>
                
                <div className="flex justify-between md:flex-row flex-col items-start md:items-center">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="email">Old password</Label>
                        <Input type="text" id="oldPassword" />
                    </div>

                    <div className="flex w-full max-w-sm items-end gap-2 my-6">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">New password</Label>
                            <Input disabled type="text" id="oldPassword"/>
                        </div>

                        <Button variant="outline" className='mt-3'>Change password</Button>
                    </div>


                </div>

                    <blockquote className="my-6 border-l-2 pl-6 italic">
                    Note: Passwords must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
                    </blockquote>
                
                <Separator className="lg:w-lg w-full" />
            </div>
    );
}

export default ChangePassword;