import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  console.log('🚀 MIDDLEWARE TRIGGERED!');
  console.log('🌐 Host:', host);
  console.log('🌐 Path:', req.nextUrl.pathname);
  console.log('🌐 User-Agent:', req.headers.get('user-agent')?.substring(0, 50));

  // Parse host to extract subdomain
  const parts = host.split(".");
  let subdomain = parts[0];

  // Handle different environments
  const isLocalhost = host.includes('localhost');
  const isProduction = host.includes('aboutwebsite.in');
  
  console.log('🌐 Parts:', parts);
  console.log('🌐 Parts length:', parts.length);
  console.log('🌐 Subdomain:', subdomain);
  console.log('🌐 Is localhost:', isLocalhost);
  console.log('🌐 Is production:', isProduction);

  // Skip middleware for API routes, static files, and admin routes
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/builder') ||
    url.pathname.startsWith('/profile') ||
    url.pathname.startsWith('/reset-password') ||
    url.pathname.startsWith('/debug') ||
    url.pathname.startsWith('/subdomain/') ||
    url.pathname.startsWith('/published/')
  ) {
    console.log('🌐 Skipping for admin/subdomain route:', url.pathname);
    return NextResponse.next();
  }

  // Check if this is a custom domain (not aboutwebsite.in or localhost)
  const isCustomDomain = !isLocalhost && !host.includes('aboutwebsite.in');
  
  // Check if this is a subdomain request
  const hasSubdomain = isLocalhost ? 
    (parts.length >= 2 && parts[0] !== 'localhost') : 
    (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'aboutwebsite');
  
  console.log('🌐 Has subdomain:', hasSubdomain);
  console.log('🌐 Is custom domain:', isCustomDomain);

  // Handle custom domains - For VPS setup, let nginx handle it
  if (isCustomDomain) {
    console.log('🌐 Custom domain detected:', host);
    console.log('🌐 For VPS setup, nginx will handle this domain directly');
    
    // For VPS setup, nginx catches custom domains and forwards to backend
    // So we don't need to do anything here - just let it pass through
    return NextResponse.next();
  }

  // If no subdomain detected, show main site
  if (!hasSubdomain) {
    console.log('🌐 No subdomain, showing main site');
    return NextResponse.next();
  }

  // Extract subdomain and rewrite
  subdomain = parts[0];
  console.log('🌐 Processing subdomain:', subdomain);
  
  url.pathname = `/subdomain/${subdomain}`;
  console.log('🌐 Rewriting to:', url.pathname);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - custom domains (handled by nginx on VPS)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}