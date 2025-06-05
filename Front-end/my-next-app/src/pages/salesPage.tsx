// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import SalesForm from '../ui/components/sales/salesFormComponent';
import SalesList from '../ui/components/sales/salesListComponent';
import "../../public/css/general.css";
import router from 'next/router';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [registeredSales, setRegisteredSales] = useState([]);


  const showCustomMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleNewSaleRegistered = (newSale: any) => {
    setRegisteredSales(prevSales => [newSale, ...prevSales]);
  };

  const pushBackToMenu = () => {
    router.push("menuPage");
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
       <header className="header-panel position-relative">
        <button
          id="menu-page-return"
          className="btn primaria position-absolute top-0 end-0 px-3 py-1 shadow"
          onClick={pushBackToMenu}
        >
          Voltar
        </button>
        <img className="img logo" src="/vl-store-logo-white.svg" />
      </header>

      <div className="container-fluid px-6 pt-5">
        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0 d-flex flex-column">
            <SalesForm onSaleRegistered={handleNewSaleRegistered} showMessage={showCustomMessage} />
          </div>
          <div className="col-lg-7">
            <SalesList salesData={registeredSales} />
          </div>
        </div>
      </div>
    </div>
  );
}