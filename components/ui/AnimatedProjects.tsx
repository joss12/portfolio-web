'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLLIElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <li
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${index * 100}ms, transform 0.4s ease ${index * 100}ms`,
            }}
        >
            <Link href={`/projects/${project.slug}`} className="group flex flex-col justify-between h-full rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                            {project.name}
                        </h3>
                        <span className={`shrink-0 ml-3 h-1.5 w-1.5 rounded-full mt-1.5 ${project.status === 'complete' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                        {project.description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`rounded font-mono text-xs font-semibold px-2 py-1 ${project.tagColor}`}>
                        {project.tag}
                    </span>
                    <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        View →
                    </span>
                </div>
            </Link>
        </li>
    );
}

export default function AnimatedProjects({ projects }: { projects: Project[] }) {
    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
            ))}
        </ul>
    );
}
