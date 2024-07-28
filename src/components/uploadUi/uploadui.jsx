import React, { useState, useRef } from 'react';

const uploadUi = () => {
    const [activeTab, setActiveTab] = useState('Text');
    const [textContent, setTextContent] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [output, setOutput] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleTextChange = (e) => {
        setTextContent(e.target.value);
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        setFileContent(e.target.files[0]);
    };

    const formattedOutputFormat = (output) => {
        return output.text.map((item, index) => {
            return (
                <div key={index} className="mb-4">
                    <p><strong>Q{index + 1}. {item.question}</strong></p>
                    <ul className="list-decimal ml-5">
                        {item.option.map((opt, optIndex) => (
                            <li key={optIndex}>{opt}</li>
                        ))}
                    </ul>
                    <p><strong>Answer:</strong> {item.answer}</p>
                </div>
            );
        });
    }
    const handleGenerateOutput = async () => {
        setIsLoading(true); // Set loading to true
        let url, body;

        if (activeTab === 'Text') {
            url = 'http://13.232.249.137/text';
            body = JSON.stringify({ text: textContent });
        } else if (activeTab === 'Document') {
            url = 'http://13.232.249.137/upload';
            const formData = new FormData();
            formData.append('file', fileContent);
            body = formData;
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: activeTab === 'Text' ? { "Content-Type": "application/json" } : undefined,
                body: body,
            });
            const data = await res.json();
            const outputData = data;

            const formattedOutput = formattedOutputFormat(outputData);

            setOutput(formattedOutput);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error generating output:", error);
        } finally {
            setIsLoading(false); // Set loading to false after the API call
        }
    };
    const handleCopyOutput = () => {
        if (output) {
            const outputText = output.map(item => item.props.children[0].props.children + '\n' +
                item.props.children[1].props.children.map(opt => opt.props.children + '\n').join('') +
                'Answer: ' + item.props.children[2].props.children[1] + '\n'
            ).join('\n');

            navigator.clipboard.writeText(outputText);
        }
    };

    const generateButtonIsGoingDisable = () => {
        if (activeTab === 'Text') {
            return textContent.length > 0 && (activeTab === 'Text')
        } else if (activeTab === 'Document') {
            return activeTab === 'Document' && fileContent != null
        }
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                <div className="tabs">
                    <a
                        className={`tab tab-bordered ${activeTab === 'Text' ? 'tab-active bg-blue-500 text-white' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Text')}
                    >
                        Text
                    </a>
                    <a
                        className={`tab tab-bordered ${activeTab === 'Document' ? 'tab-active bg-blue-500 text-white' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Document')}
                    >
                        Document
                    </a>
                    <a
                        className={`tab tab-bordered ${activeTab === 'Image' ? 'tab-active bg-blue-500 text-white' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Image')}
                    >
                        Image
                    </a>
                    <a
                        className={`tab tab-bordered ${activeTab === 'Video' ? 'tab-active bg-blue-500 text-white' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Video')}
                    >
                        Video
                    </a>
                </div>
                <div className="mt-4">
                    {activeTab === 'Text' && (
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="10"
                            placeholder="Paste in your notes or other content"
                            value={textContent}
                            onChange={handleTextChange}
                        ></textarea>
                    )}
                    {activeTab === 'Document' && (
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            // value={fileContent ? fileContent : ''}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                    )}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        disabled={!generateButtonIsGoingDisable() || isLoading}
                        className="btn btn-primary"
                        onClick={handleGenerateOutput}
                    >
                        {isLoading ? 'Generating...' : 'Generate Output'}
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                        <h2 className="text-lg font-bold mb-4">Output</h2>
                        <div className="bg-gray-100 p-4 rounded-lg max-h-64 overflow-auto">
                            {output}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="btn btn-secondary  bg-blue-500 mr-2" onClick={handleCopyOutput}>
                                Copy Output
                            </button>
                            <button className="btn" onClick={() => setIsModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default uploadUi;
