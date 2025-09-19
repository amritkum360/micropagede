/**
 * API Configuration for different environments
 * Update these URLs based on your server setup
 */

export const API_CONFIG = {
  // Production API (your VPS server)
  // Replace 'your-vps-domain.com' with your actual VPS domain or IP
  production: 'https://your-vps-domain.com/api',
  
  // Development API (local)
  development: 'http://localhost:5000/api',
  
  // Fallback API (if the above don't work)
  fallback: 'https://api.aboutwebsite.in/api'
};

export const getApiUrl = () => {
  // Check environment variable first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return API_CONFIG.development;
  }
  
  // Default to production
  return API_CONFIG.production;
};

export const getAllPossibleUrls = () => {
  return [
    process.env.NEXT_PUBLIC_API_URL,
    API_CONFIG.production,
    API_CONFIG.development,
    API_CONFIG.fallback
  ].filter(Boolean);
};
