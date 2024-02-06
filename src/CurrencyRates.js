import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyRates.css';

const CurrencyRates = () => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get('http://localhost:9292/api/currencies/get-currency');
        setCurrencyData(response.data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <div className="currency-container">
      <h2>Currency Rates</h2>
      <table className="currency-table">
        <thead>
          <tr>
            <th>Currency Type</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map(currency => (
            <tr>
              <td>{currency.currencyType}</td>
              <td>{currency.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyRates;
