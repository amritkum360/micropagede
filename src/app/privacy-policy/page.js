'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white" style={{fontFamily: "'Playfair Display', 'Georgia', serif"}}>AboutWebsite</span>
            </div>
            <a 
              href="/" 
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
            <div className="prose prose-lg prose-invert max-w-none">
              
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to AboutWebsite ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website building platform and services.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Business information (business name, description, industry)</li>
                  <li>Payment information (processed securely through Razorpay)</li>
                  <li>Website content and customization preferences</li>
                  <li>Communication preferences and support requests</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Usage Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We automatically collect certain information about your use of our services:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and website interactions</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Referral sources and search terms</li>
                  <li>Error logs and performance data</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.3 Cookies and Tracking</h3>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings.
                </p>
              </section>

              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our website building services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Generate AI-powered content for your website</li>
                  <li>Communicate with you about your account and services</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send important updates, newsletters, and promotional content</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Providers</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may share information with trusted third-party service providers who assist us in operating our platform:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Razorpay:</strong> Payment processing and subscription management</li>
                  <li><strong>OpenAI:</strong> AI content generation services</li>
                  <li><strong>Vercel:</strong> Website hosting and deployment</li>
                  <li><strong>Email Services:</strong> Communication and notifications</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Legal Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may disclose your information if required by law or to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Comply with legal processes or government requests</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Prevent fraud or security issues</li>
                  <li>Enforce our Terms of Service</li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Secure payment processing through Razorpay</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or business purposes.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Account Closure:</strong> Close your account and delete associated data</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  To exercise these rights, please contact us at <a href="mailto:privacy@aboutwebsite.in" className="text-sky-400 hover:text-sky-300">privacy@aboutwebsite.in</a>
                </p>
              </section>

              {/* Third-Party Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our platform integrates with third-party services that have their own privacy policies:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Razorpay:</strong> <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Payment processing privacy policy</a></li>
                  <li><strong>OpenAI:</strong> <a href="https://openai.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">AI services privacy policy</a></li>
                  <li><strong>Vercel:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Hosting services privacy policy</a></li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We encourage you to review the privacy policies of these third-party services.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              {/* International Users */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. International Users</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our services are operated from India. If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed in India where our servers are located. By using our services, you consent to the transfer of your information to India.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Sending you an email notification</li>
                  <li>Updating the "Last updated" date at the top of this policy</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">Email: <a href="mailto:privacy@aboutwebsite.in" className="text-sky-400 hover:text-sky-300">privacy@aboutwebsite.in</a></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-300">Phone: <a href="tel:+91-7667267787" className="text-sky-400 hover:text-sky-300">+91-7667267787</a></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-300">Address: India</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              This Privacy Policy is effective as of January 2025 and will remain in effect except with respect to any changes in its provisions in the future.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
