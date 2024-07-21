import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const PaymentGateway = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');
    const [showQrReader, setShowQrReader] = useState(false);

    const handleScan = (data) => {
        if (data) {
            setQrCodeData(data);
            setShowQrReader(false);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Payment Gateway</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Card Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="input input-bordered"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Expiry Date</span>
                        </label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="input input-bordered"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">CVV</span>
                        </label>
                        <input
                            type="text"
                            placeholder="CVV"
                            className="input input-bordered"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Pay Now</button>
                    </div>
                    <div className="divider">OR</div>
                    <div className="form-control">
                        <button className="btn btn-secondary" onClick={() => setShowQrReader(true)}>
                            Scan QR Code
                        </button>
                    </div>
                    {showQrReader && (
                        <div className="form-control mt-6">
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            <button className="btn btn-error mt-4" onClick={() => setShowQrReader(false)}>
                                Cancel
                            </button>
                        </div>
                    )}
                    {qrCodeData && (
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text">QR Code Data</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                value={qrCodeData}
                                readOnly
                            ></textarea>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
