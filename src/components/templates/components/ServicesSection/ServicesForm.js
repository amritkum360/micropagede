'use client';

import React, { useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';
import ImageGalleryModal from '../../../ui/ImageGalleryModal';

export default function ServicesForm({ section, onInputChange, sectionKey = 'services' }) {
  const fileInputRefs = useRef({});
  const { token } = useAuth();
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(null);

  const addService = () => {
    const newItems = [...(section.items || []), { 
      title: 'New Service', 
      description: 'Service description', 
      icon: '🚀', 
      price: '',
      image: '',
      buttonText: 'Get Started',
      buttonLink: '#contact',
      features: []
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeService = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateService = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  const handleImageSelect = (selectedImage) => {
    console.log('🖼️ Service image selected from gallery:', selectedImage);
    if (currentServiceIndex !== null) {
      updateService(currentServiceIndex, 'image', selectedImage);
    }
    setCurrentServiceIndex(null);
  };

  const openImageModal = (index) => {
    setCurrentServiceIndex(index);
    setShowImageModal(true);
  };

  const handleUploadNew = () => {
    if (currentServiceIndex !== null) {
      fileInputRefs.current[`image-${currentServiceIndex}`]?.click();
    }
  };

  const addFeature = (serviceIndex) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features = [...(newItems[serviceIndex].features || []), 'New Feature'];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeFeature = (serviceIndex, featureIndex) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features = newItems[serviceIndex].features.filter((_, i) => i !== featureIndex);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateFeature = (serviceIndex, featureIndex, value) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features[featureIndex] = value;
    onInputChange(sectionKey, 'items', newItems);
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log('🚀 Starting service image upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          serviceIndex: index
        });

        // Clear any existing image data first
        updateService(index, 'image', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        updateService(index, 'image', loadingData);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log('✅ Service image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        // Test the image URL accessibility
        console.log('🔍 Testing service image URL accessibility:', imageData.url);
        try {
          const testResponse = await fetch(imageData.url, { method: 'HEAD' });
          console.log('🔍 Service image URL test response:', {
            status: testResponse.status,
            ok: testResponse.ok,
            headers: Object.fromEntries(testResponse.headers.entries())
          });
        } catch (testError) {
          console.error('🔍 Service image URL test failed:', testError);
        }
        
        updateService(index, 'image', imageData);
        
        // Verify the data was set
        console.log('🔍 Service image data after setting:', imageData);
        console.log('🔍 Service items after update:', section.items);
        
      } catch (error) {
        console.error('❌ Service image upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        updateService(index, 'image', '');
      }
    }
  };

  const iconOptions = ['🚀', '💡', '⚡', '🎯', '🔧', '📱', '💻', '🎨', '📊', '🔒', '🌐', '📈', '🎪', '🏆', '⭐', '💎'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Services"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="What We Offer"
        />
      </div>

      {/* Services Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Services</label>
          <button
            type="button"
            onClick={addService}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Service
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((service, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Service {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
                             <div className="space-y-2">
                                   {/* Icon and Image Selection */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Icon & Image Options</label>
                    
                    {/* Icon Selection */}
                    <div className="mb-3">
                      <label className="block text-xs text-gray-600 mb-1">Select Icon</label>
                      <div className="grid grid-cols-8 gap-1">
                        {iconOptions.map((icon, iconIndex) => (
                          <button
                            key={iconIndex}
                            type="button"
                            onClick={() => updateService(index, 'icon', icon)}
                            className={`w-8 h-8 text-lg rounded border-2 transition-colors ${
                              service.icon === icon 
                                ? 'border-indigo-500 bg-indigo-100' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs text-gray-600 mb-1">Choose Product Image (Optional)</label>
                      
                      {/* File Upload Option */}
                      <div>
                        <input
                          ref={(el) => fileInputRefs.current[`image-${index}`] = el}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => openImageModal(index)}
                          disabled={service.image?.loading}
                          className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-blue-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                            service.image?.loading 
                              ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                              : 'bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                          }`}
                        >
                          {service.image?.loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-xs font-medium text-gray-600">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 text-blue-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                              </svg>
                              <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700">
                                Choose Service Image
                              </span>
                            </>
                          )}
                        </button>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          Supported formats: JPG, PNG, GIF, SVG • Max size: 5MB
                        </p>
                      </div>
                      
                      {/* Image Preview */}
                      {isImageUploaded(service.image) && !service.image?.loading && (
                        <div className="mt-2">
                          <label className="block text-xs text-gray-600 mb-1">Image Preview:</label>
                          <div className="w-20 h-16 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <img
                              src={getImageSrc(service.image)} 
                              alt="Service preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error('❌ Service image load error:', {
                                  src: getImageSrc(service.image),
                                  imageData: service.image,
                                  error: e
                                });
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                              onLoad={() => {
                                console.log('✅ Service image loaded successfully:', getImageSrc(service.image));
                              }}
                            />
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                              Invalid Image
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex flex-col">
                              <span className="text-xs text-green-600 font-medium">
                                {service.image?.isServerImage ? '✓ Image uploaded to server' : '✓ Image uploaded successfully'}
                              </span>
                              {getImageMetadata(service.image) && (
                                <span className="text-xs text-gray-500">
                                  {getImageMetadata(service.image).fileName} ({(getImageMetadata(service.image).fileSize / 1024).toFixed(1)}KB)
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => updateService(index, 'image', '')}
                              className="text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                {/* Service Title */}
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Service Title"
                />

                {/* Service Description */}
                <textarea
                  value={service.description || ''}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Service Description"
                />

                                                   {/* Service Price */}
                  <input
                    type="text"
                    value={service.price || ''}
                    onChange={(e) => updateService(index, 'price', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Price (e.g., $99, Free, Contact Us)"
                  />

                                     {/* Button Text */}
                   <input
                     type="text"
                     value={service.buttonText || 'Get Started'}
                     onChange={(e) => updateService(index, 'buttonText', e.target.value)}
                     className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                     placeholder="Button Text (e.g., Get Started, Call Now, Learn More)"
                   />

                   {/* Button Link */}
                   <input
                     type="text"
                     value={service.buttonLink || '#contact'}
                     onChange={(e) => updateService(index, 'buttonLink', e.target.value)}
                     className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                     placeholder="Button Link (e.g., #contact, /services, https://example.com)"
                   />

                                   

                 {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-gray-600">Features</label>
                    <button
                      type="button"
                      onClick={() => addFeature(index)}
                      className="px-1 py-0.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(service.features || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Feature description"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index, featureIndex)}
                          className="px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No services yet. Click &quot;Add Service&quot; to get started.
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setCurrentServiceIndex(null);
        }}
        onSelectImage={handleImageSelect}
        onUploadNew={handleUploadNew}
        title="Select Service Image"
        currentImage={currentServiceIndex !== null ? section.items?.[currentServiceIndex]?.image : null}
      />
    </div>
  );
}
