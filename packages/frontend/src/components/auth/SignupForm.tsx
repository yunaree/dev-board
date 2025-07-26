import React from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import { useAuthStore } from '@/store/auth.store';

function SignupForm({onSwitch}: {onSwitch: () => void}) {
        const [username, setUsername] = React.useState('');
        const [password, setPassword] = React.useState('');
    const { register } = useAuthStore();

    
          const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                await register({ username, pass: password });
                // Можливо, тут треба закрити діалог або показати помилку
            };

    return (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Sign up</DialogTitle>
                                <DialogDescription>
                                    Please enter your credentials to sign up.
                                </DialogDescription>
                            </DialogHeader>
                            <form  onSubmit={handleSubmit}>
                                <Input type="text" placeholder="Username" className='mb-4' value={username} onChange={e => setUsername(e.target.value)}/>
                                <Input type="password" placeholder="Password" className='mb-4' value={password} onChange={e => setPassword(e.target.value)}/>
                                <Button type="submit" className='w-full'>Sign up</Button>

                                <div className="text-center text-sm text-muted-foreground mt-2">
                                    Don't have an account? <a href="#" className="text-blue-500 hover:underline" onClick={e => { e.preventDefault(); onSwitch(); }}>Log in</a>
                                </div>
                                    <div className="space-y-3 w-full flex flex-col items-center justify-center mt-4 border-t pt-4">
                                        <GoogleLoginButton onClick={() => alert("Hello")} />

                                        <GithubLoginButton onClick={() => alert("Hello")} />
                                    </div>
                            </form>
                        </DialogContent>
    );
}

export default SignupForm;