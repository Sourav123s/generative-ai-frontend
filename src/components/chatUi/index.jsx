// src/components/ChatUI.js
import React, { useState } from 'react';

const ChatUI = () => {
    const [selectedModel, setSelectedModel] = useState('GPT-3.5');

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex justify-center mt-4">
                <button
                    className={`btn ${selectedModel === 'GPT-3.5' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedModel('GPT-3.5')}
                >
                    GPT-3.5
                </button>
                <button
                    className={`btn ml-2 ${selectedModel === 'GPT-4' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedModel('GPT-4')}
                >
                    GPT-4
                </button>
            </div>
            <div className="flex-grow mt-4 flex justify-center items-center">
                <div className="text-center text-gray-400">No plugins added</div>
            </div>
            <div className="flex items-center p-4 border-t">
                <input
                    type="text"
                    className="input input-bordered flex-grow"
                    placeholder="Type your message here..."
                />
                <button className="btn btn-primary ml-2">Submit</button>
            </div>
        </div>
    );
};

export default ChatUI;
