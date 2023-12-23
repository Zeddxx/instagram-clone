/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "cloud.appwrite.io",
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
