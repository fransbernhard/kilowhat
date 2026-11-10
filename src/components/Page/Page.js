import { SOURCES } from '@/lib/sources'
import s from './Page.module.scss'

// sources: keys from lib/sources.js, listed at the bottom of the page
export default function Page({ title, intro, accent, sources, children }) {
    return (
        <main className={s.Page} style={accent ? { '--page-accent': accent } : undefined}>
            <header className={s['Page__Header']}>
                <h1 className={s['Page__Title']}>{title}</h1>
                {intro && <p className={s['Page__Intro']}>{intro}</p>}
            </header>
            {children}
            {sources?.length > 0 && (
                <footer className={s['Page__Sources']}>
                    <h2 className={s['Page__SourcesTitle']}>Sources</h2>
                    <ul>
                        {sources.map((key) => (
                            <li key={key}>
                                <Ref to={key}>{SOURCES[key].label}</Ref>
                            </li>
                        ))}
                    </ul>
                </footer>
            )}
        </main>
    )
}

// An inline link to where a number or claim comes from: <Ref to="google">…</Ref>
export function Ref({ to, href, children }) {
    return (
        <a href={href ?? SOURCES[to].href} target="_blank" rel="noopener">
            {children}
        </a>
    )
}

export function Section({ title, eyebrow, children }) {
    return (
        <section className={s['Page__Section']}>
            {eyebrow && <p className={s['Page__Eyebrow']}>{eyebrow}</p>}
            {title && <h2 className={s['Page__SectionTitle']}>{title}</h2>}
            <div className={s['Page__Prose']}>{children}</div>
        </section>
    )
}

export function Notice({ title, children }) {
    return (
        <div className={s['Page__Notice']}>
            {title && <strong>{title}</strong>} {children}
        </div>
    )
}

export function Formula({ children, caption }) {
    return (
        <figure className={s['Page__Formula']}>
            <code>{children}</code>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

export function Steps({ items }) {
    return (
        <ol className={s['Page__Steps']}>
            {items.map(({ title, body }, i) => (
                <li key={i} className={s['Page__Step']}>
                    <span className={s['Page__StepNumber']} aria-hidden="true">
                        {i + 1}
                    </span>
                    <div>
                        <h3 className={s['Page__StepTitle']}>{title}</h3>
                        <div className={s['Page__StepBody']}>{body}</div>
                    </div>
                </li>
            ))}
        </ol>
    )
}

export function Cards({ items }) {
    return (
        <div className={s['Page__Cards']}>
            {items.map(({ tag, title, body }, i) => (
                <div key={i} className={s['Page__Card']}>
                    {tag && <span className={s['Page__CardTag']}>{tag}</span>}
                    <h3 className={s['Page__CardTitle']}>{title}</h3>
                    <div className={s['Page__CardBody']}>{body}</div>
                </div>
            ))}
        </div>
    )
}
