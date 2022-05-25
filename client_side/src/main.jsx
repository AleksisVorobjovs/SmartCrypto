import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {TransactionProvider} from './context/TransactionContext';
import {ConnectedWalletProvider} from './context/ConnectedWalletContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConnectedWalletProvider>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </ConnectedWalletProvider>
)
