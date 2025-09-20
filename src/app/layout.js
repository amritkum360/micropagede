import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import NavigationLoader from "@/components/NavigationLoader";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://aboutwebsite.in'),
  title: "AboutWebsite - India's Simplest AI Website Builder | Create Your Professional Website in Minutes",
  description: "Build your professional 'About Me' website in minutes with AI. Perfect for doctors, CAs, students, influencers & professionals. No coding required. Get your aboutwebsite.in domain or connect custom domain.",
  keywords: "website builder, AI website builder, about me website, professional website, single page website, portfolio website, doctor website, CA website, student portfolio, influencer website, no code website builder, India website builder",
  authors: [{ name: "AboutWebsite Team" }],
  creator: "AboutWebsite",
  publisher: "AboutWebsite",
  robots: "index, follow",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aboutwebsite.in",
    title: "AboutWebsite - India's Simplest AI Website Builder",
    description: "Build your professional 'About Me' website in minutes with AI. Perfect for doctors, CAs, students, influencers & professionals. No coding required.",
    siteName: "AboutWebsite",
    images: [
      {
        url: "/logo.PNG",
        width: 1200,
        height: 630,
        alt: "AboutWebsite - AI Website Builder",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "AboutWebsite - India's Simplest AI Website Builder",
    description: "Build your professional 'About Me' website in minutes with AI. Perfect for doctors, CAs, students, influencers & professionals.",
    images: ["/logo.PNG"],
    creator: "@aboutwebsite_in",
  },
  
  // Additional metadata
  category: "technology",
  classification: "website builder, AI tools, professional services",
  
  // Verification tags (add your actual verification codes)
  verification: {
    google: "5GCl5NVbtgt6-2YdKb8Gdg-jv78ERRuY-hQQ6jDf5cY",
    yandex: "ee64b68c4e52693c",
  },
  
  // App metadata
  applicationName: "AboutWebsite",
  
  // Alternate languages
  alternates: {
    canonical: "https://aboutwebsite.in",
    languages: {
      "en-IN": "https://aboutwebsite.in",
      "hi-IN": "https://aboutwebsite.in",
    },
  },
  
  // Additional SEO
  other: {
    "geo.region": "IN",
    "geo.country": "India",
    "geo.placename": "India",
    "theme-color": "#0ea5e9",
    "msapplication-TileColor": "#0ea5e9",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AboutWebsite",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "description": "AI-powered website builder for creating professional 'About Me' single-page websites. Perfect for doctors, CAs, students, influencers, and professionals.",
    "url": "https://aboutwebsite.in",
    "author": {
      "@type": "Organization",
      "name": "AboutWebsite Team",
      "url": "https://aboutwebsite.in"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI-powered website generation",
      "Drag and drop builder",
      "Mobile responsive templates",
      "Custom domain support",
      "No coding required",
      "Professional templates",
      "Multi-language support"
    ],
    "screenshot": "https://aboutwebsite.in/logo.PNG",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "847"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AboutWebsite",
    "url": "https://aboutwebsite.in",
    "logo": "https://aboutwebsite.in/logo.PNG",
    "description": "India's simplest AI website builder for creating professional single-page websites",
    "foundingDate": "2024",
    "foundingLocation": {
      "@type": "Country",
      "name": "India"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Website Development",
      "AI Technology",
      "Web Design",
      "Professional Portfolios",
      "Digital Marketing"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AboutWebsite",
    "url": "https://aboutwebsite.in",
    "description": "AI-powered website builder for professionals",
    "inLanguage": ["en-IN", "hi-IN"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aboutwebsite.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavigationProvider>
            <Analytics />
            <NavigationLoader />
            {children}
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
