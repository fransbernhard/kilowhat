// Sums the tokens in your local Claude Code logs (~/.claude/projects/**/*.jsonl), per month and model family.
// A way to get real numbers for one person before the organisation-wide data from the Admin API is in place.
// Nothing leaves your machine: it only reads the logs and prints totals.
//
//   npm run usage            all months
//   npm run usage 2026-10    one month
import { readFile, readdir } from 'fs/promises'
import { homedir } from 'os'
import { join } from 'path'

const ROOT = join(homedir(), '.claude', 'projects')
const onlyMonth = process.argv[2]

async function jsonlFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
    const files = await Promise.all(
        entries.map((e) => {
            const path = join(dir, e.name)
            if (e.isDirectory()) return jsonlFiles(path)
            return e.name.endsWith('.jsonl') ? [path] : []
        })
    )
    return files.flat()
}

const family = (model = '') => ['opus', 'sonnet', 'haiku'].find((f) => model.includes(f)) ?? 'other'

// A response is logged once per content block, all with the same message id — count each response once
const messages = new Map()
for (const file of await jsonlFiles(ROOT)) {
    const lines = (await readFile(file, 'utf8')).split('\n')
    for (const line of lines) {
        if (!line.includes('"usage"')) continue
        let row
        try {
            row = JSON.parse(line)
        } catch {
            continue
        }
        const usage = row.message?.usage
        if (row.type !== 'assistant' || !usage || row.message.model === '<synthetic>') continue
        const id = `${row.message.id}:${row.requestId ?? ''}`
        const prev = messages.get(id)
        if (prev && prev.usage.output_tokens >= (usage.output_tokens ?? 0)) continue
        messages.set(id, { month: row.timestamp?.slice(0, 7), model: row.message.model, usage })
    }
}

const totals = {}
for (const { month, model, usage } of messages.values()) {
    if (!month || (onlyMonth && month !== onlyMonth)) continue
    const key = `${month} ${family(model)}`
    const t = (totals[key] ??= { month, family: family(model), responses: 0, input: 0, cacheWrite: 0, cacheRead: 0, output: 0 })
    t.responses += 1
    t.input += usage.input_tokens ?? 0
    t.cacheWrite += usage.cache_creation_input_tokens ?? 0
    t.cacheRead += usage.cache_read_input_tokens ?? 0
    t.output += usage.output_tokens ?? 0
}

const rows = Object.values(totals).sort((a, b) => a.month.localeCompare(b.month) || a.family.localeCompare(b.family))
if (!rows.length) {
    console.log(`No usage found in ${ROOT}${onlyMonth ? ` for ${onlyMonth}` : ''}`)
    process.exit(0)
}

const m = (n) => (n / 1e6).toFixed(2).padStart(9)
console.log('Month    Model    Responses     Input  CacheWrite  CacheRead    Output   (millions of tokens)')
for (const r of rows) {
    console.log(
        `${r.month}  ${r.family.padEnd(7)} ${String(r.responses).padStart(9)} ${m(r.input)} ${m(r.cacheWrite)}  ${m(r.cacheRead)} ${m(r.output)}`
    )
}
console.log('\nEnter the numbers for a month in the calculator under AI-tokens (in millions).')
