import './globals.scss'
import Nav from '@/components/Nav'

export const metadata = {
    title: { default: 'Kilowhat?', template: '%s — Kilowhat?' },
    description:
        'The energy and carbon cost of our AI tools and web pages, using SCI',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Nav />
                {children}
            </body>
        </html>
    )
}
