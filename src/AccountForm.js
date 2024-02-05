import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountForm.css';

const AccountForm = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [isActive, setIsActive] = useState('');
    const [currencyId, setCurrency] = useState('');
    const [currencyOptions, setCurrencyOptions] = useState([]);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get('http://localhost:9292/api/currencies/read');
                setCurrencyOptions(response.data);
            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        };

        fetchCurrencyData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9292/api/v1/auth/accounts/create', {
                accountNumber,
                expirationDate,
                cvc,
                isActive,
                currencyId
            });

            console.log('Account created:', response.data);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    const handleCurrencyChange = async (e) => {
        setCurrency(e.target.value);
    };

    const handleActiveChange = async (e) => {
        setIsActive(e.target.value);
    };

    return (
        <div className="account-form-container">
            <h2>Create Account</h2>
            <form className="account-form" onSubmit={handleSubmit}>
                <label>Account Number:</label>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />

                <label>Expiration Date:</label>
                <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />

                <label>CVC:</label>
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} required />

                <label>Active:</label>
                <select value={isActive} onChange={handleActiveChange} required>
                    <option value="">Select Active</option>
                    <option value="A">A</option>
                    <option value="D">D</option>
                </select>
                <label>Currency:</label>
                <select value={currencyId} onChange={handleCurrencyChange} required>
                    <option value="">Select Currency</option>
                    {currencyOptions.map((option) => (
                        <option key={option.id} value={option.currencyType}>{option.currencyType}</option>
                    ))}
                </select>
                <button type="submit" className="create-button">Create</button>
            </form>
        </div>
    );
};

export default AccountForm;
