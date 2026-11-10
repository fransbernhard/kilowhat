'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import CarbonBadge from '@/components/CarbonBadge/CarbonBadge'
import { PAGES } from '@/lib/site'
import s from './Nav.module.scss'

const LINKS = PAGES.map(({ path, label }) => ({ href: path, label }))

export default function Nav() {
    const pathname = usePathname()

    return (
        <header className={s.Nav}>
            <div className={s['Nav__Container']}>
                <Link href="/" className={s['Nav__Logo']} aria-label="Home">
                    <span className={s['Nav__FlameWrap']} aria-hidden="true">
                        <span className={s['Nav__FlameTrack']}>
                            <span className={s['Nav__Flame']}>⚡</span>
                            <span className={s['Nav__Flame']}>⚡</span>
                        </span>
                    </span>
                    Kilowhat?
                </Link>
                <nav className={s['Nav__Links']}>
                    {LINKS.map(({ href, label }) => {
                        const active = pathname === href || pathname.startsWith(`${href}/`)
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`${s['Nav__Link']} ${active ? s['Nav__Link--Active'] : ''}`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>
                <CarbonBadge />
            </div>
        </header>
    )
}
