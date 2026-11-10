import Link from 'next/link'
import Page, { Section, Notice, Steps, Table, Ref } from '@/components/Page'
import { findPage, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/hosting')
const { accent } = findPage('/hosting')

export default function HostingPage() {
    return (
        <Page
            title="Green hosting"
            accent={accent}
            sources={['ember', 'greenWebCheck', 'carbonTxt', 'co2js', 'wagtail2025']}
            intro="Every page view uses energy in the data centre. A host that runs on renewable power, in a region with clean electricity, makes that part much smaller."
        >
            <Section title="Two things that matter">
                <ul>
                    <li>
                        <strong>Where the server is.</strong> Electricity is much cleaner in some countries than others.
                        See <Ref to="ember">carbon per kWh by country</Ref>.
                    </li>
                    <li>
                        <strong>Where the host's power comes from,</strong> and whether they can prove it.
                    </li>
                </ul>
            </Section>

            <Section title="Not all “green” is the same">
                <Table
                    head={['What the host does', 'How much it counts']}
                    rows={[
                        ['Runs on its own renewable power, or buys it directly from a wind or solar farm', 'Most'],
                        ['Buys renewable energy certificates', 'Some'],
                        ['Offsets its emissions', 'Not at all in SCI'],
                    ]}
                />
            </Section>

            <Section title="How to check a host" eyebrow="Steps">
                <Steps
                    items={[
                        {
                            title: 'Run Green Web Check',
                            body: (
                                <p>
                                    Enter the domain in <Ref to="greenWebCheck">Green Web Check</Ref>. It tells you if the
                                    host has shown evidence of green power. Tools like Website Carbon and Ecograder use the
                                    same data.
                                </p>
                            ),
                        },
                        {
                            title: 'Look for a carbon.txt file',
                            body: (
                                <p>
                                    A <Ref to="carbonTxt">carbon.txt</Ref> file on the host's site links to their
                                    sustainability reports. We can add one to our own sites too.
                                </p>
                            ),
                        },
                        {
                            title: 'Ask the host',
                            body: (
                                <p>
                                    Which country is the server in? Where does the power come from, and how is it proven?
                                    What's the data centre overhead (PUE)?
                                </p>
                            ),
                        },
                        {
                            title: 'Use it in the calculation',
                            body: (
                                <p>
                                    <Ref to="co2js">CO2.js</Ref> lowers the data centre part when a host is verified green,
                                    and lets you set the server's country.
                                </p>
                            ),
                        },
                    ]}
                />
            </Section>

            <Section title="How to use less">
                <ul>
                    <li>Choose a host that can prove it runs on renewable power.</li>
                    <li>Choose a cloud region with clean electricity, if it works for the client.</li>
                    <li>Use a CDN, so files are served from nearby and the server does less work.</li>
                    <li>Turn off servers and test environments nobody uses.</li>
                    <li>Check every client site we host or manage, and list the results in one table.</li>
                </ul>
                <p>
                    For comparison: <Ref to="wagtail2025">48% of Wagtail sites</Ref> are on verified green hosts.
                </p>
            </Section>

            <Notice title="Green hosting is one part.">
                It shrinks the data centre share. The network and the visitor's device still use energy, so page size
                still matters. See the <Link href="/web">Web</Link> tab.
            </Notice>
        </Page>
    )
}
