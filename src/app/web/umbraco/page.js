import Page, { Section, Cards, Notice, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/web/umbraco')
const { accent } = findPage('/web/umbraco')

export default function UmbracoPage() {
    return (
        <Page
            title="Umbraco"
            accent={accent}
            sources={['umbracoCaseStudy', 'umbracoPackage', 'umbracoCloud', 'umbracoDocs', 'co2js', 'swd', 'ember']}
            intro="Umbraco has a community sustainability team, started in 2023. It's the only one of the three with measuring tools in both the editor and the hosting."
        >
            <Section title="Two ways to measure">
                <Cards
                    items={[
                        {
                            tag: 'Per page',
                            title: 'Sustainability package',
                            body: (
                                <p>
                                    A free <Ref to="umbracoPackage">community package</Ref>. Editors run a report on a
                                    page in the backoffice and get page size, CO₂e and a rating. It uses{' '}
                                    <Ref to="co2js">CO2.js</Ref> and checks if the host is green.{' '}
                                    <Ref to="umbracoCaseStudy">How it works</Ref>.
                                </p>
                            ),
                        },
                        {
                            tag: 'Per site',
                            title: 'Umbraco Cloud dashboard',
                            body: (
                                <p>
                                    For sites on Umbraco Cloud. Shows <Ref to="umbracoCloud">CO₂e per month</Ref> per
                                    project, from Azure's own data plus an estimate for data sent to visitors. Export as
                                    CSV.
                                </p>
                            ),
                        },
                    ]}
                />
            </Section>

            <Section title="What the dashboard leaves out">
                <ul>
                    <li>Visitors' devices.</li>
                    <li>Umbraco Cloud's own platform.</li>
                    <li>Single pages. It reports per project, not per page.</li>
                </ul>
                <p>
                    For data sent to visitors it uses the <Ref to="swd">Sustainable Web Design model</Ref> and the{' '}
                    <Ref to="ember">world average</Ref> electricity: about 29 g CO₂e per GB.
                </p>
            </Section>

            <Section title="Umbraco-specific tips">
                <p>
                    The <Ref to="umbracoDocs">sustainability best practices</Ref> in the Umbraco docs cover hosting,
                    backend, frontend and editors. Good to share with the whole team, not just developers.
                </p>
            </Section>

            <Notice title="Use both together.">
                The dashboard gives the yearly total for the report. The package shows editors which pages to fix.
            </Notice>
        </Page>
    )
}
