import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { MdAutoAwesome } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

interface ToneSelectorProps {
  onChange: (tone: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Writing tone');

  const tones = [
    'Auto',
    'Professional',
    'Casual',
    'Straightforward',
    'Confident',
    'Friendly',
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectTone = (tone: string) => {
    setSelectedTone(tone);
    onChange(tone);
    setIsOpen(false);
  };

  return (
    <div className="relative h-[30px]">
      {isOpen && (
        <div className="absolute z-10 bottom-[35px] mt-2 w-full bg-white border rounded-md shadow-lg overflow-auto">
          {tones.map((tone, index) => (
            <div
              key={index}
              className="py-1 px-3 cursor-pointer hover:bg-yellow text-gray-700 flex items-center gap-2"
              onClick={() => selectTone(tone)}
            >
              {tone}
              {tone === "Auto" && <MdAutoAwesome />}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between w-[140px] p-1 border rounded-md text-gray-700 bg-yellow hover:bg-yellow h-[30px]"
      >
        <span className='flex items-center gap-2'>{selectedTone}
          {selectedTone === "Auto" && <MdAutoAwesome />}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <RxCross1 className="w-4 h-4" />}
        
      </button>
    </div>
  );
};

export default ToneSelector;