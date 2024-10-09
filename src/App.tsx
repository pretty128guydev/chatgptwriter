import React, { useState } from 'react';
// import ReactDraggableResizable from 'react-draggable-resizable';
import Draggable from 'react-draggable';
import ContextField from './components/ContextField';
import PromptInput from './components/PromptInput';
import ModelSelector from './components/ModelSelector';
import ToneSelector from './components/ToneSelector';
import LengthSelector from './components/LengthSelector';
import EmailResponder from './components/EmailResponder';
import Header from './components/Header';
import { IoSend } from 'react-icons/io5';
import { FiPlus } from "react-icons/fi";


const App: React.FC = () => {
  const [context, setContext] = useState('');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('GPT 4o Mini');
  const [tone, setTone] = useState('Writing tone');
  const [length, setLength] = useState('Length');
  const [triggerGenerate, setTriggerGenerate] = useState(false); // To trigger the email generation
  const [contextshow, setcontextshow] = useState(false); // To trigger the email generation

  const handleGenerateEmail = () => {
    setTriggerGenerate((prev) => !prev); // Toggle the state to trigger useEffect in EmailResponder
  };

  const hadleContext = (prev: boolean) => {
    setcontextshow(!prev)
  }

  // Set default size and position
  const defaultWidth = 700;
  const defaultHeight = 300;

  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });

  // Center position based on the viewport size
  const centerX = window.innerWidth / 2 - defaultWidth / 2;
  const centerY = window.innerHeight / 2 - defaultHeight / 2;

  const [position, setPosition] = useState({ x: centerX, y: centerY });

  // Handle resize event
  const handleResize = (left: any, top: any, width: any, height: any) => {
    setSize({
      width: width,
      height: height
    });
  };

  // Handle drag event
  const handleDrag = (left: any, top: any) => {
    setPosition({ x: left, y: top });
  };


  return (
    <Draggable>
      <div className="cursor-pointer w-[700px] bg-white shadow-lg rounded-lg overflow-hidden position-relative" style={{ zIndex: "9999991", left: "50vw - 350px", top: "50vh - 100px" }}>
        <Header />
        {!contextshow && <div className='cursor-pointer t-[32px] m-[35px] flex items-center text-[#222] gap-2 ml-8 rounded border border-brown w-[107px] p-1 bg-yellow text-[13px]' onClick={() => hadleContext(false)}>Add Context<FiPlus /></div>}
        <div className="m-4 border border-brown rounded-custom-small">

          {contextshow &&
            <ContextField
              hadleContext={hadleContext}
              placeholder="Add any additional information for your prompt"
              value={context}
              onChange={setContext}
            />
          }
          <PromptInput
            placeholder="Enter your prompt for the AI"
            value={prompt}
            onChange={setPrompt}
          />
          <div className="ml-4 flex space-x-2 justify-between px-3">
            <div className='flex gap-4'>
              <ModelSelector onChange={setModel} />
              <ToneSelector onChange={setTone} />
              <LengthSelector onChange={setLength} />
            </div>
            <div>
              <button
                onClick={handleGenerateEmail} // Trigger email generation
                className="bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl py-2 px-4 h-[36px]"
              >
                <IoSend color="#fff" fontSize={20} height={36} />
              </button>
            </div>
          </div>
          <EmailResponder context={context} tone={tone} length={length} triggerGenerate={triggerGenerate} />
        </div>
      </div>
    </Draggable>
    // {/* </ReactDraggableResizable> */}
    // </div >
  );
};

export default App;
