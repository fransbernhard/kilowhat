import Page, { Section, Notice, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/ai/notion')
const { accent } = findPage('/ai/notion')

export default function NotionPage() {
    return (
        <Page
            title="Notion AI"
            accent={accent}
            sources={['ditchCarbonNotion', 'notionAiSettings', 'notionCredits', 'notionAdminApi']}
            intro="Notion publishes no sustainability report and no energy figures. Like Figma, it counts AI use in credits."
        >
            <Section title="What Notion publishes">
                <p>
                    Nothing on its own emissions or energy, and no climate targets, according to{' '}
                    <Ref to="ditchCarbonNotion">DitchCarbon</Ref>. Notion runs on AWS, but Amazon's renewable energy
                    goals are Amazon's, not Notion's.
                </p>
            </Section>

            <Section title="Where to find our usage">
                <ul>
                    <li>
                        Settings → Notion AI shows <Ref to="notionAiSettings">credit use per member, group and agent</Ref>.
                        Admins can export it as a CSV.
                    </li>
                    <li>
                        Enterprise also has Settings → Analytics → AI usage, and an{' '}
                        <Ref to="notionAdminApi">Admin API</Ref> for credit usage.
                    </li>
                    <li>
                        Each Business and Enterprise member gets a <Ref to="notionCredits">monthly credit allowance</Ref>.
                    </li>
                </ul>
            </Section>

            <Section title="What to do">
                <ul>
                    <li>
                        <strong>For now:</strong> report credits per month as an activity number, without converting to kWh.
                    </li>
                    <li>
                        <strong>Next:</strong> ask Notion for the energy per credit, or which AI models it uses. Then we
                        can use the same method as for Claude.
                    </li>
                </ul>
            </Section>

            <Notice title="Don't count normal Notion use.">
                Writing and reading pages is ordinary web traffic. Only the AI features are counted here.
            </Notice>
        </Page>
    )
}
