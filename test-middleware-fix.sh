#!/bin/bash

# Test Middleware Fix for Custom Domains
echo "🧪 Testing Middleware Fix for Custom Domains"
echo "============================================="

# Test domain
TEST_DOMAIN="hyfreefire.com"
VPS_IP="147.93.30.162"

echo "Testing domain: $TEST_DOMAIN"
echo "VPS IP: $VPS_IP"
echo ""

# Test 1: Check if custom domain page is being served
echo "1️⃣ Testing custom domain page routing..."
RESPONSE=$(curl -s -H "Host: $TEST_DOMAIN" http://$VPS_IP)

if [[ $RESPONSE == *"Amit Steel Traders"* ]]; then
    echo "✅ SUCCESS: Custom domain is showing the correct website!"
    echo "   Found: 'Amit Steel Traders' (hyfreefire.com content)"
elif [[ $RESPONSE == *"aboutwebsite"* ]]; then
    echo "❌ ISSUE: Still showing main website instead of custom domain"
    echo "   Found: 'aboutwebsite' (main site content)"
else
    echo "⚠️  UNKNOWN: Content not recognized"
    echo "   First 200 chars: ${RESPONSE:0:200}..."
fi
echo ""

# Test 2: Check response headers for debugging
echo "2️⃣ Checking response headers..."
HEADERS=$(curl -s -I -H "Host: $TEST_DOMAIN" http://$VPS_IP)
echo "Response headers:"
echo "$HEADERS" | head -5
echo ""

# Test 3: Check if it's HTML
echo "3️⃣ Checking response type..."
if [[ $RESPONSE == *"<html"* ]]; then
    echo "✅ HTML response detected"
    if [[ $RESPONSE == *"<title>"* ]]; then
        TITLE=$(echo "$RESPONSE" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
        echo "   Page title: $TITLE"
    fi
else
    echo "❌ Non-HTML response detected"
fi
echo ""

echo "🎯 Summary:"
echo "==========="
if [[ $RESPONSE == *"Amit Steel Traders"* ]]; then
    echo "🎉 SUCCESS: Custom domain is working correctly!"
    echo "✅ hyfreefire.com is showing the right website"
    echo ""
    echo "🌐 Test in browser:"
    echo "   http://$TEST_DOMAIN"
else
    echo "❌ ISSUE: Custom domain is not working correctly"
    echo "❌ Still showing wrong content"
    echo ""
    echo "🔧 Next steps:"
    echo "   1. Deploy the updated middleware code"
    echo "   2. Restart the frontend application"
    echo "   3. Test again"
fi
