'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SubscriptionModal from './subscriptions/SubscriptionModal';
import RenewModal from './subscriptions/RenewModal';
import ExpiryWarning from './subscriptions/ExpiryWarning';
import SubscriptionStatus from './subscriptions/SubscriptionStatus';
import useSubscription from './subscriptions/useSubscription';
import CustomDomainManager from '@/components/CustomDomainManager';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  User, 
  Globe,
  Calendar,
  Clock,
  X,
  CreditCard
} from 'lucide-react';
import useNotification from '@/hooks/useNotification';
import NotificationContainer from '@/components/ui/NotificationContainer';
import CelebrationAnimation from '@/components/ui/CelebrationAnimation';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import Image from 'next/image';

function DashboardContent() {
  const { user, logout, getWebsites, deleteWebsite, publishWebsite, unpublishWebsite, updateWebsite, getDomains, saveDomain, updateDomain, checkDomainDNS, getWebsite, checkCustomDomain, requestSSL, getSSLStatus } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);
  const [unpublishingId, setUnpublishingId] = useState(null);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [customDomain, setCustomDomain] = useState('');
  const [addingDomain, setAddingDomain] = useState(false);
  const [dnsStatus, setDnsStatus] = useState({});
  const [checkingDNS, setCheckingDNS] = useState({});
  const [customDomainStatus, setCustomDomainStatus] = useState({ checking: false, available: null, message: '' });
  const [sslStatus, setSslStatus] = useState({});
  const [requestingSSL, setRequestingSSL] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationShown = useRef(false);
  const { showSuccess, showError, showWarning, showInfo, notifications, removeNotification } = useNotification();
  
  // Use custom subscription hook
  const {
    subscription,
    subscriptionPlans,
    showSubscriptionModal,
    showRenewModal,
    showExpiryWarning,
    daysUntilExpiry,
    creatingSubscription,
    setShowSubscriptionModal,
    setShowRenewModal,
    handleCreateSubscription,
    handleRenewSubscription,
    handleDismissWarning,
    handleShowRenewModal,
    handleShowSubscriptionModal,
    loadSubscription
  } = useSubscription();

  const router = useRouter();

  const loadWebsites = useCallback(async (isInitialLoad = false) => {
    try {
      console.log('🔄 Loading websites for user:', user?.id);
      const userWebsites = await getWebsites();
      console.log('✅ Loaded websites:', userWebsites);
      console.log('📊 Number of websites:', userWebsites?.length || 0);
      setWebsites(userWebsites || []);
      
      if (isInitialLoad) {
        setInitialLoadComplete(true);
      }
    } catch (error) {
      console.error('❌ Failed to load websites:', error);
      setWebsites([]);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  }, [getWebsites, user?.id]);

  // Manual refresh function for user actions with debouncing
  const refreshWebsites = useCallback(async () => {
    if (initialLoadComplete && !isOperationInProgress) {
      await loadWebsites(false);
    }
  }, [loadWebsites, initialLoadComplete, isOperationInProgress]);

  // Combined effect to handle all initial loading
  useEffect(() => {
    if (user && user.id && !initialLoadComplete) {
      console.log('🔄 Dashboard mounted, loading data for user:', user.id);
      console.log('⚡ Optimized loading: Single API call instead of multiple');
      
      // Load data only once when user is available
      const loadData = async () => {
        try {
          await Promise.all([
            loadWebsites(true), // Pass true for initial load
            loadSubscription()
          ]);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        }
      };
      
      loadData();
      
      // Trigger celebration animation only once when dashboard first opens
      if (!celebrationShown.current) {
        const celebrationTimer = setTimeout(() => {
          setShowCelebration(true);
          celebrationShown.current = true;
        }, 1000);

        return () => clearTimeout(celebrationTimer);
      }
    }
  }, [user, initialLoadComplete]); // Include all dependencies

  const handleLogout = () => {
    logout();
    navigateWithLoader(router, '/auth');
  };



  const handleCreateWebsite = async () => {
    // If user already has a website, show warning and navigate
    if (websites.length >= 1) {
      showWarning('⚠️ You already have a website. Creating a new one will replace the existing website.');
      // For now, just navigate to builder - user can handle replacement there
      await navigateWithLoader(router, '/builder');
      return;
    } else {
      // No existing website, create new one
      await navigateWithLoader(router, '/builder');
    }
  };


  const handleEditWebsite = (websiteId) => {
    navigateWithLoader(router, `/builder/${websiteId}`);
  };

  const handleDeleteWebsite = async (websiteId) => {
    if (isOperationInProgress) return; // Prevent multiple operations
    
    setIsOperationInProgress(true);
    setDeletingId(websiteId);
    try {
      await deleteWebsite(websiteId);
      setWebsites(websites.filter(w => w._id !== websiteId));
      showSuccess('✅ Website deleted successfully!');
    } catch (error) {
      console.error('Failed to delete website:', error);
      showError('❌ Failed to delete website. Please try again.');
    } finally {
      setDeletingId(null);
      setIsOperationInProgress(false);
    }
  };

  const handlePublishWebsite = async (websiteId) => {
    if (isOperationInProgress) return; // Prevent multiple operations
    
    setIsOperationInProgress(true);
    setPublishingId(websiteId);
    try {
      const result = await publishWebsite(websiteId);
      setWebsites(websites.map(w => 
        w._id === websiteId 
          ? { ...w, isPublished: true, publishedUrl: result.publishedUrl }
          : w
      ));
      showSuccess('🎉 Website published successfully!');
    } catch (error) {
      console.error('Failed to publish website:', error);
      if (error.message && error.message.includes('subscribe')) {
        handleShowSubscriptionModal();
      } else {
        showError('❌ Failed to publish website. Please try again.');
      }
    } finally {
      setPublishingId(null);
      setIsOperationInProgress(false);
    }
  };

  const handleUnpublishWebsite = async (websiteId) => {
    if (isOperationInProgress) return; // Prevent multiple operations
    
    setIsOperationInProgress(true);
    setUnpublishingId(websiteId);
    try {
      await unpublishWebsite(websiteId);
      setWebsites(websites.map(w => 
        w._id === websiteId 
          ? { ...w, isPublished: false, publishedUrl: null }
          : w
      ));
      showSuccess('🔒 Website unpublished successfully!');
    } catch (error) {
      console.error('Failed to unpublish website:', error);
      showError('❌ Failed to unpublish website. Please try again.');
    } finally {
      setUnpublishingId(null);
      setIsOperationInProgress(false);
    }
  };

  const handleAddDomain = (website) => {
    setSelectedWebsite(website);
    setCustomDomain(website.data?.customDomain || '');
    setCustomDomainStatus({ checking: false, available: null, message: '' });
    setShowDomainModal(true);
  };

  // Check custom domain availability
  const checkCustomDomainAvailability = useCallback(async (domain) => {
    if (!domain || domain.length < 3) {
      setCustomDomainStatus({ checking: false, available: null, message: '' });
      return;
    }

    setCustomDomainStatus({ checking: true, available: null, message: 'Checking availability...' });

    try {
      const result = await checkCustomDomain(domain);
      setCustomDomainStatus({
        checking: false,
        available: result.available,
        message: result.message
      });
    } catch (error) {
      console.error('Custom domain check error:', error);
      setCustomDomainStatus({
        checking: false,
        available: false,
        message: error.message || 'Error checking domain availability'
      });
    }
  }, [checkCustomDomain]);

  // Debounce custom domain checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (customDomain && showDomainModal) {
        checkCustomDomainAvailability(customDomain);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [customDomain, showDomainModal, checkCustomDomainAvailability]);

  const handleSaveDomain = async () => {
    if (!customDomain.trim()) {
      showError('❌ Please enter a valid domain name');
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      showError('❌ Please enter a valid domain name (e.g., example.com)');
      return;
    }

    // Check if domain is available
    if (customDomainStatus.checking) {
      showError('❌ Please wait while we check domain availability');
      return;
    }

    if (customDomainStatus.available === false) {
      showError(`❌ ${customDomainStatus.message}`);
      return;
    }

    // If we haven't checked yet, check now
    if (customDomainStatus.available === null) {
      try {
        await checkCustomDomainAvailability(customDomain);
        // Wait a moment for the check to complete
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check again after the async operation
        if (customDomainStatus.available === false) {
          showError(`❌ ${customDomainStatus.message}`);
          return;
        }
      } catch (error) {
        showError('❌ Failed to verify domain availability');
        return;
      }
    }

    setAddingDomain(true);
    try {
      // Get current complete website data first
      const currentWebsite = await getWebsite(selectedWebsite._id);
      
      // Update website with custom domain in backend, preserving all existing data
      const updatedData = {
        ...currentWebsite.data,
        customDomain: customDomain.trim()
      };

      console.log('🔍 Frontend - Current website data:', currentWebsite.data);
      console.log('🔍 Frontend - Updated data:', updatedData);
      console.log('🔍 Frontend - Custom domain to save:', customDomain.trim());

      const result = await updateWebsite(selectedWebsite._id, {
        name: selectedWebsite.name,
        data: updatedData
      });

      console.log('Update result:', result);
      console.log('Selected website:', selectedWebsite);

      // Extract website object from API response
      const updatedWebsite = {
        ...(result.website || {}),
        _id: (result.website && result.website._id) || selectedWebsite._id
      };

      console.log('Updated website:', updatedWebsite);

      // Website updated successfully with custom domain
      console.log('Custom domain added to website successfully');

      // Update local state with the response from backend
      setWebsites(websites.map(w => 
        w._id === selectedWebsite._id ? updatedWebsite : w
      ));

      setShowDomainModal(false);
      setSelectedWebsite(null);
      setCustomDomain('');
      showSuccess('✅ Custom domain added successfully!');
      // Refresh the page to reflect latest DNS status and domain state
      router.refresh?.();
    } catch (error) {
      console.error('Failed to add custom domain:', error);
      showError('❌ Failed to add custom domain. Please try again.');
    } finally {
      setAddingDomain(false);
    }
  };

  const handleRemoveDomain = async (websiteId) => {
    try {
      // Get current complete website data first
      const currentWebsite = await getWebsite(websiteId);
      
      const updatedData = {
        ...currentWebsite.data,
        customDomain: null
      };

      const result = await updateWebsite(websiteId, {
        name: currentWebsite.name,
        data: updatedData
      });

      // Extract website object from API response
      const updatedWebsite = {
        ...(result.website || {}),
        _id: (result.website && result.website._id) || websiteId
      };

      // Remove custom domain from domains collection
      try {
        const domains = await getDomains();
        const existingDomain = domains.find(d => d.websiteId === websiteId);
        
        if (existingDomain) {
          // Update domain to remove custom domain
          await updateDomain(existingDomain._id, {
            customDomain: null
          });
          console.log('Custom domain removed from domains collection');
        }
      } catch (domainError) {
        console.error('Failed to remove custom domain from domains collection:', domainError);
        // Don't show error to user as website is already updated
      }

      // Update local state with the response from backend
      setWebsites(websites.map(w => 
        w._id === websiteId ? updatedWebsite : w
      ));

      // Clear DNS status for this website
      setDnsStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[websiteId];
        return newStatus;
      });

      showSuccess('✅ Custom domain removed successfully!');
      // Refresh the page to clear DNS status and domain state
      router.refresh?.();
    } catch (error) {
      console.error('Failed to remove custom domain:', error);
      showError('❌ Failed to remove custom domain. Please try again.');
    }
  };

  const handleCheckDNS = useCallback(async (websiteId, domain) => {
    setCheckingDNS(prev => ({ ...prev, [websiteId]: true }));
    
    try {
      const result = await checkDomainDNS(domain);
      setDnsStatus(prev => ({
        ...prev,
        [websiteId]: result.dnsStatus
      }));
    } catch (error) {
      console.error('Failed to check DNS:', error);
      setDnsStatus(prev => ({
        ...prev,
        [websiteId]: {
          configured: false,
          message: 'Failed to check DNS configuration'
        }
      }));
    } finally {
      setCheckingDNS(prev => ({ ...prev, [websiteId]: false }));
    }
  }, [checkDomainDNS]);

  const handleRequestSSL = useCallback(async (websiteId, domain) => {
    setRequestingSSL(prev => ({ ...prev, [websiteId]: true }));
    
    try {
      const result = await requestSSL(websiteId, domain);
      setSslStatus(prev => ({
        ...prev,
        [websiteId]: {
          hasRequest: true,
          status: 'pending'
        }
      }));
      showSuccess('✅ SSL certificate request submitted successfully! We will process it within 24 hours.');
    } catch (error) {
      console.error('Failed to request SSL:', error);
      showError('❌ Failed to request SSL certificate. Please try again.');
    } finally {
      setRequestingSSL(prev => ({ ...prev, [websiteId]: false }));
    }
  }, [requestSSL, showSuccess, showError]);

  // Check SSL status for domains
  const checkSSLStatus = useCallback(async (domain) => {
    try {
      const result = await getSSLStatus(domain);
      return result;
    } catch (error) {
      console.error('Failed to check SSL status:', error);
      return { hasRequest: false, status: null };
    }
  }, [getSSLStatus]);

  // Auto-check DNS status after websites load
  useEffect(() => {
    if (websites.length > 0) {
      websites.forEach(website => {
        if (website.data?.customDomain && !dnsStatus[website._id]) {
          // Delay DNS check to avoid blocking page load
          setTimeout(() => {
            handleCheckDNS(website._id, website.data.customDomain);
          }, 2000); // 2 second delay
        }
        
        // Check SSL status for custom domains
        if (website.data?.customDomain && !sslStatus[website._id]) {
          setTimeout(async () => {
            const sslResult = await checkSSLStatus(website.data.customDomain);
            setSslStatus(prev => ({
              ...prev,
              [website._id]: sslResult
            }));
          }, 3000); // 3 second delay
        }
      });
    }
  }, [websites, dnsStatus, sslStatus, handleCheckDNS, checkSSLStatus]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || !initialLoadComplete) {
    return <LoadingIndicator text="Loading your dashboard..." />;
  }

  return (
    <>
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      {/* Celebration Animation */}
      <CelebrationAnimation 
        isVisible={showCelebration} 
        onComplete={() => setShowCelebration(false)}
      />
      
      <div className="min-h-screen bg-gray-50">


      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
          <Link href="/" passHref>
          <Image
              src="/logo.PNG" 
              alt="AboutWebsite Logo" 
              width={32}
              height={32}
              className="w-32 h-14 object-contain"
              unoptimized={true}
            />
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateWithLoader(router, '/profile')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

            {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                 {/* Expiry Warning Banner */}
                 {showExpiryWarning && (
                   <ExpiryWarning
                     daysUntilExpiry={daysUntilExpiry}
                     onDismiss={handleDismissWarning}
                     onRenew={handleShowRenewModal}
                   />
                 )}

                 {/* Welcome Section */}
         <div className="mb-8">
           <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
               <div className="flex items-center">
                 <div className="flex-shrink-0">
                   <div className="bg-indigo-500 p-3 rounded-full">
                     <User className="h-6 w-6 text-white" />
                   </div>
                 </div>
                 <div className="ml-4">
                   <h2 className="text-xl font-bold text-gray-900 " style={{fontFamily: "cursive"}}>
                   🎉 Welcome back, {user?.fullName}!🚀
                   </h2>
                   <p className="text-gray-600 mt-1">
                   You can now edit, customize, and publish your website. Start by clicking the &quot;Edit&quot; button below.
                   </p>
                 </div>
               </div>
               
               {/* Subscription Status */}
               <div className="lg:text-right">
                 {/* <div className="bg-gray-50 rounded-lg p-4 border border-gray-200"> */}
                   <SubscriptionStatus
                     subscription={subscription}
                     showExpiryWarning={showExpiryWarning}
                     daysUntilExpiry={daysUntilExpiry}
                     onRenew={handleShowRenewModal}
                     handleShowSubscriptionModal={handleShowSubscriptionModal}
                     user={user}
                   />
                   
                 {/* </div> */}
               </div>
             </div>
           </div>
         </div>

         {/* New User Welcome Message */}
         {/* {user?.onboardingCompleted && user?.onboardingData?.completedAt && 
          new Date(user.onboardingData.completedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
           <div className="mb-8">
             <div className="bg-green-50 rounded-lg p-6 border border-green-200">
               <div className="flex items-center space-x-4">
                 <div className="flex-shrink-0">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                     <span className="text-2xl">🎉</span>
                   </div>
                 </div>
                 <div className="flex-1">
                   <h3 className="text-lg font-bold text-green-900 mb-1">
                     Welcome to MicroPage! 🚀
                   </h3>
                   <p className="text-green-700 mb-2">
                     Your website <strong>&quot;{user.onboardingData.websiteName}&quot;</strong> has been created successfully!
                   </p>
                   <p className="text-sm text-green-600">
                     You can now edit, customize, and publish your website. Start by clicking the &quot;Edit&quot; button below.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         )} */}


        {/* Websites Cards */}
        <div className="mb-6">
          <div className="relative">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2 ml-4 font-heading" style={{fontFamily: "math"}}>Your Single Page Website</h3>
            {/* <p className="text-sm text-gray-500 mb-6 ml-4 font-body">
              Manage and edit your single-page website
            </p> */}
            
          </div>
        </div>

        {websites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="bg-indigo-500 p-4 rounded-full w-20 h-20 mx-auto mb-4">
              <Globe className="h-12 w-12 text-white" />
            </div>
            <h3 className="mt-2 text-lg font-bold text-gray-900">No websites yet</h3>
            <p className="mt-1 text-sm text-gray-600">
              Let&apos;s create something amazing together!
            </p>
            <div className="mt-6">
               <button
                 onClick={handleCreateWebsite}
                 className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                 <Plus className="h-5 w-5 mr-2" />
                 Create Your Website
               </button>
             </div>
          </div>
                ) : (
          <div className="w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50">
              {websites.map((website, index) => (
                <div key={website._id || `website-${index}`} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] w-full mb-6 last:mb-0 overflow-hidden">
                  {/* Card Header */}
                  <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-10 -right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-20 animate-bounce"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-heading">{website.name}</h2>
                        {/* <p className="text-sm sm:text-base text-gray-600">Your Single Page Website</p> */}
                      </div>
                                                                      <div className="sm:ml-6 flex items-center gap-3 relative z-20">
                          {website.isPublished ? (
                            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-md animate-pulse">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                              🚀 Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-amber-100 text-yellow-800 border border-yellow-200 shadow-md">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                              ⏳ Not Live
                            </span>
                          )}
                        
                        {website.isPublished ? (
                          <button
                            onClick={() => handleUnpublishWebsite(website._id)}
                            disabled={unpublishingId === website._id}
                            className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-xs font-medium rounded-lg text-orange-700 bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
                          >
                            {unpublishingId === website._id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-700 mr-1"></div>
                                Unpublishing...
                              </>
                            ) : (
                              <>
                                <Globe className="h-3 w-3 mr-1" />
                                ⏸️ Unpublish
                              </>
                            )}
                          </button>
                        ) : subscription ? (
                          <button
                            onClick={() => {
                              console.log('Publish button clicked for website:', website._id);
                              handlePublishWebsite(website._id);
                            }}
                            disabled={publishingId === website._id}
                            className="inline-flex items-center px-3 py-1.5 border border-green-300 text-xs font-medium rounded-lg text-green-700 bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer relative z-10"
                            style={{ position: 'relative', zIndex: 10 }}
                          >
                            {publishingId === website._id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700 mr-1"></div>
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Globe className="h-3 w-3 mr-1" />
                                🚀 Publish
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={handleShowSubscriptionModal}
                            className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-xs font-medium rounded-lg text-orange-700 bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer relative z-10"
                            style={{ position: 'relative', zIndex: 10 }}
                          >
                            <CreditCard className="h-3 w-3 mr-1" />
                            💳 Subscribe to Publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 lg:p-8">


                                                        {/* Domain Information and DNS Status */}
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Domain Information */}
                    <div className="flex-1">
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 font-medium font-body">Subdomain:</span>
                          </div>
                          <a 
                            href={`https://${website.data?.subdomain || 'input'}.aboutwebsite.in`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 font-semibold text-base sm:text-lg break-all"
                          >
                            {website.data?.subdomain || 'input'}.aboutwebsite.in
                          </a>
                        </div>
                        
                        {/* Custom Domain Section */}
                        <div className="space-y-3">
                          {website.data?.customDomain ? (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                  <span className="text-gray-700 font-medium font-body">Your Own Domain:</span>
                                </div>
                                <a 
                                  href={`https://${website.data.customDomain}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg break-all"
                                >
                                  {website.data.customDomain}
                                </a>
                              </div>
                              <div className="flex gap-2">
                                {sslStatus[website._id]?.status === 'applied' ? (
                                  <div className="flex items-center text-sm text-green-600 font-medium px-3 py-1 border border-green-200 rounded bg-green-50">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-body">SSL Applied</span>
                                  </div>
                                ) : sslStatus[website._id]?.hasRequest ? (
                                  <div className="flex items-center text-sm text-yellow-600 font-medium px-3 py-1 border border-yellow-200 rounded bg-yellow-50">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                                    <span className="font-body">SSL Requested</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleRequestSSL(website._id, website.data.customDomain)}
                                    disabled={requestingSSL[website._id] || sslStatus[website._id]?.hasRequest}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 border border-blue-200 rounded hover:bg-blue-50 self-start disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {requestingSSL[website._id] ? (
                                      <span className="font-body">Requesting...</span>
                                    ) : (
                                      <span className="font-body">Request SSL</span>
                                    )}
                                  </button>
                                )}
                                <button
                                  onClick={() => handleRemoveDomain(website._id)}
                                  className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 self-start"
                                >
                                  <span className="font-body">Remove Your Own Domain</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                                  <span className="text-gray-600 font-body">Your Own Domain:</span>
                                </div>
                                <span className="text-gray-500">Not configured</span>
                              </div>
                              <button
                                onClick={() => handleAddDomain(website)}
                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 border border-indigo-200 rounded hover:bg-indigo-50 self-start"
                              >
                                <span className="font-body">Add Your Domain</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                                         {/* DNS Status - Only show if custom domain is configured */}
                     {website.data?.customDomain && (
                       <div className="lg:w-120">
                        <div className={`border rounded-lg p-3 sm:p-4 ${
                          dnsStatus[website._id]?.configured 
                            ? 'bg-green-50 border-green-200' 
                            : dnsStatus[website._id]?.configured === false
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <span className={`text-sm sm:text-base font-medium ${
                          dnsStatus[website._id]?.configured 
                            ? 'text-green-700' 
                            : dnsStatus[website._id]?.configured === false
                            ? 'text-red-700'
                            : 'text-yellow-700'
                        }`}>
                          {dnsStatus[website._id]?.configured 
                            ? 'Custom Domain configured correctly'
                            : dnsStatus[website._id]?.configured === false
                            ? '❌ Custom Domain not configured - Follow steps below'
                            : 'DNS Status Unknown'
                          }
                        </span>
                        <div className="flex items-center space-x-2">
                          {checkingDNS[website._id] ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          ) : (
                            <button
                              onClick={() => handleCheckDNS(website._id, website.data.customDomain)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 border border-blue-200 rounded hover:bg-blue-50"
                            >
                              <span className="font-body">Check DNS</span>
                            </button>
                          )}
                        </div>
                      </div>
                      {dnsStatus[website._id] && (
                        <div className={`mt-3 rounded-lg p-3 ${
                          dnsStatus[website._id]?.configured 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          <div className="flex items-center text-sm mb-2">
                            {/* <div className={`w-3 h-3 rounded-full mr-3 ${
                              dnsStatus[website._id]?.configured 
                                ? 'bg-green-500' 
                                : 'bg-red-500'
                            }`}></div>
                            <span className={dnsStatus[website._id]?.configured ? 'text-green-700' : 'text-red-700'}>
                              {dnsStatus[website._id]?.configured ? '✅ DNS Configured Correctly' : '❌ DNS Configuration Issues'}
                            </span> */}
                          </div>
                          {/* <p className={`text-sm ${
                            dnsStatus[website._id]?.configured ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {dnsStatus[website._id]?.message}
                          </p> */}
                          
                          {/* Detailed DNS Information */}
                          {/* {dnsStatus[website._id]?.details && (
                            <div className="mt-3 space-y-2"> */}
                              {/* A Record Status */}
                              
                              
                              {/* CNAME Record Status */}
                              {/* <div className="flex items-center justify-between text-xs">
                                <span className="font-medium">CNAME (www):</span>
                                <div className="flex items-center">
                                  {dnsStatus[website._id].details.cnameRecord?.found ? (
                                    <>
                                      <div className={`w-2 h-2 rounded-full mr-2 ${
                                        dnsStatus[website._id].details.cnameRecord?.correct ? 'bg-green-500' : 'bg-yellow-500'
                                      }`}></div>
                                      <span className={dnsStatus[website._id].details.cnameRecord?.correct ? 'text-green-700' : 'text-yellow-700'}>
                                        {dnsStatus[website._id].details.cnameRecord?.value}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="w-2 h-2 rounded-full mr-2 bg-gray-400"></div>
                                      <span className="text-gray-600">Not found (optional)</span>
                                    </>
                                  )}
                                </div> */}
                              {/* </div> */}
                            
                     
                          
                          {!dnsStatus[website._id]?.configured && (
                            <div className="mt-3">
                              <p className="text-xs text-blue-600 mb-2">📋 DNS Setup Instructions:</p>
                              <div className="text-xs font-mono bg-blue-100 p-2 rounded border border-blue-200 space-y-1">
                                <div className="text-blue-800 font-bold">1. Add A Record</div>
                                <div className="text-blue-700">Type: A</div>
                                <div className="text-blue-700">Name: @</div>
                                <div className="text-blue-700">Value: 147.93.30.162</div>
                                <div className="text-blue-600 text-[10px] mt-1">💡 This is required for your domain to work</div>
                              </div>
                              {/* <div className="text-xs font-mono bg-gray-100 p-2 rounded border border-gray-200 space-y-1 mt-2">
                                <div className="text-gray-800 font-bold">2. Add CNAME Record (Optional)</div>
                                <div className="text-gray-700">Type: CNAME</div>
                                <div className="text-gray-700">Name: www</div>
                                <div className="text-gray-700">Value: {website.data?.customDomain}</div>
                                <div className="text-gray-600 text-[10px] mt-1">💡 This makes www.yourdomain.com work</div>
                              </div> */}
                              <div className="text-xs text-blue-600 mt-2">
                                ⏰ DNS propagation may take up to 24 hours
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div></div>
                  )}
                </div>

                  {/* Dates */}
                  {/* <div className="text-xs text-gray-500 text-left">
                    Created: {formatDate(website.createdAt)} | Updated: {formatDate(website.updatedAt)}
                  </div> */}

                  {/* Subscription Status for Website */}
                  {!subscription && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-sm font-medium text-orange-800 font-body">Publishing requires subscription</span>
                        </div>
                        <button
                          onClick={handleShowSubscriptionModal}
                          className="text-sm text-orange-600 hover:text-orange-700 font-medium px-3 py-1 border border-orange-200 rounded hover:bg-orange-50"
                        >
                          <span className="font-body">Subscribe Now</span>
                        </button>
                      </div>
                    </div>
                  )}

                                                          {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
                      <button
                        onClick={() => handleEditWebsite(website._id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="font-body">Edit</span>
                      </button>
                      
                      {website.isPublished && (
                        <a
                          href={website.publishedUrl || `/published/${website._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="font-body">View</span>
                        </a>
                      )}
                      
                      <button
                        onClick={() => handleDeleteWebsite(website._id)}
                        disabled={deletingId === website._id}
                        className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                      >
                        {deletingId === website._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Dates - Bottom Corner */}
                    <div className="text-xs text-gray-500 text-left mt-4 pt-3 border-t border-gray-100 font-body">
                      Created: {formatDate(website.createdAt)} | Updated: {formatDate(website.updatedAt)}
                    </div>
                </div>
              </div>
            ))}
          </div></div>
                 )}

         {/* Custom Domain Modal */}
         {showDomainModal && (
          <div className="fixed inset-0 bg-[#dbe2c380] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-2 border-dashed">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-900 font-heading">
                   Add Custom Domain
                 </h3>
                 <button
                   onClick={() => {
                     setShowDomainModal(false);
                     setSelectedWebsite(null);
                     setCustomDomain('');
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
               
               <div className="mb-4">
                 <p className="text-sm text-gray-600 mb-4 font-body">
                   Add your own domain to your website. Make sure your domain is pointing to our nameservers.
                 </p>
                 
                 <div className="mb-4">
                   <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                     Domain Name
                   </label>
                   <div className="relative">
                     <input
                       type="text"
                       value={customDomain}
                       onChange={(e) => setCustomDomain(e.target.value)}
                       placeholder="example.com"
                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                         customDomainStatus.available === true ? 'border-green-300 bg-green-50' :
                         customDomainStatus.available === false ? 'border-red-300 bg-red-50' :
                         'border-gray-300'
                       }`}
                     />
                     {customDomainStatus.checking && (
                       <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                       </div>
                     )}
                     {!customDomainStatus.checking && customDomainStatus.available === true && (
                       <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                         <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                         </div>
                       </div>
                     )}
                     {!customDomainStatus.checking && customDomainStatus.available === false && (
                       <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                         <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                           </svg>
                         </div>
                       </div>
                     )}
                   </div>
                   {customDomainStatus.message && (
                     <p className={`mt-1 text-xs ${
                       customDomainStatus.available === true ? 'text-green-600' :
                       customDomainStatus.available === false ? 'text-red-600' :
                       'text-gray-500'
                     }`}>
                       {customDomainStatus.message}
                     </p>
                   )}
                 </div>
                 
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                   <h4 className="text-sm font-medium text-blue-800 mb-2 font-heading">📋 VPS DNS Configuration Instructions</h4>
                   <div className="space-y-3 text-xs text-blue-700 font-body">
                     <p><strong>Step 1:</strong> Go to your domain provider (like GoDaddy, Namecheap, etc.)</p>
                     <p><strong>Step 2:</strong> Find &quot;DNS Settings&quot; or &quot;DNS Management&quot;</p>
                     <p><strong>Step 3:</strong> Add a new A record with these settings:</p>
                     <div className="bg-green-100 p-2 rounded font-mono text-sm border border-green-200">
                       <div className="text-green-800 font-bold">Type: A</div>
                       <div className="text-green-800">Name: @ (or your domain)</div>
                       <div className="text-green-800">Value: 147.93.30.162</div>
                       <div className="text-green-800">TTL: 3600 (or default)</div>
                       <div className="text-green-700 text-[10px] mt-1">✅ ADD THIS A RECORD</div>
                     </div>
                    
                     <p className="text-[11px] text-blue-600 mt-2">
                       💡 <strong>Note:</strong> DNS propagation may take up to 24 hours. Keep checking &quot;Check DNS&quot; button.
                     </p>
                   </div>
                 </div>
               </div>
               
               <div className="flex justify-end space-x-3">
                 <button
                   onClick={() => {
                     setShowDomainModal(false);
                     setSelectedWebsite(null);
                     setCustomDomain('');
                   }}
                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                 >
                   <span className="font-body">Cancel</span>
                 </button>
                 <button
                   onClick={handleSaveDomain}
                   disabled={addingDomain || !customDomain.trim() || customDomainStatus.checking || customDomainStatus.available === false}
                   className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                 >
                   {addingDomain ? <span className="font-body">Adding...</span> : 
                    customDomainStatus.checking ? <span className="font-body">Checking...</span> :
                    <span className="font-body">Add Domain</span>}
                 </button>
               </div>
             </div>
           </div>
                   )}


        </main>

                {/* Subscription Modals */}
                <SubscriptionModal
                  isOpen={showSubscriptionModal}
                  onClose={() => setShowSubscriptionModal(false)}
                  onCreateSubscription={handleCreateSubscription}
                  subscriptionPlans={subscriptionPlans}
                  isLoading={creatingSubscription}
                  user={user}
                />

                <RenewModal
                  isOpen={showRenewModal}
                  onClose={() => setShowRenewModal(false)}
                  onRenewSubscription={handleRenewSubscription}
                  subscription={subscription}
                  subscriptionPlans={subscriptionPlans}
                  isLoading={creatingSubscription}
                  user={user}
                />

      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
