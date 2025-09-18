
import React from 'react';
import { CubeIcon } from './Icons';

interface GeneratedIconProps {
  iconUrl: string | null;
  isLoading: boolean;
}

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="w-24 h-24 border-4 border-dashed border-gray-600 rounded-full animate-spin-slow">
        <div className="w-full h-full border-4 border-dashed border-purple-500 rounded-full animate-spin-slow-reverse"></div>
    </div>
    <p className="text-gray-400 font-medium">Generating your icon...</p>
    <p className="text-xs text-gray-500 text-center">This may take a moment. The AI is crafting your design.</p>
  </div>
);


const InitialState = () => (
  <div className="flex flex-col items-center justify-center text-center gap-4">
    <div className="p-4 bg-gray-700/50 rounded-full">
        <CubeIcon className="w-16 h-16 text-gray-500" />
    </div>
    <h3 className="text-lg font-semibold text-gray-300">Your icon will appear here</h3>
    <p className="text-sm text-gray-500 max-w-xs">
      Upload a reference image, provide the JSON prompt, and click "Generate" to see the magic happen.
    </p>
  </div>
);

export default function GeneratedIcon({ iconUrl, isLoading }: GeneratedIconProps) {
  return (
    <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingState />
      ) : iconUrl ? (
        <div className="flex flex-col items-center gap-4">
          <img 
            src={iconUrl} 
            alt="Generated Icon" 
            className="max-w-full max-h-full object-contain animate-fade-in"
            style={{ animation: 'fadeIn 0.5s ease-in-out' }}
          />
          <a
            href={iconUrl}
            download="generated-icon.png"
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-md transition-colors"
          >
            Download Icon
          </a>
        </div>
      ) : (
        <InitialState />
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
