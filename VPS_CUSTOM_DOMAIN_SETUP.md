# VPS Custom Domain Setup Guide

## Overview
This guide explains how to set up custom domains for your website builder application running on a VPS server.

## How It Works

### 1. Nginx Configuration
The Nginx server is configured with a catch-all server block that accepts any domain pointing to your VPS IP:

```nginx
# Custom domains catch-all server block
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;   # Your backend server
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Backend Handling
The backend server (port 5000) has a catch-all route that:
- Extracts the hostname from the request
- Looks up the website by custom domain in the database
- Returns the website data if found and published
- Handles subscription validation
- Returns appropriate error pages for missing/expired websites

### 3. Frontend Rendering
The custom domain page component renders the website using the UniversalTemplate component.

## Setup Instructions

### For Users (Website Owners)

1. **Add Custom Domain in Dashboard**
   - Go to your website dashboard
   - Navigate to domain settings
   - Enter your custom domain (e.g., `example.com`)
   - Save the configuration

2. **Configure DNS**
   - Go to your domain registrar's DNS settings
   - Add an A record pointing to your VPS IP address:
     ```
     Type: A
     Name: @ (or your domain)
     Value: 147.93.30.162
     TTL: 3600 (or default)
     ```
   - Optionally add a CNAME for www:
     ```
     Type: CNAME
     Name: www
     Value: yourdomain.com
     ```

3. **Wait for DNS Propagation**
   - DNS changes can take up to 24 hours to propagate
   - You can test with tools like `nslookup` or online DNS checkers

### For Administrators (VPS Setup)

1. **Ensure Nginx is Running**
   ```bash
   sudo systemctl status nginx
   sudo systemctl reload nginx
   ```

2. **Verify Backend Server**
   ```bash
   # Check if backend is running on port 5000
   sudo netstat -tlnp | grep :5000
   ```

3. **Test Custom Domain**
   ```bash
   # Test with curl
   curl -H "Host: example.com" http://localhost:5000
   curl -H "Host: example.com" http://147.93.30.162
   ```

## Troubleshooting

### Common Issues

1. **Domain Not Working**
   - Check DNS propagation: `nslookup yourdomain.com`
   - Verify A record points to correct VPS IP
   - Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
   - Check backend logs for custom domain requests

2. **Website Not Found**
   - Ensure website is published in the dashboard
   - Check if user has active subscription
   - Verify custom domain is correctly saved in database

3. **Subscription Issues**
   - Check subscription status in database
   - Verify subscription hasn't expired
   - Ensure user has active subscription for publishing

### Logs to Check

1. **Nginx Access Logs**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   ```

2. **Nginx Error Logs**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Backend Logs**
   ```bash
   # Check your backend application logs
   # Look for "Catch-all route - Hostname:" messages
   ```

## Security Considerations

1. **HTTPS Setup**
   - Consider setting up SSL certificates for custom domains
   - Use Let's Encrypt for free SSL certificates
   - Configure HTTPS redirects in Nginx

2. **Rate Limiting**
   - Implement rate limiting for custom domain requests
   - Monitor for abuse or excessive requests

3. **Domain Validation**
   - Validate domain format before saving
   - Check for domain conflicts
   - Implement domain ownership verification if needed

## Database Schema

The custom domain is stored in the Website collection:

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  data: {
    customDomain: String,  // e.g., "example.com"
    // ... other website data
  },
  isPublished: Boolean,
  // ... other fields
}
```

## API Endpoints

### Public Endpoints (No Authentication Required)
- `GET /api/websites/custom-domain/:domain` - Get website by custom domain
- `GET /api/websites/subdomain/:subdomain` - Get website by subdomain

### Protected Endpoints (Authentication Required)
- `POST /api/websites/:id/custom-domain` - Set custom domain
- `DELETE /api/websites/:id/custom-domain` - Remove custom domain
- `GET /api/domains/check-custom-domain/:domain` - Check domain availability

## Testing

### Manual Testing
1. Add a custom domain in the dashboard
2. Configure DNS to point to VPS IP
3. Wait for DNS propagation
4. Visit the custom domain in browser
5. Verify website loads correctly

### Automated Testing
```bash
# Test custom domain endpoint
curl -H "Host: test.example.com" http://localhost:5000
curl -H "Host: test.example.com" http://147.93.30.162

# Test with different hostnames
curl -H "Host: www.example.com" http://localhost:5000
curl -H "Host: example.com" http://localhost:5000
curl -H "Host: www.example.com" http://147.93.30.162
curl -H "Host: example.com" http://147.93.30.162
```

## Monitoring

Set up monitoring for:
- Custom domain requests
- Failed domain lookups
- Subscription expiry
- Backend server health
- Nginx proxy status

## Future Enhancements

1. **SSL Certificate Management**
   - Automatic SSL certificate generation
   - Certificate renewal automation

2. **Domain Verification**
   - DNS TXT record verification
   - Email verification for domain ownership

3. **Advanced DNS Management**
   - Automatic DNS record creation
   - Multiple domain support per website

4. **Analytics**
   - Custom domain usage statistics
   - Traffic monitoring per domain
