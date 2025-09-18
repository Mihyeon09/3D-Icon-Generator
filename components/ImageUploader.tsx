
import React, { useRef, useState } from 'react';
import { PhotoIcon, XCircleIcon } from './Icons';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
}

export default function ImageUploader({ onImageChange, previewUrl }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageChange(file || null);
  };
  
  const handleClearImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      onImageChange(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageChange(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Reference Style Image</label>
      <label
        htmlFor="file-upload"
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        className={`relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-200
        ${isDragging ? 'border-blue-400 bg-blue-900/30' : 'border-gray-600 hover:border-gray-500'}
        `}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="max-h-48 rounded-md object-contain" />
            <button 
                onClick={handleClearImage}
                className="absolute top-2 right-2 bg-gray-900/70 rounded-full text-white hover:text-red-400 transition-colors"
                title="Remove image"
            >
                <XCircleIcon className="w-8 h-8"/>
            </button>
          </>
        ) : (
          <div className="space-y-1 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
            <div className="flex text-sm text-gray-400">
              <p className="pl-1">Upload a file or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input 
            id="file-upload" 
            name="file-upload" 
            type="file" 
            className="sr-only" 
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange} 
        />
      </label>
    </div>
  );
}
