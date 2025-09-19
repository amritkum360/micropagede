# API Setup Instructions

## Issue Identified
The image upload modal is showing "Failed to fetch images: 404" because the frontend cannot connect to the correct API endpoint.

## Solution
I've updated the code to automatically test multiple API endpoints and find the working one. However, you need to configure your VPS server details.

## Steps to Fix

### 1. Update API Configuration
Edit the file: `src/config/apiConfig.js`

Replace `'https://your-vps-domain.com/api'` with your actual VPS domain or IP address.

For example:
- If your VPS domain is `myserver.com`: `'https://myserver.com/api'`
- If your VPS IP is `192.168.1.100`: `'http://192.168.1.100:5000/api'`

### 2. Check Your VPS Server
Make sure your backend server is running and accessible:
- Backend should be running on port 5000 (or whatever port you configured)
- The `/api/user-images` endpoint should be accessible
- CORS should be configured to allow requests from your frontend domain

### 3. Test the Connection
The updated code will automatically test multiple endpoints and use the working one. Check the browser console for logs showing which endpoint is being used.

### 4. Environment Variable (Optional)
You can also set the `NEXT_PUBLIC_API_URL` environment variable:
```bash
# In your .env.local file (create if it doesn't exist)
NEXT_PUBLIC_API_URL=https://your-vps-domain.com/api
```

## Current Backend Setup
Based on your server output, your backend is running at:
- Path: `/var/www/backend/micropage`
- Uploads: `/var/www/backend/uploads`

Make sure your VPS server is accessible from the internet and the API endpoints are working.

## Testing
1. Open the image upload modal
2. Check browser console for API connection logs
3. The system will automatically find and use the working endpoint
4. If no endpoint works, check your server configuration and network access
