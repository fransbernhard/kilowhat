import Page, { Section, Notice, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/web/wordpress')
const { accent } = findPage('/web/wordpress')

export default function WordPressPage() {
    return (
        <Page
            title="WordPress"
            accent={accent}
            sources={['wpDisbanded', 'wpPlugins', 'websiteCarbon']}
            intro="WordPress has no official sustainability work any more. Measuring is up to plugins, agencies and us."
        >
            <Section title="What happened">
                <p>
                    WordPress had a sustainability team from 2023. It was{' '}
                    <Ref to="wpDisbanded">disbanded in January 2025</Ref>, before its carbon tool was finished.
                </p>
            </Section>

            <Section title="How to measure">
                <ul>
                    <li>
                        <strong>Use the shared method</strong> on the Overview tab. It works the same for WordPress.
                    </li>
                    <li>
                        <strong>Plugins:</strong> several <Ref to="wpPlugins">third-party plugins</Ref> estimate carbon
                        per page in the dashboard. Check which model they use before trusting the numbers.
                    </li>
                    <li>
                        <strong>Quick check:</strong> the <Ref to="websiteCarbon">Website Carbon Calculator</Ref> tests
                        one page at a time.
                    </li>
                </ul>
            </Section>

            <Section title="WordPress-specific tips">
                <ul>
                    <li>Fewer plugins. Each one can add scripts and styles to every page.</li>
                    <li>A light theme, instead of a page builder that loads everything everywhere.</li>
                    <li>Page caching, so PHP doesn't build the page on every visit.</li>
                </ul>
            </Section>

            <Notice title="No shared numbers to compare with.">
                Unlike Wagtail, WordPress has no published average. Compare against the typical web page instead.
            </Notice>
        </Page>
    )
}
