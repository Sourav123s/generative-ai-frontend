import React, { useState } from 'react';

const uploadUi = () => {
    const [activeTab, setActiveTab] = useState('Text');
    const [textContent, setTextContent] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [output, setOutput] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleTextChange = (e) => {
        setTextContent(e.target.value);
    };

    const handleFileChange = (e) => {
        setFileContent(e.target.files[0]);
    };

    const handleGenerateOutput = async () => {

        if (activeTab === 'Text') {
            // console.log('Generating output', textContent)
            // const res = await fetch('http://54.237.112.113:8503/text', {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ text: textContent }),
            // });
            // const data = await res.json();
            // console.log(data)
            const outputData = {
                text: [
                    {
                        answer: "Elon Reeve Musk",
                        option: [
                            "Elon Reeve Musk",
                            "Elon Thomas Musk",
                            "Elon James Musk",
                            "Elon David Musk"
                        ],
                        question: "What is Elon Musk's full name?"
                    },
                    {
                        answer: "South Africa",
                        explanation: "Elon Musk was born in Pretoria, South Africa.",
                        option: [
                            "United States",
                            "Canada",
                            "South Africa",
                            "Australia"
                        ],
                        question: "In which country was Elon Musk born?"
                    },
                    {
                        answer: "SpaceX",
                        explanation: "Elon Musk founded SpaceX in 2002 with the goal of reducing space transportation costs and enabling the colonization of Mars.",
                        option: [
                            "Tesla Motors",
                            "SpaceX",
                            "PayPal",
                            "SolarCity"
                        ],
                        question: "Which company did Elon Musk found in 2002?"
                    },
                    {
                        answer: "Tesla",
                        option: [
                            "Ford",
                            "Chevrolet",
                            "Tesla",
                            "Toyota"
                        ],
                        question: "What is the name of Elon Musk's electric car company?"
                    },
                    {
                        answer: "Amazon",
                        option: [
                            "Tesla",
                            "SpaceX",
                            "PayPal",
                            "Amazon"
                        ],
                        question: "Which of the following is NOT a company founded by Elon Musk?"
                    },
                    {
                        answer: "2002",
                        explanation: "Elon Musk became a U.S. citizen in 2002.",
                        option: [
                            "2000",
                            "2002",
                            "2004",
                            "2006"
                        ],
                        question: "In which year did Elon Musk become a U.S. citizen?"
                    },
                    {
                        answer: "SpaceX",
                        option: [
                            "NASA",
                            "Blue Origin",
                            "Virgin Galactic",
                            "SpaceX"
                        ],
                        question: "What is the name of Elon Musk's aerospace manufacturer and space transportation services company?"
                    },
                    {
                        answer: "Creating a flying car",
                        option: [
                            "Colonizing Mars",
                            "Reducing global warming",
                            "Creating a flying car",
                            "Developing AI technology"
                        ],
                        question: "Which of the following is NOT one of Elon Musk's goals?"
                    },
                    {
                        answer: "The Boring Company",
                        option: [
                            "The Boring Company",
                            "Dig This",
                            "Underground Solutions",
                            "Tunnel Tech"
                        ],
                        question: "What is the name of Elon Musk's tunnel construction and infrastructure company?"
                    },
                    {
                        answer: "Blue Origin",
                        option: [
                            "Hyperloop",
                            "Neuralink",
                            "Blue Origin",
                            "SolarCity"
                        ],
                        question: "Which of the following is NOT a project or company associated with Elon Musk?"
                    }
                ]
            }

            const formattedOutput = outputData.text.map((item, index) => {
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

            setOutput(formattedOutput);
            setIsModalOpen(true);
        };


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
                            onChange={handleFileChange}
                        />
                    )}
                </div>
                <div className="mt-4 flex justify-end">
                    <button disabled={!(textContent.length > 0 && activeTab === 'Text')} className="btn btn-primary" onClick={handleGenerateOutput}>
                        Generate Output
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
