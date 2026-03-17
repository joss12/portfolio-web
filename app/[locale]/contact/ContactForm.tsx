'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';


type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
    const t = useTranslations('contact');
    const locale = useLocale();
    const router = useRouter();
    const [state, setState] = useState<FormState>('idle');
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState('loading');
        setErrors({});

        const form = e.currentTarget;
        const body = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            let data: { success: boolean; errors?: Record<string, string[]> } = { success: false };

            try {
                data = await res.json();
            } catch {
                // response not JSON
            }

            if (res.ok && data.success) {
                setState('success');
                form.reset();
                setTimeout(() => {
                    router.push(`/${locale}`);
                }, 2000);
                return;
            }

            if (data.errors) {
                setErrors(data.errors);
            }

            setState('error');
        } catch {
            setState('error');
        }
    }

    return (
        <main className="mx-auto max-w-xl px-6 py-24">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-6">
                {t('eyebrow')}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
                {t('title')}
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed mb-12">
                {t('subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">
                        {t('name')}
                    </label>
                    <input id="name" name="name" type="text" required placeholder="John Doe" className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-cyan-500" />
                    {errors.name && <p className="text-xs text-red-400">{errors.name[0]}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">
                        {t('email')}
                    </label>
                    <input id="email" name="email" type="email" required placeholder="john@example.com" className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-cyan-500" />
                    {errors.email && <p className="text-xs text-red-400">{errors.email[0]}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">
                        {t('message')}
                    </label>
                    <textarea id="message" name="message" required rows={6} placeholder="Hey, I saw your DNS resolver project..." className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-cyan-500 resize-none" />
                    {errors.message && <p className="text-xs text-red-400">{errors.message[0]}</p>}
                </div>

                <button type="submit" disabled={state === 'loading'} className="mt-2 rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    {state === 'loading' ? t('sending') : t('send')}
                </button>

                {state === 'success' && (
                    <p className="text-sm text-emerald-400 text-center">{t('success')}</p>
                )}
                {state === 'error' && Object.keys(errors).length === 0 && (
                    <p className="text-sm text-red-400 text-center">{t('error')}</p>
                )}
            </form>
        </main>
    );
}
