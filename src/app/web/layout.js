import SubNav from '@/components/SubNav'
import { findPage } from '@/lib/site'

const section = findPage('/web')

export default function WebLayout({ children }) {
    return (
        <div style={{ '--page-accent': section.accent }}>
            <SubNav label="Web" links={section.children} />
            {children}
        </div>
    )
}
