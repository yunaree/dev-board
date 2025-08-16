"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
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

function UsernameForm() {
    const { user } = useAuthStore();

    const [username, setUsername] = useState(user?.username || '');
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUsername({ username });
            alert('Username updated!');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to update username');
            alert('Failed to update username');
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
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
                    {error && <p className="text-red-500">{error}</p>}
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
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