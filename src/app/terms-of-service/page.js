'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <Link href="/" passHref>
            <Image
              src="/logo.PNG" 
              alt="AboutWebsite Logo" 
              width={32}
              height={32}
              className="w-32 h-14 object-contain"
              unoptimized={true}
            />  </Link>          </div>
            <Link 
              href="/" 
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to AboutWebsite (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website building platform and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  If you do not agree to these Terms, please do not use our services. We reserve the right to modify these Terms at any time, and your continued use of our services constitutes acceptance of any changes.
                </p>
              </section>

              {/* Service Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  AboutWebsite provides a comprehensive website building platform that includes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>AI-powered website content generation</li>
                  <li>Custom domain management and SSL certificates</li>
                  <li>Website hosting and deployment services</li>
                  <li>Template-based website building tools</li>
                  <li>Image upload and management (up to 30 images per user)</li>
                  <li>Subscription-based premium features</li>
                  <li>Customer support and technical assistance</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts and Registration</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Account Creation</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To use our services, you must create an account by providing accurate and complete information. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and up-to-date information</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Eligibility</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You must be at least 18 years old to create an account and use our services. By creating an account, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>You are of legal age to form a binding contract</li>
                  <li>You have the legal capacity to enter into these Terms</li>
                  <li>You are not prohibited from using our services under applicable law</li>
                  <li>All information provided is accurate and truthful</li>
                </ul>
              </section>

              {/* Acceptable Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">4.1 Permitted Uses</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You may use our services only for lawful purposes and in accordance with these Terms. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Use our services for legitimate business or personal purposes</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Maintain the security and integrity of our platform</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Prohibited Uses</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree not to use our services for any of the following prohibited activities:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Creating websites that promote illegal activities, violence, or hate speech</li>
                  <li>Uploading malicious software, viruses, or harmful code</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with or disrupting our services</li>
                  <li>Creating spam or unsolicited commercial content</li>
                  <li>Violating any intellectual property rights</li>
                  <li>Engaging in fraudulent or deceptive practices</li>
                  <li>Creating adult content or inappropriate material</li>
                  <li>Exceeding your allocated image upload limit (30 images)</li>
                </ul>
              </section>

              {/* Payment Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms and Subscriptions</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">5.1 Subscription Plans</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We offer various subscription plans with different features and pricing. All prices are in Indian Rupees (INR) and are subject to applicable taxes.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">5.2 Payment Processing</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Payments are processed securely through Razorpay. By making a payment, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Provide accurate payment information</li>
                  <li>Authorize us to charge your payment method</li>
                  <li>Pay all applicable taxes and fees</li>
                  <li>Comply with Razorpay&apos;s terms and conditions</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">5.3 Billing and Renewal</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Subscription fees are billed in advance on a monthly or annual basis. Your subscription will automatically renew unless you cancel before the renewal date.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">5.4 Refunds</h3>
                <p className="text-gray-300 leading-relaxed">
                  Refunds are handled in accordance with our Refund Policy. Generally, we offer a 7-day money-back guarantee for new subscriptions, subject to certain conditions.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">6.1 Our Intellectual Property</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  AboutWebsite and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">6.2 Your Content</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You retain ownership of all content you create, upload, or publish through our services. However, by using our services, you grant us a limited license to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Host, store, and display your content on our platform</li>
                  <li>Provide technical support and maintenance</li>
                  <li>Generate AI-powered content based on your inputs</li>
                  <li>Backup and restore your content</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">6.3 AI-Generated Content</h3>
                <p className="text-gray-300 leading-relaxed">
                  AI-generated content created through our platform is provided &quot;as is&quot; and we make no claims to ownership of such content. You are responsible for reviewing and ensuring the accuracy of all AI-generated content.
                </p>
              </section>

              {/* Privacy and Data */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Key points regarding data handling:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>We collect only necessary information to provide our services</li>
                  <li>Your data is encrypted and stored securely</li>
                  <li>We do not sell your personal information to third parties</li>
                  <li>You can request deletion of your data at any time</li>
                  <li>We comply with applicable data protection laws</li>
                </ul>
              </section>

              {/* Service Availability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Service Availability and Uptime</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We strive to maintain high service availability, but we cannot guarantee uninterrupted access to our services. We may experience:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Scheduled maintenance windows</li>
                  <li>Unscheduled downtime due to technical issues</li>
                  <li>Third-party service disruptions</li>
                  <li>Network connectivity issues</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We will make reasonable efforts to notify users of planned maintenance and to minimize service disruptions.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law, AboutWebsite shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Data loss or corruption</li>
                  <li>Service interruptions or downtime</li>
                  <li>Third-party actions or content</li>
                  <li>AI-generated content accuracy or appropriateness</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Our total liability to you for any claims arising from these Terms or our services shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">10.1 Termination by You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You may terminate your account at any time by contacting our support team. Upon termination:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Your access to our services will be discontinued</li>
                  <li>Your data will be deleted according to our data retention policy</li>
                  <li>You will not be entitled to refunds for unused subscription time</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">10.2 Termination by Us</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may terminate or suspend your account immediately if you:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Violate these Terms of Service</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Fail to pay subscription fees</li>
                  <li>Misuse our services or resources</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Disclaimers</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Warranties of merchantability and fitness for a particular purpose</li>
                  <li>Warranties regarding the accuracy or reliability of AI-generated content</li>
                  <li>Warranties of uninterrupted or error-free service</li>
                  <li>Warranties regarding third-party integrations</li>
                </ul>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law and Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">12.1 Governing Law</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">12.2 Dispute Resolution</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Any disputes arising from these Terms or our services shall be resolved through:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Good faith negotiations between the parties</li>
                  <li>Mediation if negotiations fail</li>
                  <li>Binding arbitration in accordance with Indian Arbitration and Conciliation Act</li>
                </ul>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Posting the updated Terms on our website</li>
                  <li>Sending you an email notification</li>
                  <li>Updating the &quot;Last updated&quot; date</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Your continued use of our services after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">Email: <a href="mailto:legal@aboutwebsite.in" className="text-sky-400 hover:text-sky-300">legal@aboutwebsite.in</a></span>
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

              {/* Severability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
                <p className="text-gray-300 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms will remain in full force and effect.
                </p>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              These Terms of Service are effective as of January 2025 and will remain in effect until modified or terminated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
