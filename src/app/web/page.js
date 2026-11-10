import Link from 'next/link'
import Page, { Section, Notice, Steps, Table, Formula, Cards, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/web')
const { accent } = findPage('/web')

export default function WebOverviewPage() {
    return (
        <Page
            title="Web pages"
            accent={accent}
            sources={['swd', 'wagtailAi', 'co2js', 'gmt']}
            intro={
                <>
                    Every CMS can be measured the same way, with the <Ref to="swd">Sustainable Web Design model</Ref>.
                    The idea: the more data a page sends, the more energy it uses.
                </>
            }
        >
            <Formula caption="Per page view. Multiply by page views to get the total.">
                CO₂e = page size × energy per GB × carbon per kWh
            </Formula>

            <Section title="CMS by CMS">
                <Table
                    head={['CMS', 'Community effort', 'Measuring tools', 'Published numbers']}
                    rows={[
                        [
                            <Link key="w" href="/web/wagtail">Wagtail</Link>,
                            'Active sustainability team',
                            'Docs guidance, external tools',
                            'Yes, yearly, for all Wagtail sites',
                        ],
                        [
                            <Link key="wp" href="/web/wordpress">WordPress</Link>,
                            'Official team disbanded in 2025',
                            'Third-party plugins',
                            'No',
                        ],
                        [
                            <Link key="u" href="/web/umbraco">Umbraco</Link>,
                            'Community sustainability team',
                            'Backoffice package, Umbraco Cloud dashboard',
                            'Per project, in Umbraco Cloud',
                        ],
                    ]}
                />
            </Section>

            <Section title="How to measure a site" eyebrow="Steps">
                <Steps
                    items={[
                        {
                            title: 'Pick a few pages',
                            body: <p>The home page, plus one of each page type (article, list, form).</p>,
                        },
                        {
                            title: 'Measure the page size',
                            body: <p>Use Lighthouse or WebPageTest on mobile. Measure a first visit and a repeat visit.</p>,
                        },
                        {
                            title: 'Convert to CO₂e',
                            body: (
                                <p>
                                    Use <Ref to="co2js">CO2.js</Ref> (<code>@tgwf/co2</code>). Tell it where the server
                                    is and if the host uses green energy.
                                </p>
                            ),
                        },
                        {
                            title: 'Multiply by page views',
                            body: <p>Average per page view × views per year = the site's yearly footprint.</p>,
                        },
                        {
                            title: 'Compare',
                            body: (
                                <p>
                                    A typical web page is about <Ref to="wagtailAi">0.36 g CO₂e</Ref> per view.
                                </p>
                            ),
                        },
                    ]}
                />
            </Section>

            <Section title="How to use less">
                <Cards
                    items={[
                        {
                            tag: 'Images',
                            title: 'Right format, right size',
                            body: <p>AVIF or WebP, and never bigger than it's shown on screen.</p>,
                        },
                        {
                            tag: 'Cache',
                            title: 'Don’t rebuild every page',
                            body: <p>A cache or CDN in front of the site, so pages aren't made again for every visit.</p>,
                        },
                        {
                            tag: 'Scripts',
                            title: 'Fewer extras',
                            body: (
                                <p>
                                    Trackers, chat widgets, web fonts and videos that play by themselves often weigh more
                                    than the page itself.
                                </p>
                            ),
                        },
                        {
                            tag: 'Budget',
                            title: 'Set a page size limit',
                            body: <p>Stop the build when a page gets too heavy. This project does it with npm run budget.</p>,
                        },
                    ]}
                />
            </Section>

            <Notice title="Page size is a rough guide.">
                It's good for comparing pages and tracking change over time. For exact server energy, use a tool like{' '}
                <Ref to="gmt">Green Metrics Tool</Ref>.
            </Notice>
        </Page>
    )
}
