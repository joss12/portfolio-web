'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { otherProjects } from '@/lib/projects';

export default function OtherProjects() {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-6">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-500 hover:text-neutral-300 transition-colors border border-neutral-800 rounded-lg px-4 py-2.5 hover:border-cyan-500/30"
            >
                {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {open ? 'Hide other projects' : 'Other projects'}
                <span className="ml-1 rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400">
                    {otherProjects.length}
                </span>
            </button>

            {open && (
                <div className="mt-4 flex flex-col gap-3">
                    {otherProjects.map((project, i) => (
                        <div
                            key={project.name}
                            className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5"
                            style={{
                                opacity: open ? 1 : 0,
                                transform: open ? 'translateY(0)' : 'translateY(10px)',
                                transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
                            }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                                    <span className={`rounded font-mono text-xs font-semibold px-2 py-0.5 ${project.tagColor}`}>
                                        {project.tag}
                                    </span>
                                </div>
                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="shrink-0 font-mono text-xs text-neutral-600 hover:text-cyan-400 transition-colors">
                                    GitHub ↗
                                </a>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                                {project.description}
                            </p>
                            <div className="border-l-2 border-cyan-500/20 pl-3">
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                    <span className="font-semibold text-neutral-500">Why: </span>
                                    {project.purpose}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
