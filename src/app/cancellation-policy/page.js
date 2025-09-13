'use client';

import React from 'react';

export default function CancellationPolicy() {
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
              Cancellation Policy
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Cancellation Overview</h2>
                <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-xl font-bold text-orange-400">Important Notice</h3>
                  </div>
                  <p className="text-orange-300 leading-relaxed">
                    <strong>You may cancel your subscription at any time, but no refunds will be provided.</strong> This policy outlines the cancellation process and what happens when you cancel your AboutWebsite subscription.
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This Cancellation Policy explains how to cancel your subscription, what happens when you cancel, and the implications of cancellation. Please read this policy carefully before making any cancellation decisions.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By subscribing to our services, you acknowledge and agree to this cancellation policy.
                </p>
              </section>

              {/* Subscription Cancellation */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Subscription Cancellation</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">2.1 How to Cancel</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can cancel your subscription through the following methods:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Dashboard Cancellation:</strong> Log into your account and cancel from the billing section</li>
                  <li><strong>Email Request:</strong> Send cancellation request to support@aboutwebsite.in</li>
                  <li><strong>WhatsApp:</strong> Contact us at +91-7667267787 for immediate assistance</li>
                  <li><strong>Phone Support:</strong> Call our support team during business hours</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Cancellation Processing</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cancellation requests are processed as follows:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Immediate Processing:</strong> Cancellation requests are processed immediately</li>
                  <li><strong>Confirmation Email:</strong> You will receive a cancellation confirmation email</li>
                  <li><strong>Service Continuation:</strong> Your service continues until the end of the current billing period</li>
                  <li><strong>No Refunds:</strong> No refunds are provided for unused subscription time</li>
                </ul>
              </section>

              {/* Cancellation Effects */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Effects of Cancellation</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Immediate Effects</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Upon cancellation, the following occurs immediately:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Automatic renewal is disabled</li>
                  <li>No future charges will be made</li>
                  <li>Cancellation confirmation is sent via email</li>
                  <li>Account status is updated to "Cancelled"</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Service Access</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your service access changes as follows:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Current Billing Period:</strong> Full access until the end of the current period</li>
                  <li><strong>After Expiry:</strong> Access to premium features is revoked</li>
                  <li><strong>Website Access:</strong> Your published websites remain accessible</li>
                  <li><strong>Data Retention:</strong> Your data is retained according to our data retention policy</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.3 Feature Limitations</h3>
                <p className="text-gray-300 leading-relaxed">
                  After cancellation, you lose access to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Premium templates and features</li>
                  <li>AI content generation services</li>
                  <li>Custom domain management</li>
                  <li>Priority customer support</li>
                  <li>Advanced analytics and insights</li>
                </ul>
              </section>

              {/* No Refund Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. No Refund Policy</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">4.1 Refund Restrictions</h3>
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-xl font-bold text-red-400">No Refunds</h3>
                  </div>
                  <p className="text-red-300 leading-relaxed">
                    <strong>AboutWebsite operates on a strict NO REFUND policy.</strong> Cancellation does not entitle you to any refunds, regardless of the reason for cancellation or the amount of unused service time.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Unused Service Time</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The following applies to unused service time:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>No refunds for partial months or days</li>
                  <li>No refunds for unused features or services</li>
                  <li>No refunds for early cancellation</li>
                  <li>No refunds for change of mind</li>
                  <li>No refunds for dissatisfaction with services</li>
                </ul>
              </section>

              {/* Reactivation */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Account Reactivation</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">5.1 Reactivation Process</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can reactivate your account at any time:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Log into your account dashboard</li>
                  <li>Select a new subscription plan</li>
                  <li>Complete the payment process</li>
                  <li>Immediate access to all premium features</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">5.2 Data Restoration</h3>
                <p className="text-gray-300 leading-relaxed">
                  Upon reactivation:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>All your previous data is restored</li>
                  <li>Website configurations are maintained</li>
                  <li>Custom domains are reconnected</li>
                  <li>Full access to all features is restored</li>
                </ul>
              </section>

              {/* Account Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Account Termination by Us</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">6.1 Termination Reasons</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may terminate your account for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Violation of Terms of Service</li>
                  <li>Fraudulent payment activities</li>
                  <li>Abuse of our services or resources</li>
                  <li>Non-payment of fees</li>
                  <li>Illegal or inappropriate use of our platform</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">6.2 Termination Process</h3>
                <p className="text-gray-300 leading-relaxed">
                  When we terminate your account:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Immediate suspension of all services</li>
                  <li>Notification sent to your registered email</li>
                  <li>No refunds provided for termination</li>
                  <li>Data retention according to our policy</li>
                </ul>
              </section>

              {/* Data Handling */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Handling After Cancellation</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">7.1 Data Retention</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  After cancellation, we retain your data for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>30 Days:</strong> Account data and configurations</li>
                  <li><strong>90 Days:</strong> Website content and customizations</li>
                  <li><strong>1 Year:</strong> Transaction records and billing information</li>
                  <li><strong>Indefinitely:</strong> Published websites remain accessible</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">7.2 Data Deletion</h3>
                <p className="text-gray-300 leading-relaxed">
                  You can request data deletion:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Contact our support team</li>
                  <li>Provide account verification</li>
                  <li>Data deletion within 30 days</li>
                  <li>Confirmation email sent upon completion</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For cancellation requests or questions about this policy, please contact us:
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

              {/* Policy Updates */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Policy Updates</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify this Cancellation Policy at any time. Changes will be effective immediately upon posting on our website. We will notify users of significant changes by:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to active users</li>
                  <li>Updating the "Last updated" date</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Continued use of our services after policy changes constitutes acceptance of the new terms.
                </p>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              This Cancellation Policy is effective as of January 2025 and will remain in effect until modified or terminated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
