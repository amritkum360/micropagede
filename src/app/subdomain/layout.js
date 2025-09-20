'use client';

import { useEffect } from 'react';
import Analytics from '@/components/Analytics';

export default function SubdomainLayout({ children }) {
  useEffect(() => {
    // Add any subdomain-specific logic here
    console.log('🌐 Subdomain Layout - Mounted');
    
    // You can add analytics, SEO meta tags, or other subdomain-specific logic here
    
    return () => {
      console.log('🌐 Subdomain Layout - Unmounted');
    };
  }, []);

  return (
    <div className="subdomain-layout">
      <Analytics />
      {children}
    </div>
  );
}
