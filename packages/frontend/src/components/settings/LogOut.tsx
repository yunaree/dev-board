import { useAuthStore } from '@/store/auth.store';
import React from 'react';
import { Button } from '../ui/button';
import { LogOut as LogOutIcon } from 'lucide-react';


function LogOut() {
    const { logout } = useAuthStore();
    
    return (
            <div className="flex items-center mt-8 w-full">
                <Button onClick={logout} variant="ghost" className=' w-full'><div className='flex space-x-2 items-center'><LogOutIcon></LogOutIcon> <p>Leave</p></div></Button>
            </div>
    );
}

export default LogOut;