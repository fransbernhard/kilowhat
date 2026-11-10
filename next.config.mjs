import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import crypto from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Set BASE_PATH when publishing under a subfolder, e.g. BASE_PATH=/kilowhat
const basePath = process.env.BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    sassOptions: {
        includePaths: [join(__dirname, 'src')],
    },
    // Same readable CSS module class names as Stig: File_Block__Element__hash
    webpack(config) {
        config.module.rules.forEach((rule) => {
            if (!rule.oneOf) return
            rule.oneOf.forEach((r) => {
                const uses = [r.use].flat().filter(Boolean)
                uses.forEach((u) => {
                    if (typeof u !== 'object' || !u.loader?.includes('css-loader') || !u.options?.modules) return
                    if (!r.test?.toString().includes('module')) return
                    u.options.modules.getLocalIdent = (ctx, _, localName) => {
                        const path = ctx.resourcePath || ''
                        const hash = crypto
                            .createHash('md5')
                            .update(path + localName)
                            .digest('hex')
                            .slice(0, 6)
                        if (!path.endsWith('.module.scss')) {
                            // Must return a valid string — undefined crashes postcss-modules-scope
                            return `${localName}__${hash}`
                        }
                        const name = path
                            .split('/')
                            .pop()
                            .replace(/\.module\.(scss|css|sass|less)$/, '')
                        return `${name}_${localName}__${hash}`
                    }
                })
            })
        })
        return config
    },
}

export default nextConfig
