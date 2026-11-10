import Link from 'next/link'
import Page, { Section, Table, Steps, Cards, Notice, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/ai')
const { accent } = findPage('/ai')

export default function AiOverviewPage() {
    return (
        <Page
            title="AI tools"
            accent={accent}
            sources={['google', 'ember']}
            intro="We use the same method for every AI tool. Only the data we can get is different."
        >
            <Section title="The method">
                <Steps
                    items={[
                        { title: 'Count how much we use it', body: <p>Tokens, prompts or credits, per month.</p> },
                        { title: 'Multiply by an energy figure', body: <p>Wh per token, prompt or credit.</p> },
                        {
                            title: 'Multiply by how clean the electricity is',
                            body: (
                                <p>
                                    Grams of CO₂e per kWh, for where the data centre is. If we don't know, we use the{' '}
                                    <Ref to="ember">world average</Ref>.
                                </p>
                            ),
                        },
                        { title: 'Show how sure we are', body: <p>A range when we estimate, one number when we measure.</p> },
                    ]}
                />
            </Section>

            <Section title="Tool by tool">
                <Table
                    head={['Tool', 'What we can count', 'Energy figure', 'How sure']}
                    rows={[
                        [<Link key="c" href="/ai/claude">Claude</Link>, 'Tokens per model', 'Our own estimate', 'Low–medium'],
                        [
                            <Link key="g" href="/ai/gemini">Gemini</Link>,
                            'Prompts per person',
                            <Ref key="gr" to="google">Google’s own: 0.24 Wh per prompt</Ref>,
                            'Medium',
                        ],
                        [<Link key="f" href="/ai/figma">Figma AI</Link>, 'AI credits per person', 'None published', 'Low'],
                        [<Link key="n" href="/ai/notion">Notion AI</Link>, 'AI credits per person', 'None published', 'Low'],
                    ]}
                />
            </Section>

            <Section title="How to use less">
                <Cards
                    items={[
                        {
                            tag: 'Model',
                            title: 'Pick the smallest model that works',
                            body: (
                                <p>
                                    Haiku or Sonnet for simple tasks, Opus only when needed. In{' '}
                                    <Link href="/ai/claude">our estimate</Link>, Opus uses about seven times more energy
                                    per token than Haiku.
                                </p>
                            ),
                        },
                        {
                            tag: 'Context',
                            title: 'Keep conversations short',
                            body: (
                                <p>
                                    Every step re-reads the whole conversation. Use <code>/clear</code> between tasks
                                    and <code>/compact</code> in long sessions.
                                </p>
                            ),
                        },
                        {
                            tag: 'Prompts',
                            title: 'Ask once, clearly',
                            body: <p>A clear prompt beats five retries. Each retry costs the full amount again.</p>,
                        },
                        {
                            tag: 'Size',
                            title: 'Send only what is needed',
                            body: (
                                <p>
                                    Long documents, images and video cost much more than text. Attach the part that
                                    matters.
                                </p>
                            ),
                        },
                    ]}
                />
            </Section>

            <Notice title="Share ranges, not exact numbers.">
                "Between X and Y kg CO₂e per person per month" is honest. An exact number we can't back up isn't.
            </Notice>
        </Page>
    )
}
