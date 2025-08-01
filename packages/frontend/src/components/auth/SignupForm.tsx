import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import { useAuthStore } from '@/store/auth.store';
import { Loader2 } from "lucide-react";

function SignupForm({onSwitch}: {onSwitch: () => void}) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuthStore();

    
          const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setError('');
                setIsLoading(true);
                try {
                await register({ username, pass: password });
                } catch (err: any) {
                    if (err?.response?.data?.message) {
                        setError(err.response.data.message);
                    } else {
                        setError('Registration failed. Please try again.');
                    }
                    setUsername('');
                    setPassword('');
                }finally {
                    setIsLoading(false);
                }
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
                                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                                <Input type="text" placeholder="Username" className='mb-4' value={username} onChange={e => setUsername(e.target.value)}/>
                                <Input type="password" placeholder="Password" className='mb-4' value={password} onChange={e => setPassword(e.target.value)}/>
                                <Button type="submit" className='w-full'  disabled={isLoading}>
                                                          {isLoading ? (
                                                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                                            ) : (
                                                                "Log In"
                                                            )}
                                </Button>

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