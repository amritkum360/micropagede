'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import LoadingIndicator from '@/components/ui/LoadingIndicator';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const router = useRouter();

  if (loading) {
    return <LoadingIndicator text="Loading..." />;
  }

  // Always show landing page - both authenticated and unauthenticated users can see it
  return <LandingPage />;
}
