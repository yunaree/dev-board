import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function ChangePasswordForm() {
    return(
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
    );
}

export default ChangePasswordForm;