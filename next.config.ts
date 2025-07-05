/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  sw: 'sw.js',
});

module.exports = withPWA({
  // Your other Next.js configurations go here
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Required for web-push in client-side environment if you try to use it directly
        net: false,
        tls: false,
      };
    }
    return config;
  },
});