'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const VPSDomainStatus = ({ domain, onStatusUpdate }) => {
  const { token } = useAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkDomainStatus = useCallback(async () => {
    if (!domain || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/websites/dns/${encodeURIComponent(domain)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data);
        if (onStatusUpdate) {
          onStatusUpdate(data);
        }
      } else {
        setError(data.message || 'Failed to check domain status');
      }
    } catch (err) {
      setError('Network error while checking domain status');
      console.error('Domain status check error:', err);
    } finally {
      setLoading(false);
    }
  }, [domain, token, onStatusUpdate]);

  useEffect(() => {
    if (domain) {
      checkDomainStatus();
    }
  }, [domain, token, checkDomainStatus]);

  const getStatusColor = (configured) => {
    if (configured) {
      return 'text-green-600 bg-green-100';
    } else {
      return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusText = (configured) => {
    if (configured) {
      return 'DNS Configured';
    } else {
      return 'DNS Setup Required';
    }
  };

  if (!domain) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">VPS Domain Status</h3>
        <button
          onClick={checkDomainStatus}
          disabled={loading}
          className="text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {error}
        </div>
      )}

      {status && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Domain:</span>
            <span className="text-sm font-medium">{status.domain}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.dnsStatus?.configured)}`}>
              {getStatusText(status.dnsStatus?.configured)}
            </span>
          </div>

          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <h4 className="text-xs font-medium text-gray-700 mb-2">VPS Setup Instructions:</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div>
                <strong>1. DNS Configuration:</strong> Point your domain's A record to your VPS IP address.
              </div>
              <div>
                <strong>2. DNS Propagation:</strong> Changes may take up to 24 hours to propagate.
              </div>
              <div>
                <strong>3. Test:</strong> Visit your domain to see if it loads your website.
              </div>
            </div>
          </div>

          {!status.dnsStatus?.configured && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-yellow-700">
                <strong>Setup Required:</strong> Configure your domain's A record to point to your VPS IP address to make your website accessible.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VPSDomainStatus;
