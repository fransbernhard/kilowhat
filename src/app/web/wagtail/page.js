import Page, { Section, Table, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/web/wagtail')
const { accent } = findPage('/web/wagtail')

export default function WagtailPage() {
    return (
        <Page
            title="Wagtail"
            accent={accent}
            sources={['wagtailEmissions', 'wagtail2025', 'wagtailAi', 'wagtailDocs']}
            intro="Wagtail has an active sustainability team. It measures its own site, estimates the footprint of every Wagtail site each year, and publishes the numbers."
        >
            <Section title="Numbers to compare with">
                <Table
                    head={['', 'CO₂e']}
                    rows={[
                        ['wagtail.org home page', <Ref key="a" to="wagtailEmissions">0.06 g per view (rating A)</Ref>],
                        ['Typical Wagtail site (2024)', <Ref key="b" to="wagtailAi">0.24 g per view</Ref>],
                        ['All known Wagtail sites (2025)', <Ref key="c" to="wagtail2025">5,173 tonnes, 6,431 sites</Ref>],
                        ['One Wagtail AI task', <Ref key="d" to="wagtailAi">0.05–0.67 g</Ref>],
                    ]}
                />
            </Section>

            <Section title="What Wagtail does">
                <ul>
                    <li>
                        <strong>Measures its own site</strong> with Lighthouse, and checks page size every week.{' '}
                        <Ref to="wagtailEmissions">See how</Ref>.
                    </li>
                    <li>
                        <strong>Publishes a yearly footprint</strong> for all Wagtail sites.{' '}
                        <Ref to="wagtail2025">2025 report</Ref>.
                    </li>
                    <li>
                        <strong>Measured its own AI features,</strong> so editors know what an AI task costs.{' '}
                        <Ref to="wagtailAi">Wagtail AI</Ref>.
                    </li>
                    <li>
                        <strong>Has a sustainability page in the docs</strong> for developers.{' '}
                        <Ref to="wagtailDocs">Sustainability considerations</Ref>.
                    </li>
                </ul>
            </Section>

            <Section title="Wagtail-specific tips">
                <ul>
                    <li>Use AVIF or WebP image renditions, and the right size for each place.</li>
                    <li>Use frontend caching, so Django doesn't render the page on every visit.</li>
                    <li>Think twice before turning on AI features for every editor.</li>
                </ul>
            </Section>
        </Page>
    )
}
