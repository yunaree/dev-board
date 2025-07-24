'use client';

import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogOut, LogIn, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
import { login } from '@/features/auth/auth.api';
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
                <div className="p-3 flex justify-center lg:justify-start items-center space-x-4 font-[family-name:var(--font-geist-mono)]">
                    dev-board
                </div>

                <div className='flex items-center justify-between space-x-4'>
                    <Input type="text" placeholder="Search" className='w-150' />
                    <Button type="submit">
                        <Plus />
                        <div className='hidden md:inline'>Create</div>
                    </Button>
                </div>

                {user ? (
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
                                <NavigationMenuContent  className="max-w-xs w-full overflow-auto">
                                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => logout()}>
                                        <LogOut></LogOut>Logout
                                    </Button>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                ) : (
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setDialogType('login')}>
                                    <LogIn /> Log in
                                </Button>
                            </DialogTrigger>
                            {dialogType === 'login' ? <LoginForm onSwitch={() => setDialogType('signup')} /> : <SignupForm onSwitch={() => setDialogType('login')} />}
                        </Dialog>
                    </div>
                )}
            </div>
            <Separator></Separator>
        </header>
    );
}

export default Header;