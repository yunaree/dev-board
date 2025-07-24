'use client';

import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogIn, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import { login } from '@/features/auth/auth.api';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

function Header() {
    const [dialogType, setDialogType] = useState<'login' | 'signup'>('login');
    
    return (
        <header>
            <div className="lg:flex items-center justify-between p-4">
                <div className="p-3 flex justify-center lg:justify-start items-center space-x-4 font-[family-name:var(--font-geist-mono)]">
                    dev-board
                </div>

                <div className='flex items-center justify-between space-x-4'>
                    <Input type="text" placeholder="Search" className='w-150'/>
                    <Button type="submit">
                        <Plus/>
                        <div className='hidden md:inline'>Create</div>
                    </Button>
                </div>
                
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setDialogType('login')}>
                                <LogIn /> Log in
                            </Button>
                        </DialogTrigger>
                        {dialogType === 'login' ? <LoginForm onSwitch={() => setDialogType('signup')}/> : <SignupForm onSwitch={() => setDialogType('login')}/>}
                    </Dialog>
                </div>

                    {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Avatar className="rounded-lg">
                                            <AvatarImage
                                            src="https://github.com/leerob.png"
                                            alt="@evilrabbit"
                                            />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>

                                    // Add your navigation items here
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> */}
            </div>
            <Separator></Separator>
        </header>
    );
}

export default Header;