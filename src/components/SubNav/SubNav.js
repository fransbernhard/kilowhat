'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import s from './SubNav.module.scss'

export default function SubNav({ links, label }) {
    const pathname = usePathname()

    return (
        <nav className={s.SubNav} aria-label={label}>
            <div className={s['SubNav__Inner']}>
                {links.map(({ path, label }) => (
                    <Link
                        key={path}
                        href={path}
                        aria-current={pathname === path ? 'page' : undefined}
                        className={`${s['SubNav__Link']} ${pathname === path ? s['SubNav__Link--Active'] : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
