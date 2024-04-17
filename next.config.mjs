/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.w3schools.com', 'daisyui.com','res.cloudinary.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['.env'] = './.env.local'; // Adjust the path if needed
        }
        return config;
    },
    env: {
        BASE_URL: process.env.BASE_URL || 'http://localhost:8000', // Set your default base URL here
    },
};

export default nextConfig;
