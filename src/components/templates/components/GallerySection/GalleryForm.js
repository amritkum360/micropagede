'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';
import ImageGalleryModal from '../../../ui/ImageGalleryModal';

export default function GalleryForm({ section, onInputChange, sectionKey = 'gallery' }) {
  const fileInputRefs = useRef({});
  const { token } = useAuth();
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const addImage = () => {
    const newImages = [...(section.images || []), {
      title: 'New Image',
      description: 'Image description',
      image: ''
    }];
    onInputChange(sectionKey, 'images', newImages);
  };

  const removeImage = (index) => {
    const newImages = section.images.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'images', newImages);
  };

  const updateImage = (index, field, value) => {
    const newImages = [...section.images];
    newImages[index] = { ...newImages[index], [field]: value };
    onInputChange(sectionKey, 'images', newImages);
  };

  const handleImageSelect = (selectedImage) => {
    console.log('🖼️ Gallery image selected from gallery:', selectedImage);
    if (currentImageIndex !== null) {
      updateImage(currentImageIndex, 'image', selectedImage);
    }
    setCurrentImageIndex(null);
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const handleUploadNew = () => {
    if (currentImageIndex !== null) {
      fileInputRefs.current[`image-${currentImageIndex}`]?.click();
    }
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log(`🚀 Starting gallery image ${index} upload:`, {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Show loading state for this specific image
        const currentImages = [...(section.images || [])];
        currentImages[index] = {
          ...currentImages[index],
          image: {
            loading: true,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
          }
        };
        onInputChange(sectionKey, 'images', currentImages);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log(`✅ Gallery image ${index} upload successful:`, imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        // Update the specific image with server data
        const updatedImages = [...(section.images || [])];
        updatedImages[index] = {
          ...updatedImages[index],
          image: imageData
        };
        onInputChange(sectionKey, 'images', updatedImages);
        
        // Verify the data was set
        console.log(`🔍 Gallery image ${index} data after setting:`, imageData);
        
      } catch (error) {
        console.error(`❌ Gallery image ${index} upload failed:`, error);
        alert(error.message);
        // Remove loading state on error
        const currentImages = [...(section.images || [])];
        currentImages[index] = {
          ...currentImages[index],
          image: ''
        };
        onInputChange(sectionKey, 'images', currentImages);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Gallery Title */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Gallery Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Gallery"
        />
      </div>
      
      {/* Gallery Subtitle */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Gallery Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Check out our amazing work"
        />
      </div>

      {/* Gallery Images Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Gallery Images</label>
          <button
            type="button"
            onClick={addImage}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Add Image
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.images || []).map((image, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-700">Image {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600 mb-1">Gallery Image</label>
                  
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
                      disabled={image.image?.loading}
                      className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-blue-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                        image.image?.loading 
                          ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                          : 'bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                      }`}
                    >
                      {image.image?.loading ? (
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
                            Choose Gallery Image
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Supported formats: JPG, PNG, GIF, SVG • Max size: 5MB
                    </p>
                  </div>
                </div>

                {/* Image Preview */}
                {isImageUploaded(image.image) && !image.image?.loading && (
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 mb-1">Image Preview:</label>
                    <div className="w-24 h-18 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src={getImageSrc(image.image)} 
                        alt={`Gallery image ${index + 1}`} 
                        width={96}
                        height={72}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('❌ Gallery image load error:', {
                            src: getImageSrc(image.image),
                            imageData: image.image,
                            error: e
                          });
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={() => {
                          console.log('✅ Gallery image loaded successfully:', getImageSrc(image.image));
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                        Invalid Image
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-green-600 font-medium">
                          {image.image?.isServerImage ? '✓ Image uploaded to server' : '✓ Image uploaded successfully'}
                        </span>
                        {getImageMetadata(image.image) && (
                          <span className="text-xs text-gray-500">
                            {getImageMetadata(image.image).fileName} ({(getImageMetadata(image.image).fileSize / 1024).toFixed(1)}KB)
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => updateImage(index, 'image', '')}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* Image Title */}
                <input
                  type="text"
                  value={image.title || ''}
                  onChange={(e) => updateImage(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Image Title"
                />

                {/* Image Description */}
                <textarea
                  value={image.description || ''}
                  onChange={(e) => updateImage(index, 'description', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Image Description"
                  rows="2"
                />
              </div>
            </div>
          ))}
          
          {(!section.images || section.images.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No gallery images yet. Click &quot;Add Image&quot; to get started.
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setCurrentImageIndex(null);
        }}
        onSelectImage={handleImageSelect}
        onUploadNew={handleUploadNew}
        title="Select Gallery Image"
        currentImage={currentImageIndex !== null ? section.images?.[currentImageIndex]?.image : null}
      />
    </div>
  );
}
