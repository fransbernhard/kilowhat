import Link from 'next/link'
import { PAGES } from '@/lib/site'
import s from './HomePage.module.scss'

export default function HomePage() {
    return (
        <main className={s.HomePage}>
            <div className={s['HomePage__Hero']}>
                <div className={s['HomePage__HeroInner']}>
                    <p className={s['HomePage__Eyebrow']}>Kilowhat?</p>
                    <h1 className={s['HomePage__Title']}>
                        Tokens and page views
                        <br />
                        <span className={s['HomePage__TitleAccent']}>
                            to kWh and CO₂e
                        </span>
                    </h1>
                    <p className={s['HomePage__Subtitle']}>
                        How much energy our AI tools and web pages use, worked
                        out with one method: Software Carbon Intensity (SCI).
                    </p>
                </div>
            </div>

            <div className={s['HomePage__Body']}>
                <div className={s['HomePage__Grid']}>
                    {PAGES.map((page) => (
                        <Link
                            key={page.path}
                            href={page.path}
                            className={s['HomePage__Card']}
                            style={{ '--card-accent': page.accent }}
                        >
                            <div className={s['HomePage__CardMeta']}>
                                <span className={s['HomePage__Tag']}>
                                    {page.tag}
                                </span>
                                <span
                                    className={s['HomePage__Arrow']}
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </div>
                            <h2 className={s['HomePage__CardTitle']}>
                                {page.title}
                            </h2>
                            <p className={s['HomePage__CardDesc']}>
                                {page.description}
                            </p>
                        </Link>
                    ))}
                </div>

                <footer className={s['HomePage__Footer']}>
                    All numbers are estimates. The assumptions are shown on each
                    page.
                </footer>
            </div>
        </main>
    )
}
