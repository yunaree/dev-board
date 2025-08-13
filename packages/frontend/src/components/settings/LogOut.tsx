'use client';

import { useAuthStore } from '@/store/auth.store';
import React from 'react';
import { Button } from '../ui/button';
import { LogOut as LogOutIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useRouter } from 'next/navigation';

function LogOut() {
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex items-center mt-8 w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="w-full">
            <div className="flex space-x-2 items-center">
              <LogOutIcon />
              <p>Leave</p>
            </div>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                logout();
                router.push('/'); 
              }}
            >
              Yes, log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LogOut;
