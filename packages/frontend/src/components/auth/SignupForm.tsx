import React from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";

function SignupForm({onSwitch}: {onSwitch: () => void}) {
    return (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Sign up</DialogTitle>
                                <DialogDescription>
                                    Please enter your credentials to sign up.
                                </DialogDescription>
                            </DialogHeader>
                            <form>
                                <Input type="text" placeholder="Username" className='mb-4' />
                                <Input type="password" placeholder="Password" className='mb-4' />
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