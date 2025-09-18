'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <Image
              src="/logo.PNG" 
              alt="AboutWebsite Logo" 
              width={32}
              height={32}
              className="w-32 h-14 object-contain"
              unoptimized={true}
            />            </div>
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
              Refund Policy
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
                <h2 className="text-2xl font-bold text-white mb-4">1. No Refund Policy</h2>
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-xl font-bold text-red-400">Important Notice</h3>
                  </div>
                  <p className="text-red-300 leading-relaxed">
                    <strong>AboutWebsite operates on a strict NO REFUND policy.</strong> All payments made for our services are final and non-refundable. By making a payment, you acknowledge and agree to this policy.
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This Refund Policy outlines our position regarding refunds, cancellations, and payment disputes. Please read this policy carefully before making any payments for our services.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We believe in transparency and want to ensure you understand our refund policy before committing to our services.
                </p>
              </section>

              {/* No Refunds Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Refund Policy Details</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">2.1 No Refunds Under Any Circumstances</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  AboutWebsite does not provide refunds for any of the following situations:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Change of mind or decision to discontinue service</li>
                  <li>Dissatisfaction with AI-generated content quality</li>
                  <li>Technical issues or service interruptions</li>
                  <li>Website performance or functionality issues</li>
                  <li>Custom domain setup or SSL certificate problems</li>
                  <li>Image upload limitations or restrictions</li>
                  <li>User error or misunderstanding of service features</li>
                  <li>Account suspension or termination</li>
                  <li>Service modifications or updates</li>
                  <li>Third-party service disruptions (Vercel, Razorpay, etc.)</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Subscription Services</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For subscription-based services:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>No refunds for unused subscription time</li>
                  <li>No refunds for partial months or days</li>
                  <li>No refunds for automatic renewals</li>
                  <li>No refunds for subscription upgrades or downgrades</li>
                  <li>No refunds for cancellation requests</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.3 One-Time Payments</h3>
                <p className="text-gray-300 leading-relaxed">
                  For one-time payments or purchases:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>No refunds for domain purchases</li>
                  <li>No refunds for SSL certificate purchases</li>
                  <li>No refunds for premium feature access</li>
                  <li>No refunds for custom development work</li>
                  <li>No refunds for consultation or support services</li>
                </ul>
              </section>

              {/* Payment Processing */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Payment Processing and Charges</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Payment Authorization</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By making a payment, you authorize us to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Charge your payment method for the full amount</li>
                  <li>Process payments through Razorpay</li>
                  <li>Apply any applicable taxes and fees</li>
                  <li>Set up automatic renewals for subscription services</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Payment Disputes</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you dispute a charge with your bank or payment provider:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>We will provide transaction records and service documentation</li>
                  <li>We will not process any refunds as per this policy</li>
                  <li>Your account may be suspended pending dispute resolution</li>
                  <li>We reserve the right to terminate your account</li>
                </ul>
              </section>

              {/* Service Guarantees */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Service Guarantees and Limitations</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">4.1 What We Provide</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We commit to providing:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Access to our website building platform</li>
                  <li>AI-powered content generation services</li>
                  <li>Technical support during business hours</li>
                  <li>Platform updates and maintenance</li>
                  <li>Documentation and user guides</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Service Limitations</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>100% uptime or uninterrupted service</li>
                  <li>Specific performance metrics or results</li>
                  <li>Compatibility with all third-party services</li>
                  <li>AI-generated content accuracy or appropriateness</li>
                  <li>Custom domain availability or approval</li>
                </ul>
              </section>

              {/* Cancellation Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Cancellation Policy</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">5.1 Subscription Cancellation</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You may cancel your subscription at any time, but:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>No refunds will be provided for unused time</li>
                  <li>Your service will continue until the end of the billing period</li>
                  <li>Access to premium features will be revoked immediately</li>
                  <li>Your data will be retained according to our data retention policy</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">5.2 Account Termination</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may terminate your account for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Violation of our Terms of Service</li>
                  <li>Fraudulent payment activities</li>
                  <li>Abuse of our services or resources</li>
                  <li>Non-payment of fees</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Account termination does not entitle you to any refunds.
                </p>
              </section>

              {/* Alternative Solutions */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Alternative Solutions</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">6.1 Support and Assistance</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Instead of refunds, we offer:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Technical support to resolve issues</li>
                  <li>Account adjustments or modifications</li>
                  <li>Service credits for future use (at our discretion)</li>
                  <li>Extended support periods for complex issues</li>
                  <li>Documentation and training resources</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">6.2 Contact Support</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you experience issues with our services, please:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Contact our support team first</li>
                  <li>Provide detailed information about the issue</li>
                  <li>Allow reasonable time for resolution</li>
                  <li>Work with us to find alternative solutions</li>
                </ul>
              </section>

              {/* Legal Compliance */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Legal Compliance</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">7.1 Consumer Rights</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This policy complies with applicable consumer protection laws. However, by using our services, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Our services are provided &quot;as is&quot; without warranties</li>
                  <li>You have read and understood this refund policy</li>
                  <li>You agree to the no-refund terms</li>
                  <li>You accept the risks associated with our services</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">7.2 Dispute Resolution</h3>
                <p className="text-gray-300 leading-relaxed">
                  Any disputes regarding payments or refunds will be resolved through our standard dispute resolution process as outlined in our Terms of Service.
                </p>
              </section>

              {/* Policy Updates */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Policy Updates</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. We will notify users of significant changes by:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to active users</li>
                  <li>Updating the &quot;Last updated&quot; date</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Continued use of our services after policy changes constitutes acceptance of the new terms.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have questions about this Refund Policy, please contact us:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">Email: <a href="mailto:support@aboutwebsite.in" className="text-sky-400 hover:text-sky-300">support@aboutwebsite.in</a></span>
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

              {/* Final Notice */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Final Notice</h2>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-xl font-bold text-yellow-400">Important Reminder</h3>
                  </div>
                  <p className="text-yellow-300 leading-relaxed">
                    <strong>By making any payment to AboutWebsite, you explicitly agree to this No Refund Policy.</strong> We encourage you to carefully consider your decision before making any payments and to contact our support team if you have any questions about our services.
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              This Refund Policy is effective as of January 2025 and will remain in effect until modified or terminated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
