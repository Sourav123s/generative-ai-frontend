// src/components/ChatUI.js
import React, { useState } from 'react';

const ChatUI = () => {
    const [selectedModel, setSelectedModel] = useState('V-3.5');

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex justify-center mt-4">
                <button
                    className={`btn ${selectedModel === 'V-3.5' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedModel('V-3.5')}
                >
                    V-3.5
                </button>
                <button
                    className={`btn ml-2 ${selectedModel === 'V-4' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedModel('V-4')}
                >
                    V-4
                </button>
            </div>
            <div className="flex-grow mt-4 flex justify-center items-center">
                <div className="text-center text-gray-400">No plugins added</div>
            </div>
            <div className="flex items-center p-4 border-t">
                <select className="select select-bordered size-1">
                    <option disabled selected>Pick category</option>
                    <option>T-shirts</option>
                    <option>Mugs</option>
                </select>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-primary ml-2">Submit</button>
            </div>
        </div>


    );

};

export default ChatUI;
