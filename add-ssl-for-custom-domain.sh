#!/bin/bash

# Add SSL Certificate for Custom Domain
# This script adds SSL certificate for a specific custom domain

echo "🔒 Adding SSL Certificate for Custom Domain"
echo "==========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root: sudo ./add-ssl-for-custom-domain.sh"
    exit 1
fi

# Get domain from user
if [ -z "$1" ]; then
    echo "Usage: sudo ./add-ssl-for-custom-domain.sh <domain>"
    echo "Example: sudo ./add-ssl-for-custom-domain.sh hyfreefire.com"
    exit 1
fi

DOMAIN="$1"
echo "Domain: $DOMAIN"

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "❌ Certbot is not installed. Installing..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Check if domain is pointing to this server
echo "🔍 Checking if domain is pointing to this server..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)

echo "Server IP: $SERVER_IP"
echo "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    echo "⚠️  WARNING: Domain is not pointing to this server!"
    echo "   Server IP: $SERVER_IP"
    echo "   Domain IP: $DOMAIN_IP"
    echo "   Please update DNS A record first"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Add SSL certificate
echo "🔒 Adding SSL certificate for $DOMAIN..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate added successfully!"
    echo ""
    echo "🧪 Testing HTTPS connection..."
    HTTPS_RESPONSE=$(curl -s -I https://$DOMAIN)
    if [ $? -eq 0 ]; then
        echo "✅ HTTPS connection successful!"
        echo "   Response: $(echo "$HTTPS_RESPONSE" | head -1)"
    else
        echo "⚠️  HTTPS connection failed"
    fi
else
    echo "❌ Failed to add SSL certificate"
    echo "   Check domain DNS and try again"
fi

echo ""
echo "🌐 Test URLs:"
echo "   HTTP:  http://$DOMAIN"
echo "   HTTPS: https://$DOMAIN"
echo ""
echo "📝 Note: It may take a few minutes for SSL to propagate"
