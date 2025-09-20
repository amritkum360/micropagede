'use client';

import Head from 'next/head';

export default function SEOHead({ 
  title = "AboutWebsite - India's Simplest AI Website Builder",
  description = "Build your professional 'About Me' website in minutes with AI. Perfect for doctors, CAs, students, influencers & professionals. No coding required.",
  keywords = "website builder, AI website builder, about me website, professional website, single page website, portfolio website",
  canonical = "https://aboutwebsite.in",
  ogImage = "/logo.PNG",
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  nofollow = false,
  structuredData = null
}) {
  const robots = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0ea5e9" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="AboutWebsite" />
      <meta property="og:image" content={`https://aboutwebsite.in${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AboutWebsite - AI Website Builder" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://aboutwebsite.in${ogImage}`} />
      <meta name="twitter:creator" content="@aboutwebsite_in" />
      <meta name="twitter:site" content="@aboutwebsite_in" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="AboutWebsite Team" />
      <meta name="publisher" content="AboutWebsite" />
      <meta name="copyright" content="© 2025 AboutWebsite" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
