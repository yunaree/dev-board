import { Button } from '@/components/ui/button';
import React from 'react';

export default function page() {
    return (
    <div className="">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Home Page</h1>
        </div>
        <p className="mt-4">Welcome to the home page!</p>
        <Button className="mt-4">Click Me</Button>
    </div>
    );
}