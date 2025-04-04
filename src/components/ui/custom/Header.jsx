import React from 'react';
import { Button } from '../button';

export default function Header() {
    return (
        <header className="p-4 shadow-md bg-white flex justify-between items-center relative">
            <a href="/" className="flex items-center">
                <img src="/logo.png" className="h-12 w-auto" alt="GoRide Logo" />
                <span className="ml-3 text-xl font-bold text-gray-800">GoRide</span>
            </a>
            <div>
                <Button className="px-4 py-2 rounded">
                    Sign in
                </Button>
            </div>
        </header>
    );
}
