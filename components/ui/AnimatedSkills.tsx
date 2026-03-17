'use client';

import { useEffect, useRef, useState } from 'react';

const skills = [
    { category: 'Languages', items: ['Go', 'TypeScript', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'WebSockets'] },
    { category: 'Databases', items: ['PostgreSQL', 'Redis', 'SQLite'] },
    { category: 'Infra', items: ['Docker', 'Linux', 'Render', 'Vercel'] },
    { category: 'Concepts', items: ['Distributed Systems', 'Event Sourcing', 'Gossip Protocol', 'P2P Networking'] },
];

function SkillRow({ category, items, index }: { category: string; items: string[]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="grid grid-cols-4 gap-4 items-start"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`,
            }}
        >
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 pt-1">
                {category}
            </span>
            <div className="col-span-3 flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <span
                        key={item}
                        className="rounded border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-300"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 0.3s ease ${index * 80 + i * 40}ms, transform 0.3s ease ${index * 80 + i * 40}ms`,
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function AnimatedSkills() {
    return (
        <div className="flex flex-col gap-5">
            {skills.map((skill, index) => (
                <SkillRow key={skill.category} category={skill.category} items={skill.items} index={index} />
            ))}
        </div>
    );
}
