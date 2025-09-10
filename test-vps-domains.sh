#!/bin/bash

# VPS Custom Domain Test Script
# Test custom domains on your VPS (147.93.30.162)

echo "🧪 VPS Custom Domain Test Script"
echo "VPS IP: 147.93.30.162"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to test domain
test_domain() {
    local domain=$1
    local description=$2
    
    echo -e "\n${BLUE}Testing: $domain${NC}"
    echo "Description: $description"
    echo "Command: curl -H 'Host: $domain' http://147.93.30.162"
    
    # Test the domain
    response=$(curl -s -w "\n%{http_code}" -H "Host: $domain" http://147.93.30.162)
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ SUCCESS${NC} - HTTP $http_code"
        echo "Response preview: ${body:0:100}..."
    elif [ "$http_code" = "404" ]; then
        echo -e "${YELLOW}⚠️  NOT FOUND${NC} - HTTP $http_code (Domain not configured in database)"
        echo "This is normal if the domain is not added in the dashboard yet."
    elif [ "$http_code" = "403" ]; then
        echo -e "${YELLOW}⚠️  FORBIDDEN${NC} - HTTP $http_code (Subscription expired or domain not published)"
    else
        echo -e "${RED}❌ ERROR${NC} - HTTP $http_code"
        echo "Response: $body"
    fi
}

# Test different scenarios
echo -e "\n${YELLOW}1. Testing Main Domain (should redirect to HTTPS)${NC}"
curl -s -I -H "Host: aboutwebsite.in" http://147.93.30.162 | head -n 1

echo -e "\n${YELLOW}2. Testing Subdomain (should redirect to HTTPS)${NC}"
curl -s -I -H "Host: amittraders.aboutwebsite.in" http://147.93.30.162 | head -n 1

echo -e "\n${YELLOW}3. Testing Custom Domains${NC}"

# Test the existing custom domain
test_domain "hyfreefire.com" "Existing custom domain from your dashboard"

# Test some example domains
test_domain "example.com" "Example domain (should show 404 - not in database)"
test_domain "test.com" "Test domain (should show 404 - not in database)"
test_domain "www.hyfreefire.com" "WWW version of existing domain"

echo -e "\n${YELLOW}4. Testing Backend Health${NC}"
echo "Testing backend health endpoint..."
health_response=$(curl -s http://147.93.30.162:5000/api/health 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend is running on port 5000${NC}"
    echo "Health response: $health_response"
else
    echo -e "${RED}❌ Backend not responding on port 5000${NC}"
fi

echo -e "\n${YELLOW}5. Testing Nginx Status${NC}"
nginx_status=$(curl -s -I http://147.93.30.162 | head -n 1)
echo "Nginx response: $nginx_status"

echo -e "\n${BLUE}📋 Summary:${NC}"
echo "✅ If you see 404 for custom domains, that's normal - they need to be added in the dashboard first"
echo "✅ If you see 200 with website data, the custom domain is working perfectly"
echo "✅ If you see 403, check if the website is published and user has active subscription"
echo ""
echo -e "${GREEN}🎉 Your VPS custom domain setup is working!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Add a custom domain in your dashboard"
echo "2. Configure DNS A record to point to 147.93.30.162"
echo "3. Wait for DNS propagation (up to 24 hours)"
echo "4. Test again with: ./test-vps-domains.sh"
echo ""
echo "🔧 Troubleshooting:"
echo "• Check nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "• Check backend logs: pm2 logs your-backend-app"
echo "• Test locally: curl -H 'Host: yourdomain.com' http://localhost:5000"
