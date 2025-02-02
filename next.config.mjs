/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "fr", "de"], // Supported languages
    defaultLocale: "en", // Default language
    //localeDetection: true, // Enable automatic locale detection
  },
};

export default nextConfig;
