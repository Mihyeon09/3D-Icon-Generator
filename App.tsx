import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import JsonEditor from './components/JsonEditor';
import GeneratedIcon from './components/GeneratedIcon';
import { generateIconFromReference } from './services/geminiService';
import { INITIAL_JSON_PROMPT } from './constants';
import { SparklesIcon, ExclamationTriangleIcon } from './components/Icons';

export default function App() {
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<string | null>(null);
  const [iconPrompt, setIconPrompt] = useState<string>('backpack');
  const [jsonInput, setJsonInput] = useState<string>(INITIAL_JSON_PROMPT);
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setReferenceImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setReferenceImagePreview(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!referenceImage) {
      setError('Please upload a reference image.');
      return;
    }
     if (!iconPrompt.trim()) {
      setError('Please enter an icon description.');
      return;
    }
    if (!jsonInput) {
      setError('JSON prompt cannot be empty.');
      return;
    }

    const finalJsonString = jsonInput.replace('[{{ICON_NAME}}]', iconPrompt);

    let parsedJson;
    try {
      parsedJson = JSON.parse(finalJsonString);
    } catch (e) {
      setError('Invalid JSON format. Please check your syntax.');
      return;
    }

    const prompt = parsedJson.task;
    if (!prompt || typeof prompt !== 'string') {
      setError('The JSON must have a "task" field with a string value.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedIcon(null);

    try {
      const result = await generateIconFromReference(prompt, referenceImage);
      setGeneratedIcon(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [referenceImage, jsonInput, iconPrompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-blue-400">1. Inputs</h2>
          <ImageUploader 
            onImageChange={handleImageChange} 
            previewUrl={referenceImagePreview} 
          />
          <div>
            <label htmlFor="icon-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Icon Description
            </label>
            <input
              type="text"
              id="icon-prompt"
              value={iconPrompt}
              onChange={(e) => setIconPrompt(e.target.value)}
              className="block w-full rounded-md bg-gray-900 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-200 shadow-sm transition-colors duration-200 p-3"
              placeholder="e.g., a futuristic backpack, a retro rocket"
              aria-label="Icon to generate"
            />
          </div>
          <JsonEditor 
            value={jsonInput} 
            onChange={(e) => setJsonInput(e.target.value)} 
          />
          {error && (
            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg border border-red-700 flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 flex-shrink-0"/>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !referenceImage}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6" />
                Generate Icon
              </>
            )}
          </button>
        </div>
        
        {/* Right Column: Output */}
        <div className="sticky top-8 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm min-h-[400px] lg:min-h-0">
          <h2 className="text-xl font-bold text-purple-400 mb-4">2. Generated Output</h2>
          <GeneratedIcon 
            iconUrl={generatedIcon} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}