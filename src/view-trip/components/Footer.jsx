import React from 'react';

export default function Footer() {
    return (
        <footer className="pt-6">
            <div className="text-center">
                <h2 className="text-lg font-semibold">Created with ❤️ by Anuj Verma</h2>
                <p className="text-sm mt-2">© {new Date().getFullYear()} GoRide : AI Travel Planner App. All rights reserved.</p>
            </div>
        </footer>
    );
}
