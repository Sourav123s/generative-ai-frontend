import React, { useState, useRef } from 'react';

const uploadUi = () => {
    const [activeTab, setActiveTab] = useState('Text');
    const [textContent, setTextContent] = useState('');
    const [wikiContent, setWikiContent] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [youtubeContent, setYoutubeContent] = useState('');
    const [output, setOutput] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [number, setNumber] = useState('');
    const fileInputRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleTextChange = (e) => {
        setTextContent(e.target.value);
    };
    const handleWikiChange = (e) => {
        setWikiContent(e.target.value);
    };

    const handelYoutubeVideChange = (e) => {
        setYoutubeContent(e.target.value)
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        setFileContent(e.target.files[0]);
    };

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
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
            body = JSON.stringify({ text: textContent, number: number });
        } else if (activeTab === 'Wiki') {
            url = 'http://13.232.249.137/wiki';
            body = JSON.stringify({ text: wikiContent, number: number });
        } else if (activeTab === 'Document') {
            url = 'http://13.232.249.137/upload';
            const formData = new FormData();
            formData.append('file', fileContent);
            formData.append('number', number);
            body = formData;
        } else if (activeTab === 'Youtube') {
            url = 'http://13.232.249.137/youtube';
            body = JSON.stringify({ text: youtubeContent, number: number });
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: activeTab !== 'Document' ? { "Content-Type": "application/json" } : undefined,
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
        // if (output) {
        //     const outputText = output.map(item => item.props.children[0].props.children + '\n' +
        //         item.props.children[1].props.children.map(opt => opt.props.children + '\n').join('') +
        //         'Answer: ' + item.props.children[2].props.children[1] + '\n'
        //     ).join('\n');

        //     navigator.clipboard.writeText(outputText);
        // }
        if (output.length > 0) {
            const outputText = output.map((item, index) => {
                console.log(item.props.children)
                const question = item.props.children[0].props.children[1];
                const options = item.props.children[1].props.children.map((opt, optIndex) => `${optIndex + 1}. ${opt.props.children}`).join('\n');
                const answer = item.props.children[2].props.children[1];
                return `Q${index + 1}. ${question}\n${options}\nAnswer: ${answer}\n`;
            }).join('\n\n');


            navigator.clipboard.writeText(outputText);
        }
    };

    const generateButtonIsGoingDisable = () => {
        if (activeTab === 'Text') {
            return textContent.length > 0 && (activeTab === 'Text')
        } else if (activeTab === 'Wiki') {
            return wikiContent.length > 0 && (activeTab === 'Wiki')
        } else if (activeTab === 'Document') {
            return activeTab === 'Document' && fileContent != null
        } else if (activeTab === 'Youtube') {
            return youtubeContent.length > 0 && (activeTab === 'Youtube')
        }
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                <div className="tabs">
                    <a
                        className={`tab tab-bordered ${activeTab === 'Text' ? 'tab-active bg-blue-500 text-white rounded-xl' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Text')}
                    >
                        Text
                    </a>
                    <a
                        className={`tab tab-bordered ${activeTab === 'Wiki' ? 'tab-active bg-blue-500 text-white rounded-xl' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Wiki')}
                    >
                        Wiki
                    </a>
                    <a
                        className={`tab tab-bordered ${activeTab === 'Document' ? 'tab-active bg-blue-500 text-white rounded-xl' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Document')}
                    >
                        Document
                    </a>
                    {/* <a
                        className={`tab tab-bordered ${activeTab === 'Image' ? 'tab-active bg-blue-500 text-white rounded-xl' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Image')}
                    >
                        Image
                    </a> */}
                    <a
                        className={`tab tab-bordered ${activeTab === 'Youtube' ? 'tab-active bg-blue-500 text-white rounded-xl' : 'text-blue-500'}`}
                        onClick={() => handleTabChange('Youtube')}
                    >
                        YouTube
                    </a>
                </div>
                <div className="mt-4">
                    {activeTab === 'Text' && (
                        <div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="10"
                                placeholder="Paste in your notes or other content"
                                value={textContent}
                                onChange={handleTextChange}
                            ></textarea>
                            <select
                                className="select select-bordered w-full mt-4"
                                value={number}
                                onChange={handleNumberChange}
                            >
                                <option value="" disabled>Select number of questions</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    )}
                    {activeTab === 'Wiki' && (
                        <div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="1"
                                placeholder="Paste Wikipedia Link"
                                value={wikiContent}
                                onChange={handleWikiChange}
                            ></textarea>
                            <select
                                className="select select-bordered w-full mt-4"
                                value={number}
                                onChange={handleNumberChange}
                            >
                                <option value="" disabled>Select number of questions</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    )}
                    {activeTab === 'Document' && (
                        <div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                // value={fileContent ? fileContent : ''}
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                            <select
                                className="select select-bordered w-full mt-4"
                                value={number}
                                onChange={handleNumberChange}
                            >
                                <option value="" disabled>Select number of questions</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    )}
                    {activeTab === 'Youtube' && (
                        <div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="1"
                                placeholder="Paste Youtube Link"
                                value={youtubeContent}
                                onChange={handelYoutubeVideChange}
                            ></textarea>
                            <select
                                className="select select-bordered w-full mt-4"
                                value={number}
                                onChange={handleNumberChange}
                            >
                                <option value="" disabled>Select number of questions</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
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
