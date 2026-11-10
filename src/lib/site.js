export const PAGES = [
    {
        path: '/sci',
        label: 'SCI',
        title: 'SCI: the formula',
        tag: 'Basics',
        accent: '#fbbf24',
        description:
            'One formula for the carbon cost of software. What each part means.',
    },
    {
        path: '/ai',
        label: 'AI tools',
        title: 'AI tools',
        tag: 'Claude · Gemini · Figma · Notion',
        accent: '#818cf8',
        description:
            'How we turn our use of Claude, Gemini, Figma and Notion AI into energy and CO₂e.',
        children: [
            {
                path: '/ai',
                label: 'Overview',
                title: 'AI tools',
                description:
                    'One method for every AI tool, and how sure we can be for each.',
            },
            {
                path: '/ai/claude',
                label: 'Claude',
                title: 'Claude: tokens to energy',
                description:
                    'Where to get our token numbers, the assumptions, and a calculator.',
            },
            {
                path: '/ai/gemini',
                label: 'Gemini',
                title: 'Gemini',
                description:
                    'Google’s own energy figure per prompt, and where to find our usage.',
            },
            {
                path: '/ai/figma',
                label: 'Figma',
                title: 'Figma AI',
                description:
                    'What Figma’s AI credits tell us, and what they don’t.',
            },
            {
                path: '/ai/notion',
                label: 'Notion',
                title: 'Notion AI',
                description:
                    'No sustainability reporting. AI use is counted in credits.',
            },
        ],
    },
    {
        path: '/web',
        label: 'Web',
        title: 'Web pages',
        tag: 'Wagtail · WordPress · Umbraco',
        accent: '#38bdf8',
        description:
            'How to measure one page view, and what each CMS community does about it.',
        children: [
            {
                path: '/web',
                label: 'Overview',
                title: 'Web pages',
                description:
                    'One method for every website, and how to make pages lighter.',
            },
            {
                path: '/web/wagtail',
                label: 'Wagtail',
                title: 'Wagtail',
                description:
                    'An active sustainability team that measures and publishes its numbers.',
            },
            {
                path: '/web/wordpress',
                label: 'WordPress',
                title: 'WordPress',
                description:
                    'No official team since 2025. Measuring is up to plugins and agencies.',
            },
            {
                path: '/web/umbraco',
                label: 'Umbraco',
                title: 'Umbraco',
                description:
                    'A community team, a backoffice package and a dashboard in Umbraco Cloud.',
            },
        ],
    },
    {
        path: '/hosting',
        label: 'Hosting',
        title: 'Green hosting',
        tag: 'Web',
        accent: '#4ade80',
        description:
            'What green hosting means, how to check a host, and what to ask.',
    },
]

// A page and its section (the top-level tab), for sub-pages like /ai/claude
export function findPage(path) {
    for (const page of PAGES) {
        if (page.path === path) return { ...page, section: page }
        const child = page.children?.find((c) => c.path === path)
        if (child) return { ...child, accent: page.accent, section: page }
    }
}

export function pageMetadata(path) {
    const { title, description } = findPage(path)
    return { title, description }
}
