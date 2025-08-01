import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from 'next/link';
import { Plus, UserCog2 } from 'lucide-react';

function DashboardCard() {
    return (
        <div>
            <Card className="w-full lg:w-sm w-2xs">
                <CardHeader>
                    <div  className="flex w-full items-center justify-between">
                        <CardTitle>Dashboard Title</CardTitle>
                        <Link href="#" className="text-blue-500 hover:underline">
                        Go to Dashboard
                        </Link>
                    </div>

                        <div className="flex items-center text-sm text-gray-500">
                            <div className="text-blue-500 mr-2 text-[14px]">•</div>
                            9+ notification
                        </div>
                </CardHeader>

                <div className="flex justify-between items-center px-6">
                        <div className="flex -space-x-2 *:data-[slot=avatar]:grayscale ">
                        <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                        <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <Avatar>
                        <AvatarFallback><Plus></Plus></AvatarFallback>
                        </Avatar>

                        </div>

                        <div className="flex items-center gap-3">
                            <UserCog2 className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-500">Creator</span>
                        </div>
                </div>
            </Card>
        </div>
    );
}

export default DashboardCard;