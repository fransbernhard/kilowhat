import Page, { Section, Notice, Formula, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/ai/gemini')
const { accent } = findPage('/ai/gemini')

export default function GeminiPage() {
    return (
        <Page
            title="Gemini"
            accent={accent}
            sources={['google', 'googlePaper', 'gemini']}
            intro="Google is one of the few AI companies that has published its own energy figure. That makes Gemini the easiest tool to estimate."
        >
            <Section title="The energy figure">
                <p>
                    One typical text prompt in Gemini uses <strong>0.24 Wh</strong>, including data centre overhead.{' '}
                    <Ref to="google">Google published this</Ref> in August 2025.
                </p>
            </Section>

            <Section title="Where to find our usage">
                <ul>
                    <li>
                        Google Workspace Admin → Generative AI → <Ref to="gemini">Gemini reports</Ref>. Use per person and
                        per app.
                    </li>
                    <li>For exact counts, use the Gemini audit logs.</li>
                </ul>
            </Section>

            <Formula caption="Example: 50 people × 20 prompts a day × 21 work days = 21,000 prompts">
                21,000 × 0.24 Wh = 5 kWh ≈ 2.3 kg CO₂e a month
            </Formula>

            <Notice title="0.24 Wh is a typical short text prompt.">
                Long documents, images, video and Deep Research use much more. Treat it as a minimum.
            </Notice>
        </Page>
    )
}
