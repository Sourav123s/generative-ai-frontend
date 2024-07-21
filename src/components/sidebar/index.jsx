import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import an icon for the close button
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ onClose }) => {
    console.log(onClose)
    return (
        <div className="w-90 bg-base-200 h-full p-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-lg">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <button className="btn btn-sm btn-circle" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="flex flex-col">
                    <button className="btn btn-block mb-2">dummy search</button>
                    <button className="btn btn-block mb-2">dummy search</button>
                    <button className="btn btn-block mb-2">dummy search</button>
                    <button className="btn btn-block mb-2">dummy search</button>
                    {/* <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title">Other Pages</div>
                        <div className="collapse-content">
                            <button className="btn btn-block mb-2">Page 1</button>
                            <button className="btn btn-block mb-2">Page 2</button>
                        </div>
                    </div> */}
                    {/* <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title">Admin Pages</div>
                        <div className="collapse-content">
                            <button className="btn btn-block mb-2">Admin 1</button>
                            <button className="btn btn-block mb-2">Admin 2</button>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="mt-4">
                <div className="font-bold">Credits</div>
                {/* <div>3264/100,000 credits used</div> */}
                {/* <button className="btn btn-block mt-2">Set API Key</button> */}
            </div>
            <div className="mt-4 flex items-center">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="w-10 h-10 rounded-full" />
                <div className="ml-2">
                    <div className="font-bold">Dummy User</div>
                    <button className="btn btn-xs">
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
