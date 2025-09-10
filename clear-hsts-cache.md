# Clear HSTS Cache in Chrome

## **Problem:**
Browser is forcing HTTPS even when you type HTTP because of HSTS (HTTP Strict Transport Security) cache.

## **Solution: Clear HSTS Cache**

### **Method 1: Chrome Settings**
1. Open Chrome
2. Go to `chrome://settings/`
3. Search for "Clear browsing data"
4. Click "Clear browsing data"
5. Select "Advanced" tab
6. Check "Cached images and files"
7. Select "All time"
8. Click "Clear data"

### **Method 2: Chrome DevTools**
1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Click "Storage" in left sidebar
4. Click "Clear storage"
5. Check "Local storage" and "Session storage"
6. Click "Clear site data"

### **Method 3: Incognito Mode**
1. Open Chrome Incognito window (Ctrl+Shift+N)
2. Try `http://hyfreefire.com` (not https)

### **Method 4: Different Browser**
Try in Firefox, Edge, or Safari instead of Chrome.

## **Test Commands:**
```bash
# Test HTTP (should work)
curl -v http://hyfreefire.com

# Test HTTPS (will fail without SSL)
curl -v https://hyfreefire.com
```

## **Quick Fix:**
Just type `http://hyfreefire.com` (not https) in the browser address bar.
