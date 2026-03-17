'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', update);
        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div className="fixed top-14 inset-x-0 z-40 h-0.5 bg-neutral-800">
            <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
