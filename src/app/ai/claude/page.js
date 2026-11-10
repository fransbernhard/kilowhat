import Page, { Section, Notice, Steps, Table, Formula, Ref } from '@/components/Page'
import TokenCalculator from '@/components/TokenCalculator'
import { findPage, pageMetadata } from '@/lib/site'
import { SCENARIOS, MODEL_FAMILIES } from '@/lib/ai-energy'

export const metadata = pageMetadata('/ai/claude')
const { accent } = findPage('/ai/claude')

const nf = (n) => n.toLocaleString('en-GB')

export default function ClaudePage() {
    return (
        <Page
            title="Claude: tokens to energy"
            accent={accent}
            sources={['claudeAnalytics', 'claudeUsage', 'google', 'hungry', 'ecologits', 'ember']}
            intro="We can count our tokens exactly. We can't measure the energy, because Anthropic doesn't publish it. So we estimate it, and always show a low, mid and high value."
        >
            <Formula caption="Done for each model and token type, then added up">
                Energy = tokens × energy per token × model size × data centre overhead
            </Formula>

            <Section title="1. Get the token numbers" eyebrow="What we can count">
                <p>
                    We have <strong>Claude Enterprise</strong>. Its API gives tokens per model and per product (chat,
                    Claude Code), split by type, for the whole company.
                </p>
                <ul>
                    <li>
                        <strong>Key:</strong> an <Ref to="claudeAnalytics">Analytics API key</Ref>. Only the <strong>primary owner</strong> can create it,
                        in claude.ai → Organization settings → API.
                    </li>
                    <li>
                        <strong>History:</strong> from 1 January 2026, up to 31 days per request.
                    </li>
                </ul>
            </Section>

            <Table
                head={['Source', 'What you get']}
                rows={[
                    [
                        <Ref key="1" to="claudeUsage">
                            <code>/v1/organizations/analytics/usage</code>
                        </Ref>,
                        <>
                            Tokens per model and product (<code>group_by[]=model&amp;group_by[]=product</code>). Add{' '}
                            <code>actor</code> for per person. The main source.
                        </>,
                    ],
                    [
                        'Enterprise user activity',
                        'Per person: chats, Claude Code sessions, commits, pull requests. Useful for “per pull request”.',
                    ],
                    [
                        <span key="3">Analytics dashboard in claude.ai</span>,
                        'Active users and activity, without code. A quick first look.',
                    ],
                    [<code key="4">npm run usage</code>, 'This project’s script. Your own local Claude Code logs.'],
                ]}
            />

            <Notice title="Check: is our plan seat-based or usage-based?">
                On a seat-based Enterprise plan, the token report{' '}
                <Ref to="claudeAnalytics">only covers usage credits</Ref>, not all use. If so, we
                need to ask Anthropic for the full numbers.
            </Notice>

            <Section title="2. The four token types">
                <ul>
                    <li>
                        <strong>Output:</strong> what Claude writes. The most expensive, because it's made one token at a
                        time.
                    </li>
                    <li>
                        <strong>Input:</strong> what we send. Much cheaper per token.
                    </li>
                    <li>
                        <strong>Cache write:</strong> input saved for reuse. About the same as input.
                    </li>
                    <li>
                        <strong>Cache read:</strong> saved input used again. The cheapest per token, but there are a lot
                        of them.
                    </li>
                </ul>
            </Section>

            <Section title="3. Our assumptions" eyebrow="What we estimate">
                <Table
                    head={['', ...SCENARIOS.map((s) => s.label)]}
                    rows={[
                        ['Wh per 1,000 output tokens', ...SCENARIOS.map((s) => nf(s.whPerKOutput))],
                        ['Input token (× an output token)', ...SCENARIOS.map((s) => nf(s.weights.input))],
                        ['Cache write (× an output token)', ...SCENARIOS.map((s) => nf(s.weights.cacheWrite))],
                        ['Cache read (× an output token)', ...SCENARIOS.map((s) => nf(s.weights.cacheRead))],
                    ]}
                />
                <ul>
                    <li>
                        <strong>Low</strong> is close to <Ref to="google">Google’s 0.24 Wh per Gemini prompt</Ref>.{' '}
                        <strong>High</strong> is close to the <Ref to="hungry">“How Hungry is AI?” study</Ref> (0.95 Wh
                        for a short Claude 3.7 Sonnet prompt). <strong>Mid</strong> is our working value in between.
                    </li>
                    <li>
                        <strong>Model size:</strong> {MODEL_FAMILIES.map((f) => `${f.label} ×${nf(f.factor)}`).join(', ')}.
                        Bigger models use more energy. Anthropic doesn't publish sizes, so these are guesses.
                    </li>
                    <li>
                        <strong>Data centre overhead (PUE):</strong> 1.12, meaning 12% extra for cooling and power.
                        From <Ref to="ecologits">EcoLogits</Ref> (1.09–1.14 for Anthropic’s cloud providers).
                    </li>
                </ul>
            </Section>

            <Notice title="Cache reads decide the result.">
                Claude Code re-reads the whole conversation at every step, so it uses about 300 cached tokens for every
                token it writes. How much energy a cached token uses is the number we most need from Anthropic.
            </Notice>

            <Section title="4. Calculator" eyebrow="Try it">
                <p>Enter a month of tokens. You get all three results, so we always show a range.</p>
            </Section>

            <TokenCalculator />

            <Section title="5. Scaling to 1,200 people" eyebrow="Our company">
                <p>
                    Not everyone uses Claude the same way. A developer in Claude Code uses far more than someone chatting.
                    The API gives the real numbers, so we don't need to guess. Until we have them, here's an example:
                </p>
                <Table
                    head={['If this many use Claude Code like the example', 'Low', 'Mid', 'High']}
                    rows={[
                        ['1 person', '3 kWh · 1.6 kg', '34 kWh · 16 kg', '257 kWh · 118 kg'],
                        ['100 people', '340 kWh · 160 kg', '3,400 kWh · 1.6 t', '25,700 kWh · 11.8 t'],
                    ]}
                />
                <p>
                    Per month, CO₂e at the <Ref to="ember">world average</Ref> (458 g/kWh). Chat use comes on top, and is much smaller per person. For the
                    report, divide the total by 1,200 to get <strong>per employee</strong>.
                </p>
            </Section>

            <Section title="6. Make it a routine">
                <Steps
                    items={[
                        {
                            title: 'Get tokens per model every month',
                            body: <p>A small script calls the usage report and saves the result.</p>,
                        },
                        {
                            title: 'Keep the assumptions in one file',
                            body: (
                                <p>
                                    They're in <code>src/lib/ai-energy.js</code>. Changes show up in the git history.
                                </p>
                            ),
                        },
                        {
                            title: 'Report three numbers',
                            body: <p>The total (low–high), per person per month, and per pull request.</p>,
                        },
                        {
                            title: 'Swap in real data when we get it',
                            body: <p>If Anthropic publishes figures, they replace our guesses.</p>,
                        },
                    ]}
                />
            </Section>
        </Page>
    )
}
