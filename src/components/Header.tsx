import React from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { RiQuestionnaireLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
// import chatgpticon from '../assets/chatgpt_icon.png';
import { FaLock } from "react-icons/fa6";

// const chatgpticon = chrome.runtime.getURL('assets/chatgpt_icon.png');

const Header: React.FC = () => {
    const handleClose = () => {
        window.parent.postMessage({ type: 'TOGGLE_DIALOG' }, '*');
    };

    return (
        <div className="bg-white pt-6 pb-3 px-7 flex justify-between items-center">
            <div className="flex items-center">
                {/* <img src={chatgpticon} alt="ChatGPT Writer" className="w-6 h-6 mr-2" /> */}
                <span className="font-semibold text-gray-700">ChatGPT Writer</span>
                <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded flex items-center gap-2 rounded-lg">PRO <FaLock /></span>
            </div>
            <div className="w-[120px] flex items-center justify-between">
                <button className="text-gray-400 hover:text-gray-600 text-2xl">
                    <IoSettingsOutline />
                </button>
                <button className="text-gray-400 hover:text-gray-600 text-2xl">
                    <RiQuestionnaireLine />
                </button>
                <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={handleClose}>
                    <RxCross1 />
                </button>
            </div>
        </div>
    );
};

export default Header;
