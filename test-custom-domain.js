#!/usr/bin/env node

/**
 * Test script for custom domain functionality on VPS
 * This script tests the backend API endpoints for custom domains
 */

const http = require('http');

// Configuration
const BACKEND_URL = 'http://localhost:5000';
const TEST_DOMAIN = 'test.example.com';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsedBody = body ? JSON.parse(body) : {};
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: parsedBody
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testCustomDomainEndpoint() {
  log('\n🧪 Testing Custom Domain Endpoint', 'bright');
  log('=' * 50, 'blue');

  try {
    // Test 1: Check if backend is running
    log('\n1. Testing backend health...', 'yellow');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET'
    });

    if (healthResponse.statusCode === 200) {
      log('✅ Backend is running', 'green');
    } else {
      log('❌ Backend is not responding properly', 'red');
      return;
    }

    // Test 2: Test custom domain endpoint with non-existent domain
    log('\n2. Testing custom domain endpoint with non-existent domain...', 'yellow');
    const customDomainResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/websites/custom-domain/${encodeURIComponent(TEST_DOMAIN)}`,
      method: 'GET'
    });

    log(`Status: ${customDomainResponse.statusCode}`, 'blue');
    if (customDomainResponse.statusCode === 404) {
      log('✅ Correctly returns 404 for non-existent domain', 'green');
    } else {
      log('⚠️ Unexpected response for non-existent domain', 'yellow');
    }

    // Test 3: Test catch-all route with custom hostname
    log('\n3. Testing catch-all route with custom hostname...', 'yellow');
    const catchAllResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET',
      headers: {
        'Host': TEST_DOMAIN
      }
    });

    log(`Status: ${catchAllResponse.statusCode}`, 'blue');
    if (catchAllResponse.statusCode === 404) {
      log('✅ Catch-all route correctly handles custom domain', 'green');
    } else if (catchAllResponse.statusCode === 200) {
      log('✅ Catch-all route found website for custom domain', 'green');
    } else {
      log('⚠️ Unexpected response from catch-all route', 'yellow');
    }

    // Test 4: Test with www subdomain
    log('\n4. Testing with www subdomain...', 'yellow');
    const wwwResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET',
      headers: {
        'Host': `www.${TEST_DOMAIN}`
      }
    });

    log(`Status: ${wwwResponse.statusCode}`, 'blue');
    log('✅ WWW subdomain test completed', 'green');

    // Test 5: Test main domain (should serve React app)
    log('\n5. Testing main domain (should serve React app)...', 'yellow');
    const mainDomainResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET',
      headers: {
        'Host': 'aboutwebsite.in'
      }
    });

    log(`Status: ${mainDomainResponse.statusCode}`, 'blue');
    if (mainDomainResponse.statusCode === 200) {
      log('✅ Main domain correctly serves React app', 'green');
    } else {
      log('⚠️ Main domain response unexpected', 'yellow');
    }

  } catch (error) {
    log(`❌ Test failed with error: ${error.message}`, 'red');
  }
}

async function testDomainAvailability() {
  log('\n🧪 Testing Domain Availability Check', 'bright');
  log('=' * 50, 'blue');

  try {
    // Note: This requires authentication, so we'll just test the endpoint structure
    log('\n1. Testing domain availability endpoint structure...', 'yellow');
    
    const availabilityResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/domains/check-custom-domain/${encodeURIComponent(TEST_DOMAIN)}`,
      method: 'GET'
    });

    log(`Status: ${availabilityResponse.statusCode}`, 'blue');
    if (availabilityResponse.statusCode === 401) {
      log('✅ Domain availability endpoint requires authentication (expected)', 'green');
    } else {
      log('⚠️ Unexpected response from domain availability endpoint', 'yellow');
    }

  } catch (error) {
    log(`❌ Domain availability test failed: ${error.message}`, 'red');
  }
}

async function runTests() {
  log('🚀 Starting Custom Domain Tests for VPS Setup', 'bright');
  log('=' * 60, 'magenta');
  
  await testCustomDomainEndpoint();
  await testDomainAvailability();
  
  log('\n🎉 All tests completed!', 'bright');
  log('\n📋 Summary:', 'yellow');
  log('- Backend server should be running on port 5000', 'blue');
  log('- Nginx should be configured with catch-all server block', 'blue');
  log('- Custom domains should point to VPS IP via A records', 'blue');
  log('- DNS propagation may take up to 24 hours', 'blue');
  
  log('\n📖 For detailed setup instructions, see VPS_CUSTOM_DOMAIN_SETUP.md', 'magenta');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testCustomDomainEndpoint,
  testDomainAvailability,
  runTests
};
