'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getImageSrc } from '@/utils/imageUtils';
import { deleteImage } from '@/services/imageUploadService';

export default function ImageGalleryModal({ 
  isOpen, 
  onClose, 
  onSelectImage, 
  onUploadNew,
  title = "Select Image",
  currentImage = null 
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLimit, setImageLimit] = useState(30); // Dynamic limit from server
  const { token } = useAuth();

  // Fetch user's uploaded images
  const fetchUserImages = async () => {
    if (!token) {
      setError('Please login to view your images');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🖼️ Fetching user images...');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-images`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ User images fetched successfully:', data);
      
      setImages(data.images || []);
      
      // Update image limit from server response
      if (data.limit) {
        setImageLimit(data.limit);
        console.log(`📊 Image limit updated to: ${data.limit}`);
      }
    } catch (error) {
      console.error('❌ Failed to fetch user images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUserImages();
      setSelectedImage(currentImage);
    }
  }, [isOpen, currentImage]);

  // Handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Handle confirm selection
  const handleConfirm = () => {
    if (selectedImage) {
      onSelectImage(selectedImage);
      onClose();
    }
  };

  // Handle modal close
  const handleClose = () => {
    setSelectedImage(null);
    setError(null);
    onClose();
  };

  // Handle image deletion
  const handleDeleteImage = async (imageToDelete) => {
    if (!window.confirm(`Are you sure you want to delete "${imageToDelete.originalName || imageToDelete.filename}"?`)) {
      return;
    }

    try {
      await deleteImage(imageToDelete.url, token);
      
      // Remove from local state
      setImages(prevImages => prevImages.filter(img => img.url !== imageToDelete.url));
      
      // Clear selection if deleted image was selected
      if (selectedImage && selectedImage.url === imageToDelete.url) {
        setSelectedImage(null);
      }
      
      console.log('✅ Image deleted successfully');
    } catch (error) {
      console.error('❌ Failed to delete image:', error);
      alert('Failed to delete image: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <div className="text-sm text-gray-500 mt-1">
              Images: {images.length}/{imageLimit}
              {images.length >= imageLimit && (
                <span className="text-red-500 ml-2 font-medium">• Limit reached</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Upload New Button */}
            <button
              onClick={() => {
                if (onUploadNew && images.length < imageLimit) {
                  onUploadNew();
                }
              }}
              disabled={images.length >= imageLimit}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                images.length >= imageLimit
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-medium">
                {images.length >= imageLimit ? 'Limit Reached' : 'Upload New'}
              </span>
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading your images...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={fetchUserImages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium text-gray-600 mb-2">No images found</p>
                <p className="text-sm text-gray-500 mb-2">Upload some images first to see them here.</p>
                <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 inline-block">
                  📊 You can upload up to {imageLimit} images
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Image Summary */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-800">
                      {images.length} images available
                    </span>
                  </div>
                  <div className="text-xs text-blue-600">
                    {imageLimit - images.length} slots remaining
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelect(image)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 group ${
                    selectedImage && selectedImage.url === image.url
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square">
                    <img
                      src={getImageSrc(image)}
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('❌ Gallery image load error:', {
                          src: getImageSrc(image),
                          imageData: image,
                          error: e
                        });
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                      Invalid Image
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedImage && selectedImage.url === image.url && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image);
                    }}
                    className="absolute top-2 left-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Delete image"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  
                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                    <p className="text-xs truncate">{image.originalName || image.filename}</p>
                    <p className="text-xs opacity-75">{(image.fileSize / 1024).toFixed(1)}KB</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedImage ? (
              <span className="text-green-600 font-medium">
                ✓ {selectedImage.originalName || selectedImage.filename} selected
              </span>
            ) : (
              <span>Select an image to continue</span>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {images.length === 0 ? (
                <span>No images uploaded yet</span>
              ) : (
                <span>
                  {images.length} of {imageLimit} images used
                  {images.length >= imageLimit && (
                    <span className="text-red-500 ml-2 font-medium">• Limit reached</span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedImage}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedImage
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Use Selected Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
