#!/bin/bash

# Test Both Custom Domains
echo "🧪 Testing Both Custom Domains"
echo "=============================="

VPS_IP="147.93.30.162"

# Test domains
DOMAINS=("hyfreefire.com" "jirocash.com")

for DOMAIN in "${DOMAINS[@]}"; do
    echo ""
    echo "🔍 Testing: $DOMAIN"
    echo "=================="
    
    # Test HTTP connection
    echo "1️⃣ Testing HTTP connection..."
    HTTP_RESPONSE=$(curl -s -H "Host: $DOMAIN" http://$VPS_IP)
    
    if [ $? -eq 0 ]; then
        echo "✅ HTTP connection successful"
        echo "   Response length: ${#HTTP_RESPONSE} characters"
        
        # Check if it's JSON (backend response)
        if [[ $HTTP_RESPONSE == *"{"* ]] && [[ $HTTP_RESPONSE == *"}"* ]]; then
            echo "   ✅ JSON response detected (backend working)"
            
            # Check for specific content
            if [[ $HTTP_RESPONSE == *"Amit Steel Traders"* ]]; then
                echo "   ✅ Found: 'Amit Steel Traders' (hyfreefire.com content)"
            elif [[ $HTTP_RESPONSE == *"jirocash"* ]]; then
                echo "   ✅ Found: 'jirocash' (jirocash.com content)"
            else
                echo "   ⚠️  Content not recognized"
            fi
        else
            echo "   ⚠️  Non-JSON response detected"
        fi
    else
        echo "❌ HTTP connection failed"
    fi
    
    # Test HTTPS connection (if SSL exists)
    echo "2️⃣ Testing HTTPS connection..."
    HTTPS_RESPONSE=$(curl -s -I https://$DOMAIN 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo "✅ HTTPS connection successful"
        echo "   Response: $(echo "$HTTPS_RESPONSE" | head -1)"
    else
        echo "⚠️  HTTPS connection failed (no SSL certificate)"
    fi
    
    # Test direct backend connection
    echo "3️⃣ Testing direct backend connection..."
    BACKEND_RESPONSE=$(curl -s -H "Host: $DOMAIN" http://localhost:5000)
    
    if [ $? -eq 0 ]; then
        echo "✅ Backend connection successful"
        if [[ $BACKEND_RESPONSE == *"{"* ]]; then
            echo "   ✅ Backend returning JSON data"
        fi
    else
        echo "❌ Backend connection failed"
    fi
done

echo ""
echo "🎯 Summary:"
echo "==========="
echo "✅ hyfreefire.com: Should work (has SSL + specific config)"
echo "❓ jirocash.com: Should work (catch-all config)"
echo ""
echo "🌐 Test URLs:"
echo "   http://hyfreefire.com"
echo "   http://jirocash.com"
echo "   https://hyfreefire.com (if SSL works)"
echo ""
echo "🔧 If jirocash.com doesn't work:"
echo "   1. Check DNS: dig jirocash.com"
echo "   2. Check backend: curl -H 'Host: jirocash.com' http://localhost:5000"
echo "   3. Check nginx: sudo nginx -t"
