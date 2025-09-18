import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import JsonEditor from './components/JsonEditor';
import GeneratedIcon from './components/GeneratedIcon';
import { SparklesIcon, ExclamationTriangleIcon } from './components/Icons';
import { DEFAULT_JSON_PROMPT } from './constants';
import { generateIconFromReference } from './services/geminiService';

export default function App() {
  const [iconName, setIconName] = useState('a smiling cloud');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jsonPrompt, setJsonPrompt] = useState(DEFAULT_JSON_PROMPT);
  const [generatedIconUrl, setGeneratedIconUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (referenceImage) {
      const url = URL.createObjectURL(referenceImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [referenceImage]);

  const handleGenerateClick = async () => {
    if (!referenceImage || !iconName) {
      setError("Please provide a reference image and an icon description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedIconUrl(null);

    try {
      const finalPrompt = jsonPrompt.replace(/\[\[ICON_NAME\]\]/g, iconName);
      const imageUrl = await generateIconFromReference(finalPrompt, referenceImage);
      setGeneratedIconUrl(imageUrl);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isGenerateDisabled = !referenceImage || !iconName || isLoading;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div>
              <label htmlFor="icon-name" className="block text-sm font-medium text-gray-300 mb-2">Icon to Generate</label>
              <input
                id="icon-name"
                type="text"
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                placeholder="e.g., a smiling cloud"
                className="block w-full rounded-md bg-gray-900 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-200 shadow-sm"
              />
            </div>
            
            <ImageUploader onImageChange={setReferenceImage} previewUrl={previewUrl} />
            
            <JsonEditor value={jsonPrompt} onChange={(e) => setJsonPrompt(e.target.value)} />
            
            <button
              onClick={handleGenerateClick}
              disabled={isGenerateDisabled}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors duration-200
                ${isGenerateDisabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500'
                }
              `}
            >
              <SparklesIcon className="w-5 h-5" />
              {isLoading ? 'Generating...' : 'Generate Icon'}
            </button>
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-md flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0"/>
                <div>
                    <h4 className="font-bold">Generation Failed</h4>
                    <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column: Output */}
          <div className="sticky top-8">
            <GeneratedIcon iconUrl={generatedIconUrl} isLoading={isLoading} />
          </div>

        </div>
      </main>
    </div>
  );
}
