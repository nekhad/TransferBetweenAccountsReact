import React, { useState, useEffect } from 'react';
import './TransferPage.css';

const TransferPage = () => {
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [fromAccountNumber, setFromAccountNumber] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch('http://localhost:9292/api/currencies/read');
                if (!response.ok) {
                    throw new Error('Failed to fetch currencies');
                }
                const data = await response.json();
                setCurrencies(data);
            } catch (error) {
                console.error('Error fetching currencies:', error.message);
            }
        };

        fetchCurrencies();
    }, []);

    const handleToAccountNumberChange = (e) => {
        const value = e.target.value;
        if (value.length <= 16) {
            setToAccountNumber(value);
        }
    };

    const handleFromAccountNumberChange = (e) => {
        const value = e.target.value;
        if (value.length <= 16) {
            setFromAccountNumber(value);
        }
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const handleTransfer = async () => {
        try {
            const response = await fetch('http://localhost:9292/api/v1/auth/accounts/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    toAccountNumber,
                    fromAccountNumber,
                    currency: selectedCurrency,
                    amount
                })
            });

            if (!response.ok) {
                throw new Error('Failed to transfer funds');
            }

            console.log('Funds transferred successfully');
        } catch (error) {
            console.error('Error transferring funds:', error.message);
        }
    };

    return (
        <div className="transfer-container">
            <h2>Transfer Page</h2>
            <div>
                <label htmlFor="toAccountNumber">To Account Number:</label>
                <input
                    type="text"
                    id="toAccountNumber"
                    value={toAccountNumber}
                    onChange={handleToAccountNumberChange}
                    maxLength={16}
                />
            </div>
            <div>
                <label htmlFor="fromAccountNumber">From Account Number:</label>
                <input
                    type="text"
                    id="fromAccountNumber"
                    value={fromAccountNumber}
                    onChange={handleFromAccountNumberChange}
                    maxLength={16}
                />
            </div>
            <div>
                <label htmlFor="currency">Currency:</label>
                <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                >
                    <option value="">Select Currency</option>
                    {currencies.map(currency => (
                        <option key={currency.id} value={currency.currencyType}>{currency.currencyType}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button onClick={handleTransfer}>Send</button>
        </div>
    );
};

export default TransferPage;
