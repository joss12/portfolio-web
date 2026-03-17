'use client';

import { useState } from 'react';
import BootScreen from './BootScreen';

export default function BootWrapper({ children }: { children: React.ReactNode }) {
    const [booted, setBooted] = useState(false);

    return (
        <>
            {!booted && <BootScreen onComplete={() => setBooted(true)} />}
            <div
                style={{
                    opacity: booted ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                }}
            >
                {children}
            </div>
        </>
    );
}
