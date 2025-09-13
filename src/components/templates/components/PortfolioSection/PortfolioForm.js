'use client';

import React, { useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';
import ImageGalleryModal from '../../../ui/ImageGalleryModal';

export default function PortfolioForm({ section, onInputChange, sectionKey = 'portfolio' }) {
  const fileInputRefs = useRef({});
  const { token } = useAuth();
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const addProject = () => {
    const newProjects = [...(section.projects || []), { title: 'New Project', description: 'Project description', image: '', link: '' }];
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const removeProject = (index) => {
    const newProjects = section.projects.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...section.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const handleImageSelect = (selectedImage) => {
    console.log('🖼️ Portfolio image selected from gallery:', selectedImage);
    if (currentProjectIndex !== null) {
      updateProject(currentProjectIndex, 'image', selectedImage);
    }
    setCurrentProjectIndex(null);
  };

  const openImageModal = (index) => {
    setCurrentProjectIndex(index);
    setShowImageModal(true);
  };

  const handleUploadNew = () => {
    if (currentProjectIndex !== null) {
      fileInputRefs.current[`image-${currentProjectIndex}`]?.click();
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

        console.log('🚀 Starting portfolio image upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          projectIndex: index
        });

        // Clear any existing image data first
        updateProject(index, 'image', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        updateProject(index, 'image', loadingData);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log('✅ Portfolio image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        // Test the image URL accessibility
        console.log('🔍 Testing portfolio image URL accessibility:', imageData.url);
        try {
          const testResponse = await fetch(imageData.url, { method: 'HEAD' });
          console.log('🔍 Portfolio image URL test response:', {
            status: testResponse.status,
            ok: testResponse.ok,
            headers: Object.fromEntries(testResponse.headers.entries())
          });
        } catch (testError) {
          console.error('🔍 Portfolio image URL test failed:', testError);
        }
        
        updateProject(index, 'image', imageData);
        
        // Verify the data was set
        console.log('🔍 Portfolio image data after setting:', imageData);
        console.log('🔍 Portfolio projects after update:', section.projects);
        
      } catch (error) {
        console.error('❌ Portfolio image upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        updateProject(index, 'image', '');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Portfolio"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Recent Work & Projects"
        />
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Projects</label>
          <button
            type="button"
            onClick={addProject}
            className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            + Add Project
          </button>
        </div>
        
        <div className="space-y-2">
          {(section.projects || []).map((project, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Title"
                />
                <input
                  type="text"
                  value={project.description || ''}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Description"
                />
                                 <div className="space-y-2">
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
                       disabled={project.image?.loading}
                       className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-blue-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                         project.image?.loading 
                           ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                           : 'bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                       }`}
                     >
                       {project.image?.loading ? (
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
                             Choose Project Image
                           </span>
                         </>
                       )}
                     </button>
                     <p className="text-xs text-gray-500 mt-1 text-center">
                       Supported formats: JPG, PNG, GIF, SVG • Max size: 5MB
                     </p>
                   </div>
                   
                   {/* Image Preview */}
                   {isImageUploaded(project.image) && !project.image?.loading && (
                     <div className="mt-2">
                       <label className="block text-xs text-gray-600 mb-1">Image Preview:</label>
                       <div className="w-20 h-16 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                         <img
                           src={getImageSrc(project.image)} 
                           alt="Project preview" 
                           className="w-full h-full object-cover"
                           onError={(e) => {
                             console.error('❌ Portfolio image load error:', {
                               src: getImageSrc(project.image),
                               imageData: project.image,
                               error: e
                             });
                             e.target.style.display = 'none';
                             e.target.nextSibling.style.display = 'flex';
                           }}
                           onLoad={() => {
                             console.log('✅ Portfolio image loaded successfully:', getImageSrc(project.image));
                           }}
                         />
                         <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                           Invalid Image
                         </div>
                       </div>
                       <div className="flex items-center justify-between mt-1">
                         <div className="flex flex-col">
                           <span className="text-xs text-green-600 font-medium">
                             {project.image?.isServerImage ? '✓ Image uploaded to server' : '✓ Image uploaded successfully'}
                           </span>
                           {getImageMetadata(project.image) && (
                             <span className="text-xs text-gray-500">
                               {getImageMetadata(project.image).fileName} ({(getImageMetadata(project.image).fileSize / 1024).toFixed(1)}KB)
                             </span>
                           )}
                         </div>
                         <button
                           onClick={() => updateProject(index, 'image', '')}
                           className="text-xs text-red-500 hover:text-red-700 font-medium"
                         >
                           Remove
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
                <input
                  type="text"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Link (optional)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.projects || section.projects.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-2">
              No projects yet. Click &quot;Add Project&quot; to get started.
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false);
          setCurrentProjectIndex(null);
        }}
        onSelectImage={handleImageSelect}
        onUploadNew={handleUploadNew}
        title="Select Project Image"
        currentImage={currentProjectIndex !== null ? section.projects?.[currentProjectIndex]?.image : null}
      />
    </div>
  );
}
