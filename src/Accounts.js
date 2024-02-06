import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';
import Card from './assets/new_card-removebg-preview.png'
import { convertAccountNumber, convertDateFormat } from './convertDate';
const AccountsPage = () => {
    const [accountsData, setAccountsData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        const fetchAccountsData = async () => {
            try {
                const response = await axios.post('http://localhost:9292/api/v1/auth/accounts/get-active-cards', {
                    //   headers: {
                    // token: `Bearer ${storedToken}` // Include token in the request headers
                    //   }
                    token: storedToken
                });
                setAccountsData(response.data);
            } catch (error) {
                console.error('Error fetching accounts data:', error);
            }
        };

        fetchAccountsData();
    }, []);

    return (
        <div>
            <h2>Accounts Page</h2>
            {
                accountsData.map((item, index) => {
                    return (
                        <div style={{
                            position: 'relative',
                            width: '350px',
                        }}>
                            <img src={Card} style={{ width: '100%', height: '100%' }} />
                            <p style={{ position: 'absolute', top: '90px', left: '90px', zIndex: '6', color: 'white', fontSize: '17px' }}   >{convertAccountNumber(item.accountNumber)}</p>
                            <p style={{ position: 'absolute', top: '120px', left: '170px', zIndex: '6', color: 'white', fontSize: '17px', fontFamily: 'Open Sans, sans-serif' }}>{item.lastName + " " + item.firstName}</p>
                            <p style={{ position: 'absolute', top: '135px', left: '80px', zIndex: '6', color: 'white', fontSize: '14px' }}   >CVC {item.cvc}</p>
                            <p style={{ position: 'absolute', top: '165px', left: '150px', zIndex: '6', color: 'white', fontSize: '14px' }}   >{convertDateFormat(item.expirationDate)}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AccountsPage;
