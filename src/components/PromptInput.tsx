import React from 'react';

interface PromptInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white rounded-md border-0 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PromptInput;
