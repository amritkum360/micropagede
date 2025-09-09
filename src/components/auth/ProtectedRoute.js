'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import LoadingIndicator from '@/components/ui/LoadingIndicator';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user, completeOnboarding, getProfile, getWebsites, fixOnboardingStatus } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingWebsites, setCheckingWebsites] = useState(false);
  const [hasCheckedWebsites, setHasCheckedWebsites] = useState(false);

  // Check if we're on a subdomain or published page (these don't need authentication)
  const isSubdomainPage = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/subdomain/') ||
    window.location.pathname.startsWith('/published/')
  );

  const checkExistingWebsites = useCallback(async () => {
    if (checkingWebsites || hasCheckedWebsites) return;
    
    setCheckingWebsites(true);
    setHasCheckedWebsites(true);
    try {
      console.log('🔍 Checking if user already has websites...');
      const websites = await getWebsites();
      console.log('📊 Found websites:', websites?.length || 0);
      
      if (websites && websites.length > 0) {
        console.log('✅ User already has websites, fixing onboarding status');
        // User has websites but onboardingCompleted is false, fix it
        try {
          await fixOnboardingStatus();
          console.log('✅ Onboarding status fixed successfully');
        } catch (error) {
          console.error('❌ Failed to fix onboarding status:', error);
        }
        setShowOnboarding(false);
      } else {
        console.log('🎯 No existing websites found, showing onboarding modal');
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('❌ Error checking websites:', error);
      // If there's an error, show onboarding to be safe
      setShowOnboarding(true);
    } finally {
      setCheckingWebsites(false);
    }
  }, [getWebsites, fixOnboardingStatus, checkingWebsites, hasCheckedWebsites]);

  // Reset check flag when user changes
  useEffect(() => {
    if (user?.id) {
      setHasCheckedWebsites(false);
      setShowOnboarding(false);
    }
  }, [user?.id]);

  useEffect(() => {
    console.log('🔍 ProtectedRoute - Auth state:', { 
      loading, 
      isAuthenticated, 
      isSubdomainPage,
      user: user ? { 
        id: user.id, 
        onboardingCompleted: user.onboardingCompleted,
        onboardingData: user.onboardingData 
      } : null 
    });

    // Skip authentication for subdomain and published pages
    if (isSubdomainPage) {
      console.log('🌐 ProtectedRoute - Subdomain page, skipping authentication');
      return;
    }

    // Wait for authentication to be fully loaded
    if (loading) {
      console.log('⏳ ProtectedRoute - Still loading authentication...');
      return;
    }

    // If not authenticated after loading is complete, redirect to auth
    if (!isAuthenticated || !user) {
      console.log('🚪 Redirecting to auth - user not authenticated');
      navigateWithLoader(router, '/auth');
      return;
    }

    // If authenticated but onboarding not completed and we haven't checked websites yet
    if (!user.onboardingCompleted && !hasCheckedWebsites) {
      console.log('🔍 User not onboarded, checking for existing websites...');
      checkExistingWebsites();
      return;
    }

    // If onboarding is completed, allow access
    if (user.onboardingCompleted) {
      console.log('✅ User onboarding completed - allowing dashboard access');
      setShowOnboarding(false); // Make sure onboarding is closed
      return;
    }
  }, [isAuthenticated, loading, user, router, navigateWithLoader, checkExistingWebsites, hasCheckedWebsites, isSubdomainPage]);

  const handleOnboardingComplete = async (updatedUser) => {
    console.log('🎯 Onboarding completed, updated user:', updatedUser);
    
    // Close onboarding modal first
    setShowOnboarding(false);
    
    // Update the user state immediately to prevent re-triggering onboarding
    if (updatedUser) {
      console.log('🔄 Updating user state with completed onboarding...');
      // The user state will be updated by the AuthContext after completeOnboarding
    }
    
    // Refresh user data to get the latest onboarding status and website data
    try {
      console.log('🔄 Refreshing user profile after onboarding...');
      await getProfile();
      console.log('✅ User profile refreshed successfully');
    } catch (error) {
      console.error('❌ Failed to refresh user profile:', error);
    }
    
    // Small delay to ensure data is properly loaded
    setTimeout(() => {
      console.log('🚀 Navigating to dashboard...');
      // Navigate to dashboard after onboarding
      // The initial website is already created in the backend
      navigateWithLoader(router, '/dashboard');
    }, 1000);
  };

  // Skip authentication for subdomain and published pages
  if (isSubdomainPage) {
    console.log('🌐 ProtectedRoute - Rendering subdomain page without authentication');
    return <>{children}</>;
  }

  if (loading || checkingWebsites) {
    return (
      <LoadingIndicator 
        text={checkingWebsites ? 'Checking your websites...' : 'Loading...'} 
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {showOnboarding && (
        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          user={user}
        />
      )}
      {children}
    </>
  );
}
