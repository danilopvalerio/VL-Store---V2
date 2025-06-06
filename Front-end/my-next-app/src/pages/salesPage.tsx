import { useState, useEffect } from 'react';
import Head from 'next/head';
import router from 'next/router';
import axios from 'axios';
import SalesForm from '../ui/components/sales/salesFormComponent';
import SalesList from '../ui/components/sales/salesListComponent';
import "../../public/css/general.css";

interface ProductVariation {
  id_variacao: string;
  produto: {
    nome: string;
    referencia: string;
  };
  descricao_variacao: string;
  preco_venda: number;
}

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

export default function SalesPage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [registeredSales, setRegisteredSales] = useState<any[]>([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<ProductVariation[]>([]);
  const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState<Seller[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authToken = (typeof window !== 'undefined' && localStorage.getItem('authToken')) || undefined;

  useEffect(() => {
    if (!authToken) {
      setError("Autenticação necessária. Faça o login para acessar esta página.");
      setLoading(false);
      return;
    }

    const api = axios.create({
      baseURL: '/api',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [vendedoresRes, produtosRes] = await Promise.all([
          api.get('/funcionarios'),
          api.get('/produtos/variacoes')
        ]);

        if (vendedoresRes.data?.success) {
          setVendedoresDisponiveis(vendedoresRes.data.data);
        }

        if (produtosRes.data?.success) {
          setProdutosDisponiveis(produtosRes.data.data);
        }

      } catch (err) {
        console.error("Erro ao buscar dados iniciais:", err);
        setError("Não foi possível carregar os dados do servidor. Tente recarregar a página.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const showCustomMessage = (msg, type = 'info') => {
    alert(`[${type.toUpperCase()}] ${msg}`); 
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
      <Head>
        <title>Registro de Vendas - VL Store</title>
      </Head>

      <header className="header-panel position-relative">
        <button
          id="menu-page-return"
          className="btn primaria position-absolute top-0 end-0 px-3 py-1 shadow"
          onClick={pushBackToMenu}
        >
          Voltar
        </button>
        <img className="img logo" src="/vl-store-logo-white.svg" alt="VL Store Logo" />
      </header>

      <div className="container-fluid px-6 pt-5">
        {loading && <p className="text-center text-white">Carregando dados...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        
        {!loading && !error && (
          <div className="row">
            <div className="col-lg-5 mb-4 mb-lg-0 d-flex flex-column">
              <SalesForm 
                onSaleRegistered={handleNewSaleRegistered} 
                showMessage={showCustomMessage}
                vendedoresDisponiveis={vendedoresDisponiveis}
                produtosDisponiveis={produtosDisponiveis}
                authToken={authToken}
              />
            </div>
            <div className="col-lg-7">
              <SalesList salesData={registeredSales} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}