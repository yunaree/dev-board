import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogIn, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function Header() {
    return (
        <header>
            <div className="flex items-center justify-between p-4">
                <div className="flex justify-start items-center space-x-4 font-[family-name:var(--font-geist-mono)]">
                    dev-board
                </div>

                <div className='flex items-center justify-between space-x-4'>
                    <Input type="text" placeholder="Search" className='w-150'/>
                    <Button type="submit">
                        <Plus/>
                        Create
                    </Button>
                </div>
                
                <div className="flex justify-end items-center space-x-4">
                    {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Button variant="outline" size="sm"><LogIn /> Log in</Button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> */}

                    <NavigationMenu>
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
                    </NavigationMenu>

                </div>
            </div>
            <Separator></Separator>
        </header>
    );
}

export default Header;