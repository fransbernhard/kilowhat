// Assumptions for turning Claude tokens into energy. Anthropic publishes no energy figures, so every
// number here is an estimate to be agreed on — change them here and the whole site follows.

// Energy for 1,000 output tokens on a mid-sized ("Sonnet-class") model, server energy before PUE.
// Other token types are weighted against an output token: reading the prompt (prefill) is done in
// parallel and costs far less per token than generating, and reading a cached prompt costs less still.
export const SCENARIOS = [
    {
        key: 'low',
        label: 'Low',
        whPerKOutput: 0.5,
        weights: { input: 0.05, cacheWrite: 0.05, cacheRead: 0.002 },
        note: 'Very efficient servers. Close to Google’s 0.24 Wh per Gemini prompt.',
    },
    {
        key: 'mid',
        label: 'Mid',
        whPerKOutput: 2,
        weights: { input: 0.1, cacheWrite: 0.1, cacheRead: 0.01 },
        note: 'Our suggested working value until we have better data.',
    },
    {
        key: 'high',
        label: 'High',
        whPerKOutput: 4,
        weights: { input: 0.2, cacheWrite: 0.2, cacheRead: 0.05 },
        note: 'Close to the “How Hungry is AI?” study (0.95 Wh for a short Claude 3.7 Sonnet prompt).',
    },
]

// Anthropic doesn't publish model sizes. Relative to a Sonnet-class model.
export const MODEL_FAMILIES = [
    { key: 'opus', label: 'Opus', factor: 2 },
    { key: 'sonnet', label: 'Sonnet', factor: 1 },
    { key: 'haiku', label: 'Haiku', factor: 0.3 },
]

export const TOKEN_TYPES = [
    { key: 'input', label: 'Input' },
    { key: 'cacheWrite', label: 'Cache write' },
    { key: 'cacheRead', label: 'Cache read' },
    { key: 'output', label: 'Output' },
]

// gCO2e/kWh. Claude runs on AWS and Google Cloud, mostly in the US, but the regions aren't public.
export const GRIDS = [
    { key: 'world', label: 'World average: 458 g/kWh', value: 458.29 },
    { key: 'ireland', label: 'Ireland: 257 g/kWh', value: 256.54 },
    { key: 'custom', label: 'Custom', value: null },
]

// EcoLogits' data center figures for Anthropic's cloud providers: PUE 1.09–1.14
export const DEFAULT_PUE = 1.12

// Median Wagtail page view in 2024, from Wagtail's yearly footprint report
export const WAGTAIL_PAGE_VIEW_G = 0.24

// Example: one developer's month of Claude Code, from `npm run usage` (millions of tokens)
export const EXAMPLE_USAGE = {
    opus: { input: 0.01, cacheWrite: 11, cacheRead: 500, output: 1.5 },
    sonnet: { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 },
    haiku: { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 },
}

// usage: { [family]: { [tokenType]: millions } }
export function estimate(usage, scenario, { pue, grid, embodiedPct = 0 }) {
    const byType = { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 }
    let outputTokens = 0

    for (const { key, factor } of MODEL_FAMILIES) {
        const row = usage[key] ?? {}
        for (const { key: type } of TOKEN_TYPES) {
            const thousands = (Number(row[type]) || 0) * 1000
            const weight = type === 'output' ? 1 : scenario.weights[type]
            byType[type] +=
                thousands * scenario.whPerKOutput * weight * factor * pue
        }
        outputTokens += (Number(row.output) || 0) * 1e6
    }

    const wh = Object.values(byType).reduce((a, b) => a + b, 0)
    const kwh = wh / 1000
    // SCI: (E × I) + M
    const operationalG = kwh * grid
    const grams = operationalG * (1 + embodiedPct / 100)

    return {
        kwh,
        grams,
        share: Object.fromEntries(
            Object.entries(byType).map(([k, v]) => [k, wh ? v / wh : 0]),
        ),
        gPerKOutput: outputTokens ? grams / (outputTokens / 1000) : 0,
        pageViews: grams / WAGTAIL_PAGE_VIEW_G,
    }
}
