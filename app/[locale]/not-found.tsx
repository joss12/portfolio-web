import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
    const t = await getTranslations('not_found');

    return (
        <main className="mx-auto max-w-3xl px-6 py-24">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden mb-10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-950">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 font-mono text-xs text-neutral-500">Eddy Mouity</span>
                </div>
                <div className="px-5 py-5 font-mono text-sm flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-red-400">$ cd {'{requested path}'}</span>
                        <span className="text-neutral-500 pl-2">bash: cd: no such file or directory</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-amber-400">$ ls /pages</span>
                        <span className="text-neutral-300 pl-2">home &nbsp; about &nbsp; contact &nbsp; projects/</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-cyan-400">$ echo $?</span>
                        <span className="text-neutral-300 pl-2">404</span>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white mb-3">{t('title')}</h1>
            <p className="text-sm text-neutral-500 mb-8">{t('subtitle')}</p>

            <div className="flex items-center gap-4">
                <Link href="/" className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500">
                    {t('back_home')}
                </Link>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {t('contact')}
                </Link>
            </div>
        </main>
    );
}
