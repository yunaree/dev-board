"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Edit2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth.store';
import { updateUsername } from '@/services/user/user.service';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from '@/store/alert.store';

function UsernameForm() {
    const { user } = useAuthStore();

    const [username, setUsername] = useState(user?.username || '');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUsername({ username });
            useAlertStore.getState().showAlert(
                "success",
                "Success!",
                "Your username has been updated."
            );
            setOpen(false);
        } catch (err: any) {
              useAlertStore.getState().showAlert(
                    "error",
                    "Failed!",
                    err?.response?.data?.message || "Failed to update username"
                );
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="default" className="flex items-center">
                    <Edit2 /> New username
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Username</DialogTitle>
                    <DialogDescription>
                        Enter a new username. It must be unique and contain 3 to 20 characters (letters, numbers, underscores).
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />

                    <DialogFooter>
                        <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)} 
                        >
                        Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UsernameForm;