'use client';

import { useNavigation } from '@/contexts/NavigationContext';
import { useEffect, useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import LoadingIndicator from '@/components/ui/LoadingIndicator';

export default function NavigationLoader() {
  const { isNavigating, navigationTarget } = useNavigation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setShowLoader(true);
      setIsPageLoaded(false);
      
      // Wait for page to fully load
      const timer = setTimeout(() => {
        setIsPageLoaded(true);
        // Keep loader visible for a bit longer to ensure smooth transition
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      }, 1000); // Minimum 1 second loading time

      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  // Also listen for page load events
  useEffect(() => {
    const handlePageLoad = () => {
      if (isNavigating) {
        setIsPageLoaded(true);
        // Keep loader visible for smooth transition
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      }
    };

    // Listen for page load
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [isNavigating]);

  if (!showLoader) return null;

  const getTargetName = (target) => {
    switch (target) {
      case '/dashboard':
        return 'Dashboard';
      case '/auth':
        return 'Login Page';
      case '/builder':
        return 'Website Builder';
      case '/profile':
        return 'Profile';
      default:
        if (target.startsWith('/builder/')) {
          return 'Website Editor';
        }
        if (target.startsWith('/published/')) {
          return 'Published Website';
        }
        return 'Page';
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg px-6 py-4 flex items-center space-x-3">
        {/* Animated blue dot */}
        <div className="relative">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Navigation text */}
        <div>
          <p className="text-gray-800 font-medium text-sm">
            Navigating to {getTargetName(navigationTarget)}
          </p>
          <p className="text-gray-500 text-xs">
            {isPageLoaded ? 'Almost there...' : 'Please wait...'}
          </p>
        </div>
      </div>
    </div>
  );
}
