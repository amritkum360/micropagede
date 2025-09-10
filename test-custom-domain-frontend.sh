#!/bin/bash

# Test Custom Domain Frontend Setup
# This script tests if custom domains are properly routed to the frontend

echo "🧪 Testing Custom Domain Frontend Setup"
echo "======================================="

# Test domain
TEST_DOMAIN="hyfreefire.com"
VPS_IP="147.93.30.162"

echo "Testing domain: $TEST_DOMAIN"
echo "VPS IP: $VPS_IP"
echo ""

# Test 1: Direct frontend test
echo "1️⃣ Testing direct frontend connection..."
FRONTEND_RESPONSE=$(curl -s -H "Host: $TEST_DOMAIN" http://localhost:3000)
if [ $? -eq 0 ]; then
    echo "✅ Frontend (port 3000) is responding"
    echo "   Response length: ${#FRONTEND_RESPONSE} characters"
    if [[ $FRONTEND_RESPONSE == *"<html"* ]]; then
        echo "   ✅ HTML response detected (good!)"
    else
        echo "   ⚠️  Non-HTML response detected"
    fi
else
    echo "❌ Frontend (port 3000) is not responding"
fi
echo ""

# Test 2: VPS external test
echo "2️⃣ Testing VPS external connection..."
VPS_RESPONSE=$(curl -s -H "Host: $TEST_DOMAIN" http://$VPS_IP)
if [ $? -eq 0 ]; then
    echo "✅ VPS external connection successful"
    echo "   Response length: ${#VPS_RESPONSE} characters"
    if [[ $VPS_RESPONSE == *"<html"* ]]; then
        echo "   ✅ HTML response detected (good!)"
    else
        echo "   ⚠️  Non-HTML response detected"
    fi
else
    echo "❌ VPS external connection failed"
fi
echo ""

# Test 3: Check if it's the correct website
echo "3️⃣ Checking website content..."
if [[ $VPS_RESPONSE == *"Amit Steel Traders"* ]]; then
    echo "✅ Correct website content detected!"
    echo "   Found: 'Amit Steel Traders'"
elif [[ $VPS_RESPONSE == *"hyfreefire"* ]]; then
    echo "✅ Website content detected!"
    echo "   Found: 'hyfreefire'"
else
    echo "⚠️  Website content not recognized"
    echo "   First 200 chars: ${VPS_RESPONSE:0:200}..."
fi
echo ""

# Test 4: Check response headers
echo "4️⃣ Checking response headers..."
HEADERS=$(curl -s -I -H "Host: $TEST_DOMAIN" http://$VPS_IP)
echo "Response headers:"
echo "$HEADERS" | head -10
echo ""

echo "🎯 Summary:"
echo "==========="
if [[ $VPS_RESPONSE == *"<html"* ]]; then
    echo "✅ SUCCESS: Custom domain is serving HTML content!"
    echo "✅ Frontend is properly rendering the website"
    echo ""
    echo "🌐 Test in browser:"
    echo "   http://$TEST_DOMAIN"
    echo "   (Make sure DNS is pointing to $VPS_IP)"
else
    echo "❌ ISSUE: Custom domain is not serving HTML content"
    echo "❌ Check nginx configuration and frontend setup"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   1. Run: sudo nginx -t"
    echo "   2. Check: sudo systemctl status nginx"
    echo "   3. Check: sudo systemctl status your-frontend-app"
    echo "   4. Check logs: sudo tail -f /var/log/nginx/error.log"
fi
