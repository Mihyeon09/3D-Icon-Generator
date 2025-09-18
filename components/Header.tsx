
import React from 'react';
import { CubeTransparentIcon } from './Icons';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <CubeTransparentIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI 3D Icon Generator
          </h1>
          <p className="text-sm text-gray-400">
            Generate consistent 3D icons from a reference image and a JSON style guide.
          </p>
        </div>
      </div>
    </header>
  );
}
