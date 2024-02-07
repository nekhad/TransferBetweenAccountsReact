import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';
import Card from './assets/card-main-part.png'
import CardBack from './assets/card-back-part.png'

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
let i = 0;
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
                            <p style={{ position: 'absolute', top: '130px', left: '53px', zIndex: '6', color: 'black', fontSize: '25px' }}   >{convertAccountNumber(item.accountNumber)}</p>
                            <p style={{ position: 'absolute', top: '60px', left: '150px', zIndex: '6', color: 'black', fontSize: '23px', fontFamily: 'Open Sans, sans-serif' }}>{item.lastName + " " + item.firstName}</p>
                            <p style={{ position: 'absolute', top: '100px', left: '220px', zIndex: '6', color: 'black', fontSize: '15px' }}   >{convertDateFormat(item.expirationDate)}</p>

                            <img src={CardBack} style={{ width: '100%', height: '100%' }} />
                            <p style={{ position: 'absolute', top: '310px', left: '270px', zIndex: '6', color: 'gold', fontSize: '14px', fontFamily: 'Open Sans, sans-serif'}}   >{item.cvc}</p>
                            <p style={{ position: 'absolute', top: '465px', left: '130px', zIndex: '6', color: 'black', fontSize: '18px', fontFamily: 'Open Sans, sans-serif'}}>{++index} -ci Kart</p>
                            <p style={{ position: 'absolute', top: '485px', left: '30px', zIndex: '6', color: 'black', fontSize: '14px', fontFamily: 'Open Sans, sans-serif'}}>-------------------------------------------------------------</p>
                             
                        </div>
                        
                        
                    )
                })
            }
        </div>
    );
};

export default AccountsPage;
