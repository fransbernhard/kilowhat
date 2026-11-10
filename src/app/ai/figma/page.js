import Page, { Section, Notice, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/ai/figma')
const { accent } = findPage('/ai/figma')

export default function FigmaPage() {
    return (
        <Page
            title="Figma AI"
            accent={accent}
            sources={['figmaCredits', 'figmaApi']}
            intro="Figma's AI features (like Figma Make) are counted in AI credits, not tokens. Figma doesn't say how much energy a credit uses."
        >
            <Section title="Where to find our usage">
                <ul>
                    <li>
                        Admin → AI credits → <Ref to="figmaCredits">View usage</Ref>. Shows who uses credits and how many.
                    </li>
                    <li>Organization and Enterprise plans can export a CSV.</li>
                    <li>
                        Enterprise also has an <Ref to="figmaApi">API</Ref> for daily usage.
                    </li>
                </ul>
            </Section>

            <Section title="What to do">
                <ul>
                    <li>
                        <strong>For now:</strong> report credits per month as an activity number, without converting to kWh.
                    </li>
                    <li>
                        <strong>Next:</strong> ask Figma for the energy per credit, or which AI model each feature uses.
                        Then we can use the same method as for Claude.
                    </li>
                </ul>
            </Section>

            <Notice title="Don't count normal Figma use.">
                That energy is used by our own laptops, which are already part of the office electricity.
            </Notice>
        </Page>
    )
}
