'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import { useAuthStore } from '../../store/auth.store';

function LoginForm({onSwitch}: {onSwitch: () => void}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthStore();

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            await login({ username, pass: password });
            // Можливо, тут треба закрити діалог або показати помилку
        };

        const handleGoogleLogin = () => {
        window.location.href = 'https://dev-board.onrender.com/auth/google';
    };

    const handleGithubLogin = () => {
        window.location.href = 'https://dev-board.onrender.com/auth/github';
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Log In</DialogTitle>
                <DialogDescription>
                    Please enter your credentials to log in.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Username" className='mb-4' value={username} onChange={e => setUsername(e.target.value)}/>
                <Input type="password" placeholder="Password" className='mb-4' value={password} onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" className='w-full'>Log In</Button>
                <div className="text-center text-sm text-muted-foreground mt-2">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline" onClick={e => { e.preventDefault(); onSwitch(); }}>Sign up</a>
                </div>
                    <div className="space-y-3 w-full flex flex-col items-center justify-center mt-4 border-t pt-4">
                        <GoogleLoginButton onClick={handleGoogleLogin} />
                        <GithubLoginButton onClick={handleGithubLogin} />
                    </div>
            </form>
        </DialogContent>
    );
}

export default LoginForm;