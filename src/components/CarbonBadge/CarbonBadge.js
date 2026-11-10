'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { co2 } from '@tgwf/co2'
import s from './CarbonBadge.module.scss'

const estimator = new co2()

// HTTP Archive global average page weight (desktop + mobile median, 2024)
// https://httparchive.org/reports/page-weight
const AVG_PAGE_BYTES = 2_300_000
const AVG_MG = Math.round(estimator.perVisit(AVG_PAGE_BYTES, false) * 1000)

export default function CarbonBadge() {
    const [mg, setMg] = useState(null)
    const pathname = usePathname()
    const navStartRef = useRef(-Infinity)

    useEffect(() => {
        const captureAfter = navStartRef.current
        navStartRef.current = performance.now()
        setMg(null)

        const measure = () => {
            const entries = [
                ...performance.getEntriesByType('resource'),
                ...performance.getEntriesByType('navigation'),
            ]
            const bytes = entries
                .filter((e) => e.startTime >= captureAfter)
                .reduce((sum, e) => sum + (e.transferSize || e.encodedBodySize || 0), 0)
            setMg(Math.round(estimator.perVisit(Math.max(bytes, 1024), false) * 1000))
        }

        const timer = setTimeout(measure, 800)
        return () => clearTimeout(timer)
    }, [pathname])

    const pct = mg !== null ? Math.round((1 - mg / AVG_MG) * 100) : null

    return (
        <span className={`${s.CarbonBadge} ${mg === null ? s['CarbonBadge--Loading'] : ''}`}>
            {mg === null ? '~… mg CO₂' : `~${mg} mg CO₂`}
            {mg !== null && (
                <span className={s['CarbonBadge__Tooltip']}>
                    <p className={s['CarbonBadge__TooltipDesc']}>
                        Estimated CO₂ for this page, from the data it downloaded (Sustainable Web Design model).
                    </p>
                    <span className={s['CarbonBadge__TooltipRows']}>
                        <span className={s['CarbonBadge__TooltipRow']}>
                            <span>This page</span>
                            <strong>{mg} mg</strong>
                        </span>
                        <span className={s['CarbonBadge__TooltipRow']}>
                            <span>Average web page</span>
                            <span>{AVG_MG} mg</span>
                        </span>
                    </span>
                    <p className={`${s['CarbonBadge__TooltipVerdict']} ${pct > 0 ? s['CarbonBadge__TooltipVerdict--Good'] : s['CarbonBadge__TooltipVerdict--Bad']}`}>
                        {pct > 0 ? `${pct}% below average` : `${Math.abs(pct)}% above average`}
                    </p>
                </span>
            )}
        </span>
    )
}
