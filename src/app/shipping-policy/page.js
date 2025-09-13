'use client';

import React from 'react';

export default function ShippingPolicy() {
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
              Shipping Policy
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Digital Service Delivery</h2>
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-blue-400">Important Notice</h3>
                  </div>
                  <p className="text-blue-300 leading-relaxed">
                    <strong>AboutWebsite provides digital services only.</strong> We do not ship physical products. All our services are delivered digitally through our online platform, including website building, AI content generation, domain management, and hosting services.
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This Shipping Policy outlines how we deliver our digital services, including website creation, AI content generation, domain setup, and hosting services. Since we provide digital services only, there are no physical shipping requirements.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  All services are delivered instantly or within specified timeframes through our online platform.
                </p>
              </section>

              {/* Service Delivery Methods */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Service Delivery Methods</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">2.1 Instant Digital Delivery</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The following services are delivered instantly upon payment:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Platform access and account activation</li>
                  <li>Website building tools and templates</li>
                  <li>AI content generation services</li>
                  <li>Image upload and management features</li>
                  <li>Basic hosting and deployment services</li>
                  <li>SSL certificate provisioning</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Time-Delayed Services</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Some services require additional processing time:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Custom Domain Setup:</strong> 24-48 hours for DNS propagation</li>
                  <li><strong>SSL Certificate Installation:</strong> 1-2 hours for certificate validation</li>
                  <li><strong>Website Deployment:</strong> 5-15 minutes for build and deployment</li>
                  <li><strong>AI Content Generation:</strong> 30 seconds to 2 minutes per request</li>
                  <li><strong>Technical Support:</strong> Response within 24 hours during business days</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.3 Delivery Confirmation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Service delivery is confirmed through:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Email notifications for service activation</li>
                  <li>Dashboard updates showing service status</li>
                  <li>Real-time status indicators on the platform</li>
                  <li>Automated deployment notifications</li>
                </ul>
              </section>

              {/* Service Availability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Service Availability and Access</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Global Availability</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our digital services are available worldwide:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>24/7 platform access from anywhere</li>
                  <li>No geographical restrictions</li>
                  <li>Internet connection required for service access</li>
                  <li>Compatible with all modern web browsers</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Service Hours</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  While our platform is available 24/7, certain services have specific hours:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Platform Access:</strong> 24/7 availability</li>
                  <li><strong>AI Content Generation:</strong> 24/7 availability</li>
                  <li><strong>Technical Support:</strong> Monday-Friday, 9 AM - 6 PM IST</li>
                  <li><strong>Domain Management:</strong> 24/7 with automated processing</li>
                  <li><strong>Hosting Services:</strong> 24/7 uptime target</li>
                </ul>
              </section>

              {/* Delivery Timeframes */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Delivery Timeframes</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">4.1 Standard Delivery Times</h3>
                <div className="bg-gray-700/50 rounded-lg p-6 mb-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                      <span className="text-gray-300">Account Activation</span>
                      <span className="text-white font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                      <span className="text-gray-300">Website Building Tools</span>
                      <span className="text-white font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                      <span className="text-gray-300">AI Content Generation</span>
                      <span className="text-white font-medium">30 seconds - 2 minutes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                      <span className="text-gray-300">Website Deployment</span>
                      <span className="text-white font-medium">5-15 minutes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                      <span className="text-gray-300">Custom Domain Setup</span>
                      <span className="text-white font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">SSL Certificate</span>
                      <span className="text-white font-medium">1-2 hours</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Delivery Delays</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Delivery may be delayed due to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Technical issues or maintenance</li>
                  <li>Third-party service disruptions</li>
                  <li>High server load or traffic</li>
                  <li>Domain registrar processing delays</li>
                  <li>SSL certificate authority delays</li>
                </ul>
              </section>

              {/* Service Access Requirements */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Service Access Requirements</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">5.1 Technical Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To access our services, you need:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Internet connection (broadband recommended)</li>
                  <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>JavaScript enabled in your browser</li>
                  <li>Valid email address for account verification</li>
                  <li>Payment method for subscription services</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">5.2 Account Requirements</h3>
                <p className="text-gray-300 leading-relaxed">
                  Service delivery requires:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Active account with valid payment</li>
                  <li>Completed account verification</li>
                  <li>Compliance with Terms of Service</li>
                  <li>No account restrictions or suspensions</li>
                </ul>
              </section>

              {/* Service Delivery Confirmation */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Service Delivery Confirmation</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">6.1 Delivery Notifications</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We confirm service delivery through:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Email notifications for service activation</li>
                  <li>Dashboard status updates</li>
                  <li>Real-time service indicators</li>
                  <li>Automated deployment confirmations</li>
                  <li>Domain setup completion notifications</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">6.2 Service Status Tracking</h3>
                <p className="text-gray-300 leading-relaxed">
                  You can track service delivery through:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>User dashboard with service status</li>
                  <li>Email notifications and updates</li>
                  <li>Real-time deployment logs</li>
                  <li>Domain management interface</li>
                  <li>Support ticket system</li>
                </ul>
              </section>

              {/* Service Modifications */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Service Modifications and Updates</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">7.1 Service Updates</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may update or modify services:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Platform improvements and new features</li>
                  <li>Security updates and patches</li>
                  <li>Performance optimizations</li>
                  <li>Third-party service integrations</li>
                  <li>UI/UX enhancements</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">7.2 Service Maintenance</h3>
                <p className="text-gray-300 leading-relaxed">
                  Scheduled maintenance may affect service delivery:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Advance notice provided for planned maintenance</li>
                  <li>Minimal downtime during maintenance windows</li>
                  <li>Emergency maintenance for critical issues</li>
                  <li>Service restoration as quickly as possible</li>
                </ul>
              </section>

              {/* Service Quality Assurance */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Service Quality Assurance</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">8.1 Service Standards</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We maintain high standards for service delivery:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>99.9% uptime target for hosting services</li>
                  <li>Fast response times for AI content generation</li>
                  <li>Secure and reliable platform infrastructure</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Quality assurance testing for all features</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">8.2 Service Monitoring</h3>
                <p className="text-gray-300 leading-relaxed">
                  We continuously monitor service delivery:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>24/7 system monitoring and alerting</li>
                  <li>Performance metrics and analytics</li>
                  <li>User feedback and satisfaction tracking</li>
                  <li>Automated error detection and resolution</li>
                  <li>Regular service health checks</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have questions about service delivery or experience any issues, please contact us:
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
                <h2 className="text-2xl font-bold text-white mb-4">10. Policy Updates</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify this Shipping Policy at any time. Changes will be effective immediately upon posting on our website. We will notify users of significant changes by:
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
              This Shipping Policy is effective as of January 2025 and will remain in effect until modified or terminated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
