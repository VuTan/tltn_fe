/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['m.media-amazon.com'], // Thêm hostname vào đây
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/**',  // Thêm phần đường dẫn nếu cần thiết
            },{
                protocol: 'https',
                hostname: 'images-na.ssl-images-amazon.com',
                port: '',
                pathname: '/images/**',  // Thêm phần đường dẫn nếu cần thiết
            },
        ],
    },
};

export default nextConfig;
