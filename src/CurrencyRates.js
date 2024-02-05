import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyRates.css'; // Import the CSS file

const CurrencyRates = () => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get('http://localhost:9292/api/currencies/get-currency');
        setCurrencyData(response.data); // Assuming the response contains an array of currency data
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div className="currency-container"> {/* Apply container styles */}
      <h2>Currency Rates</h2>
      <table className="currency-table"> {/* Apply table styles */}
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
