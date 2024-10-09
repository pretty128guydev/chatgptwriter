import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { RxCross1 } from "react-icons/rx";

interface LengthSelectorProps {
  onChange: (length: string) => void;
}

const LengthSelector: React.FC<LengthSelectorProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLength, setSelectedLength] = useState('Length');

  const lengths = ['Short', 'Medium', 'Long'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectLength = (length: string) => {
    setSelectedLength(length);
    onChange(length);
    setIsOpen(false);
  };

  return (
    <div className="relative h-[30px]">
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bottom-[35px] bg-white border rounded-md shadow-lg">
          {lengths.map((length, index) => (
            <div
              key={index}
              className="py-1 px-2 cursor-pointer hover:bg-yellow text-gray-700"
              onClick={() => selectLength(length)}
            >
              {length}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between w-[90px] p-1 border rounded-md text-gray-700 bg-yellow hover:bg-yellow h-[30px]"
      >
        <span>{selectedLength}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <RxCross1 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default LengthSelector;