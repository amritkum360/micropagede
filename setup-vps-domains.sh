#!/bin/bash

# VPS Custom Domain Setup Script
# This script sets up universal nginx configuration for automatic custom domain handling

echo "🚀 VPS Custom Domain Setup"
echo "=========================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root: sudo ./setup-vps-domains.sh"
    exit 1
fi

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx is not installed. Please install nginx first."
    exit 1
fi

# Check if backend is running
if ! netstat -tlnp | grep :5000 &> /dev/null; then
    echo "⚠️  Backend server is not running on port 5000"
    echo "   Please start your backend server first"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create backup of current nginx config
if [ -f "/etc/nginx/sites-available/aboutwebsite.in" ]; then
    cp /etc/nginx/sites-available/aboutwebsite.in /etc/nginx/sites-available/aboutwebsite.in.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backup created"
fi

# Create universal nginx config
cat > /etc/nginx/sites-available/aboutwebsite.in << 'EOF'
# ------------------------------
# Redirect HTTP -> HTTPS (ONLY for main domain + subdomains)
# ------------------------------
server {
    listen 80;
    server_name aboutwebsite.in www.aboutwebsite.in *.aboutwebsite.in;
    return 301 https://$host$request_uri;
}

# ------------------------------
# HTTPS block for main domain + subdomains
# ------------------------------
server {
    listen 443 ssl;
    server_name aboutwebsite.in www.aboutwebsite.in *.aboutwebsite.in;

    ssl_certificate /etc/letsencrypt/live/aboutwebsite.in-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aboutwebsite.in-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;   # Next.js frontend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# ------------------------------
# Universal Custom Domain Handler (HTTP)
# This catches ALL custom domains and forwards to backend
# ------------------------------
server {
    listen 80;
    server_name _;
    
    # Add debugging headers
    add_header X-Custom-Domain "true" always;
    add_header X-Backend-Port "5000" always;
    add_header X-Requested-Host $host always;
    
    location / {
        proxy_pass http://localhost:5000;   # Backend with website data
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;   # Critical for domain resolution
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# ------------------------------
# n8n subdomain -> port 5678
# ------------------------------
server {
    listen 80;
    server_name n8n.srv992268.hstgr.cloud;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo "✅ Universal nginx config created"

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration test passed"
else
    echo "❌ Nginx configuration test failed"
    exit 1
fi

# Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx

if [ $? -eq 0 ]; then
    echo "✅ Nginx reloaded successfully"
else
    echo "❌ Failed to reload nginx"
    exit 1
fi

# Test custom domain functionality
echo "🧪 Testing custom domain functionality..."
TEST_DOMAIN="test.example.com"
RESPONSE=$(curl -s -H "Host: $TEST_DOMAIN" http://localhost:5000)

if [ $? -eq 0 ]; then
    echo "✅ Custom domain test successful"
    echo "   Test domain: $TEST_DOMAIN"
    echo "   Response: ${RESPONSE:0:100}..."
else
    echo "⚠️  Custom domain test failed (this might be normal if no website exists for test domain)"
fi

echo ""
echo "🎉 VPS Custom Domain Setup Complete!"
echo "===================================="
echo ""
echo "📋 What this setup does:"
echo "   ✅ Automatically handles ALL custom domains"
echo "   ✅ No need to edit nginx config for new domains"
echo "   ✅ All custom domains point to your backend (port 5000)"
echo "   ✅ Main domain (aboutwebsite.in) points to frontend (port 3000)"
echo ""
echo "🔧 How it works:"
echo "   1. User adds custom domain in dashboard"
echo "   2. User configures DNS A record to point to your VPS IP"
echo "   3. Nginx automatically catches the domain and forwards to backend"
echo "   4. Backend serves the correct website based on domain"
echo ""
echo "📝 Next steps:"
echo "   1. Deploy your updated backend code"
echo "   2. Restart your backend server"
echo "   3. Test with a real custom domain"
echo ""
echo "🧪 Test commands:"
echo "   curl -H 'Host: yourdomain.com' http://localhost:5000"
echo "   curl -H 'Host: yourdomain.com' http://147.93.30.162"
echo ""
echo "📖 For troubleshooting, check:"
echo "   sudo tail -f /var/log/nginx/error.log"
echo "   sudo tail -f /var/log/nginx/access.log"
echo "   sudo systemctl status nginx"
