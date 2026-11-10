import Page, { Section, Formula, Table, Cards, Notice, Ref } from '@/components/Page'
import { PAGES, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/sci')
const { accent } = PAGES.find((p) => p.path === '/sci')

export default function SciPage() {
    return (
        <Page
            title="SCI: the formula"
            accent={accent}
            sources={['sci', 'sciAiRatified', 'sciAi', 'swd']}
            intro={
                <>
                    SCI (Software Carbon Intensity) is a standard way to work out the carbon cost of software. It's an{' '}
                    <Ref to="sci">ISO standard</Ref> (ISO/IEC 21031:2024). It gives a rate, like grams per page view, not
                    just a total.
                </>
            }
        >
            <Formula caption="Energy times how dirty the electricity is, plus hardware, divided by a unit of use">
                SCI = (E × I + M) / R
            </Formula>

            <Section title="What each letter means">
                <Table
                    head={['', 'Meaning', 'For Claude', 'For a web page']}
                    rows={[
                        [<strong key="e">E</strong>, 'Energy used (kWh)', 'Tokens × energy per token', 'Page size × energy per GB'],
                        [
                            <strong key="i">I</strong>,
                            'Carbon per kWh of electricity (g/kWh)',
                            'Where the data centre is (not public, so we estimate)',
                            'Where the server and the visitors are',
                        ],
                        [
                            <strong key="m">M</strong>,
                            'Carbon from making the hardware',
                            'Servers and GPUs, spread over their lifetime',
                            <Ref key="m" to="swd">Included in the web model</Ref>,
                        ],
                        [
                            <strong key="r">R</strong>,
                            'The unit we divide by',
                            'Per token, per task, per person per month',
                            'Per page view',
                        ],
                    ]}
                />
            </Section>

            <Section title="SCI for AI">
                <p>
                    An extra part of the standard for AI,{' '}
                    <Ref to="sciAiRatified">agreed in December 2025</Ref>. It splits the work in two:
                </p>
            </Section>

            <Cards
                items={[
                    {
                        tag: 'The provider (Anthropic)',
                        title: 'Building the model',
                        body: <p>Training and preparing the model. Only Anthropic can measure this.</p>,
                    },
                    {
                        tag: 'The user (us)',
                        title: 'Using the model',
                        body: <p>Every request we send. This is the part we can measure and reduce.</p>,
                    },
                ]}
            />

            <Section>
                <p>
                    <Ref to="sciAi">The specification</Ref> suggests counting <strong>per token</strong> for chat models and <strong>per run</strong> for
                    agents. Claude Code is an agent, so "per task" or "per pull request" makes most sense for us.
                </p>
            </Section>

            <Notice title="We can count tokens, but not measure energy.">
                Anthropic doesn't publish energy figures. So we count tokens exactly and estimate the energy. We should
                say so clearly.
            </Notice>

            <Section title="Why a rate and not a total">
                <ul>
                    <li>A total grows when the company grows. A rate shows if we're getting more efficient.</li>
                    <li>Offsets and certificates don't lower the score. Only using less energy or cleaner energy does.</li>
                    <li>We still need the total for the sustainability report.</li>
                </ul>
            </Section>
        </Page>
    )
}
