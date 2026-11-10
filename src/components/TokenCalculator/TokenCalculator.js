'use client'

import { useMemo, useState } from 'react'
import {
    SCENARIOS,
    MODEL_FAMILIES,
    TOKEN_TYPES,
    GRIDS,
    DEFAULT_PUE,
    EXAMPLE_USAGE,
    WAGTAIL_PAGE_VIEW_G,
    estimate,
} from '@/lib/ai-energy'
import s from './TokenCalculator.module.scss'

const nf = (n, digits = 1) => n.toLocaleString('en-GB', { maximumFractionDigits: digits, minimumFractionDigits: 0 })
const kg = (g) => (g >= 1000 ? `${nf(g / 1000, 1)} kg` : `${nf(g, 0)} g`)

export default function TokenCalculator() {
    const [usage, setUsage] = useState(EXAMPLE_USAGE)
    const [people, setPeople] = useState(1)
    const [gridKey, setGridKey] = useState('world')
    const [customGrid, setCustomGrid] = useState(400)
    const [pue, setPue] = useState(DEFAULT_PUE)
    const [embodiedPct, setEmbodiedPct] = useState(0)

    const grid = GRIDS.find((g) => g.key === gridKey).value ?? (Number(customGrid) || 0)

    const results = useMemo(
        () =>
            SCENARIOS.map((scenario) => ({
                scenario,
                ...estimate(usage, scenario, { pue: Number(pue) || 1, grid, embodiedPct: Number(embodiedPct) || 0 }),
            })),
        [usage, pue, grid, embodiedPct]
    )

    const mid = results.find((r) => r.scenario.key === 'mid')
    const perPerson = Math.max(Number(people) || 1, 1)

    const setCell = (family, type, value) =>
        setUsage((prev) => ({ ...prev, [family]: { ...prev[family], [type]: value } }))

    return (
        <div className={s.TokenCalculator}>
            <fieldset className={s['TokenCalculator__Group']}>
                <legend className={s['TokenCalculator__Legend']}>Tokens per month, in millions</legend>
                <div className={s['TokenCalculator__TableWrap']}>
                    <table className={s['TokenCalculator__Table']}>
                        <thead>
                            <tr>
                                <th>Model</th>
                                {TOKEN_TYPES.map((t) => (
                                    <th key={t.key}>{t.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {MODEL_FAMILIES.map((f) => (
                                <tr key={f.key}>
                                    <th scope="row">
                                        {f.label}
                                        <span className={s['TokenCalculator__Factor']}>×{nf(f.factor)}</span>
                                    </th>
                                    {TOKEN_TYPES.map((t) => (
                                        <td key={t.key}>
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                inputMode="decimal"
                                                aria-label={`${f.label} ${t.label}, millions of tokens`}
                                                className={s['TokenCalculator__Input']}
                                                value={usage[f.key][t.key]}
                                                onChange={(e) => setCell(f.key, t.key, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className={s['TokenCalculator__Hint']}>
                    Filled in with one developer’s month of Claude Code. Run <code>npm run usage</code> for your own
                    numbers, or get the whole company’s from the Enterprise Analytics API.
                </p>
            </fieldset>

            <div className={s['TokenCalculator__Settings']}>
                <label className={s['TokenCalculator__Field']}>
                    <span>People</span>
                    <input
                        type="number"
                        min="1"
                        className={s['TokenCalculator__Input']}
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                    />
                </label>
                <label className={s['TokenCalculator__Field']}>
                    <span>Electricity (I)</span>
                    <select
                        className={s['TokenCalculator__Input']}
                        value={gridKey}
                        onChange={(e) => setGridKey(e.target.value)}
                    >
                        {GRIDS.map((g) => (
                            <option key={g.key} value={g.key}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                </label>
                {gridKey === 'custom' && (
                    <label className={s['TokenCalculator__Field']}>
                        <span>gCO₂e/kWh</span>
                        <input
                            type="number"
                            min="0"
                            className={s['TokenCalculator__Input']}
                            value={customGrid}
                            onChange={(e) => setCustomGrid(e.target.value)}
                        />
                    </label>
                )}
                <label className={s['TokenCalculator__Field']}>
                    <span>PUE</span>
                    <input
                        type="number"
                        min="1"
                        step="0.01"
                        className={s['TokenCalculator__Input']}
                        value={pue}
                        onChange={(e) => setPue(e.target.value)}
                    />
                </label>
                <label className={s['TokenCalculator__Field']}>
                    <span>Hardware (M), +%</span>
                    <input
                        type="number"
                        min="0"
                        className={s['TokenCalculator__Input']}
                        value={embodiedPct}
                        onChange={(e) => setEmbodiedPct(e.target.value)}
                    />
                </label>
            </div>

            <div className={s['TokenCalculator__Results']} aria-live="polite">
                {results.map(({ scenario, kwh, grams, gPerKOutput, pageViews }) => (
                    <div
                        key={scenario.key}
                        className={`${s['TokenCalculator__Result']} ${scenario.key === 'mid' ? s['TokenCalculator__Result--Mid'] : ''}`}
                    >
                        <span className={s['TokenCalculator__ResultLabel']}>{scenario.label}</span>
                        <strong className={s['TokenCalculator__ResultValue']}>{nf(kwh, kwh < 10 ? 1 : 0)} kWh</strong>
                        <span className={s['TokenCalculator__ResultSub']}>{kg(grams)} CO₂e</span>
                        <dl className={s['TokenCalculator__ResultList']}>
                            <div>
                                <dt>Per person</dt>
                                <dd>
                                    {nf(kwh / perPerson, 1)} kWh · {kg(grams / perPerson)}
                                </dd>
                            </div>
                            <div>
                                <dt>Per 1,000 output tokens</dt>
                                <dd>{nf(gPerKOutput, 1)} g</dd>
                            </div>
                            <div>
                                <dt>Same as Wagtail page views</dt>
                                <dd>{nf(pageViews, 0)}</dd>
                            </div>
                        </dl>
                        <p className={s['TokenCalculator__ResultNote']}>{scenario.note}</p>
                    </div>
                ))}
            </div>

            <div className={s['TokenCalculator__Share']}>
                <p className={s['TokenCalculator__ShareTitle']}>Where the energy goes (mid)</p>
                <div className={s['TokenCalculator__Bar']} role="img" aria-label="Energy by token type">
                    {TOKEN_TYPES.map((t) =>
                        mid.share[t.key] > 0.005 ? (
                            <span
                                key={t.key}
                                className={`${s['TokenCalculator__BarPart']} ${s[`TokenCalculator__BarPart--${t.key}`]}`}
                                style={{ width: `${mid.share[t.key] * 100}%` }}
                            />
                        ) : null
                    )}
                </div>
                <ul className={s['TokenCalculator__ShareList']}>
                    {TOKEN_TYPES.map((t) => (
                        <li key={t.key}>
                            <span
                                className={`${s['TokenCalculator__Dot']} ${s[`TokenCalculator__BarPart--${t.key}`]}`}
                                aria-hidden="true"
                            />
                            {t.label} {nf(mid.share[t.key] * 100, 0)}%
                        </li>
                    ))}
                </ul>
                <p className={s['TokenCalculator__Hint']}>
                    One Wagtail page view = {nf(WAGTAIL_PAGE_VIEW_G, 2)} g CO₂e (the median in 2024).
                </p>
            </div>
        </div>
    )
}
