import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import an icon for the close button

const Sidebar = ({ onClose }) => {
    console.log(onClose)
    return (
        <div className="w-64 bg-base-200 h-full p-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-lg">HORIZON AI</div>
                    <button className="btn btn-sm btn-circle" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="flex flex-col">
                    <button className="btn btn-block mb-2">All Templates</button>
                    <button className="btn btn-block mb-2">My Projects</button>
                    <button className="btn btn-block mb-2">Chat UI</button>
                    <button className="btn btn-block mb-2">Assistant UI</button>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title">Other Pages</div>
                        <div className="collapse-content">
                            <button className="btn btn-block mb-2">Page 1</button>
                            <button className="btn btn-block mb-2">Page 2</button>
                        </div>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title">Admin Pages</div>
                        <div className="collapse-content">
                            <button className="btn btn-block mb-2">Admin 1</button>
                            <button className="btn btn-block mb-2">Admin 2</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="font-bold">Credits</div>
                <div>3264/100,000 credits used</div>
                <button className="btn btn-block mt-2">Set API Key</button>
            </div>
            <div className="mt-4 flex items-center">
                <img src="user-image-url" alt="User" className="w-10 h-10 rounded-full" />
                <div className="ml-2">
                    <div className="font-bold">Adela Parkson</div>
                    <button className="btn btn-xs">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
