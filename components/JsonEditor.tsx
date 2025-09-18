import React from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  return (
    <div>
      <label htmlFor="json-prompt" className="block text-sm font-medium text-gray-300 mb-2">
        JSON Style Prompt (Advanced)
      </label>
      <textarea
        id="json-prompt"
        rows={15}
        value={value}
        onChange={onChange}
        className="block w-full h-96 rounded-md bg-gray-900 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-200 font-mono text-xs shadow-sm transition-colors duration-200 p-4"
        placeholder="Enter your JSON style guide here..."
      />
       <p className="text-xs text-gray-500 mt-2">
          {/* Fix: Correctly display the placeholder string to match the one in the default prompt. */}
          The <code className="bg-gray-700 p-1 rounded-sm text-blue-300">{'[[ICON_NAME]]'}</code> placeholder will be replaced by your input. Advanced users can edit this JSON to fine-tune the style.
       </p>
    </div>
  );
}
