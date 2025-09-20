'use client';

import { useEffect } from 'react';

export default function FAQStructuredData({ faqs = [] }) {
  useEffect(() => {
    if (faqs.length === 0) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);

  return null; // This component doesn't render anything
}

// Default FAQ data for AboutWebsite
export const defaultFAQs = [
  {
    question: "What is AboutWebsite?",
    answer: "AboutWebsite is India's simplest AI-powered website builder that helps professionals create beautiful 'About Me' single-page websites in minutes without any coding knowledge."
  },
  {
    question: "Who can use AboutWebsite?",
    answer: "AboutWebsite is perfect for doctors, CAs, students, influencers, professionals, business owners, and anyone who wants to create a professional online presence with a single-page website."
  },
  {
    question: "Do I need coding skills to use AboutWebsite?",
    answer: "No! AboutWebsite is designed to be completely code-free. Our AI handles all the technical work while you simply provide your details and choose from our professional templates."
  },
  {
    question: "Can I use my own domain name?",
    answer: "Yes! You can either use a free aboutwebsite.in subdomain or connect your own custom domain name to your website."
  },
  {
    question: "Is AboutWebsite mobile-friendly?",
    answer: "Absolutely! All websites created with AboutWebsite are fully responsive and mobile-optimized, ensuring they look perfect on all devices including phones, tablets, and desktops."
  },
  {
    question: "Can I edit my website after it's published?",
    answer: "Yes! You have full control through your dashboard. You can edit content, reorder sections, replace images, and make changes anytime. Simply hit publish to update your live website."
  },
  {
    question: "Does AboutWebsite support multiple languages?",
    answer: "Yes! AboutWebsite works seamlessly in English, Hindi, and Hinglish, making it perfect for Indian professionals who want to create content in their preferred language."
  },
  {
    question: "How long does it take to create a website?",
    answer: "With AboutWebsite's AI-powered system, you can create a professional website in just a few minutes. Simply provide your details, choose a template, and your website is ready!"
  },
  {
    question: "Is there customer support available?",
    answer: "Yes! We provide comprehensive customer support to help you with any questions or issues you might have while creating or managing your website."
  },
  {
    question: "Can I add my own images and content?",
    answer: "Absolutely! You can upload your own images, edit all text content, and customize every aspect of your website to match your personal or professional brand."
  }
];
