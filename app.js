// App.js
import React from 'react';
import QRScanner from './QRScanner';
import QRCodeGenerator from './QRCodeGenerator';
import './App.css';
const App = () => {
  return (
    <div className='App'>
      <h1>QR Code Scanner</h1>
      {/* <QRScanner /> */}
          <QRCodeGenerator/>
    </div>
  );
};

export default App;
