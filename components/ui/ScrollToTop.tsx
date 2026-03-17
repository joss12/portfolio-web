'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shadow-lg transition-all hover:border-indigo-500 hover:text-indigo-400"
        >
            <ArrowUp size={16} />
        </button>
    );
}
