import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Accounts');
  const navigate = useNavigate();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTransferTabClick = () => {
    navigate('/transferPage');
    setActiveTab('Transfer');
  };

  const handleCurrenciesTabClick = () => {
    navigate('/currencies');
    setActiveTab('Currency');
  };

  const handleCreateAccountClick = () => {
    navigate('/account');
  };

  return (
    <div>
      <div className="container">
        <h2>SALAM ALEKUM</h2>
        <p>XOŞ GƏLMİSİNİZ</p>
      </div>
      <button className="create-account-btn" onClick={handleCreateAccountClick}>
        Create Account
      </button>
      <div className="tabs">
        <button
          className={activeTab === 'Accounts' ? 'active' : ''}
          onClick={() => handleTabChange('Accounts')}
        >
          Accounts
        </button>
        <button
          className={activeTab === 'Transfer' ? 'active' : ''}
          onClick={handleTransferTabClick}
        >
          Transfer
        </button>
        <button
          className={activeTab === 'Currency' ? 'active' : ''}
          onClick={() => handleCurrenciesTabClick('Currency')}
        >
          Currency
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'Accounts' && (
          <div>
            <h3>Accounts Tab Content</h3>
            <p>Content for Accounts tab goes here...</p>
          </div>
        )}
        {activeTab === 'Transfer' && (
          <div>
            <h3>Transfer Tab Content</h3>
            <p>Content for Transfer tab goes here...</p>
          </div>
        )}
        {activeTab === 'Currency' && (
          <div>
            <h3>Currency Tab Content</h3>
            <p>Content for Currency tab goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
