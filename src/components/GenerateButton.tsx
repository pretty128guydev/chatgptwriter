import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-full px-4 py-2 text-black bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      Generate
    </button>
  );
};

export default GenerateButton;