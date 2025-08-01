'use client';

import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogOut, LogIn, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogTrigger } from '../ui/dialog';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import { useAuthStore } from '@/store/auth.store';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';

function Header() {
    const { user, tokens, refresh, logout } = useAuthStore();
    const [dialogType, setDialogType] = useState<'login' | 'signup'>('login');

    return (
        <header>
            <div className="lg:flex items-center justify-between p-4">
                <div className="p-3 flex justify-center lg:justify-start items-center space-x-4 font-[family-name:var(--font-geist-mono)] whitespace-nowrap">
                    dev-board
                </div>

                <div className="flex items-center justify-between w-full lg:w-2/3">
                    <div className='flex items-center justify-between space-x-6 w-full lg:w-auto'>
                        <Input type="text" placeholder="Search" className='w-full lg:w-150' />
                        <Button type="submit">
                            <Plus />
                            <div className='hidden md:inline'>Create</div>
                        </Button>
                    </div>

                    {user ? (
                        <div className="flex items-center lg:p-3">
                            <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <Avatar>
                                            <AvatarFallback>
                                                {user.username ? user.username.charAt(0).toUpperCase() : ''}
                                            </AvatarFallback>
                                        </Avatar>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => logout()}>
                                            <LogOut></LogOut>Logout
                                        </Button>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='ml-4 lg:ml-0' variant="ghost" size="sm" onClick={() => setDialogType('login')}>
                                        <LogIn /> <div className='hidden md:inline'> Log in</div>
                                    </Button>
                                </DialogTrigger>
                                {dialogType === 'login' ? <LoginForm onSwitch={() => setDialogType('signup')} /> : <SignupForm onSwitch={() => setDialogType('login')} />}
                            </Dialog>
                        </div>
                    )}
                </div>
            </div>
            <Separator></Separator>
        </header>
    );
}

export default Header;