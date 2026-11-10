import SubNav from '@/components/SubNav'
import { findPage } from '@/lib/site'

const section = findPage('/ai')

export default function AiLayout({ children }) {
    return (
        <div style={{ '--page-accent': section.accent }}>
            <SubNav label="AI tools" links={section.children} />
            {children}
        </div>
    )
}
