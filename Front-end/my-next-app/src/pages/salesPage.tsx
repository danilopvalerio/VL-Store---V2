import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const [registeredSales, setRegisteredSales] = useState<any[]>([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<ProductVariation[]>([]);
  const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState<Seller[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // MUDANÇA: Inicializando o router

  useEffect(() => {
    // MUDANÇA: Lendo as chaves corretas do localStorage, igual ao ProductPage
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("userData");

    // MUDANÇA: Verificação de segurança que redireciona se não houver login
    if (!jwtToken || !userData) {
      router.push("/initialPage"); // Redireciona para a página inicial/login
      return;
    }

    const api = axios.create({
      baseURL: 'http://localhost:9700/api',
      headers: { 
        'Authorization': `Bearer ${jwtToken}` 
      }
    });

    const fetchData = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("userData");

    if (!jwtToken || !userData) {
      router.push("/initialPage");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      const parsedData = JSON.parse(userData);
      const idLoja = parsedData.id_loja;
      
      // --- CORREÇÃO: Removido o 'axios.create'. Usaremos chamadas diretas. ---

      const config = {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      };

      const [vendedoresRes, produtosRes] = await Promise.all([
        // Chamada explícita com a URL completa, passando a config
        axios.get(`http://localhost:9700/api/funcionarios/loja/${idLoja}`, config),
        
        // Chamada explícita com a URL completa, passando a config
        axios.get(`http://localhost:9700/api/produtos/loja/${idLoja}`, config)
      ]);

      if (vendedoresRes.data?.success) {
        setVendedoresDisponiveis(vendedoresRes.data.data);
      }

      if (produtosRes.data?.success) {
        // ... a lógica de transformação dos dados continua a mesma ...
        const produtosDaApi = produtosRes.data.data;
        const variacoesFormatadas = produtosDaApi.flatMap(produto =>
          produto.variacoes.map(variacao => ({
            ...variacao,
            preco_venda: parseFloat(variacao.valor),
            produto: {
              nome: produto.nome,
              referencia: produto.referencia
            }
          }))
        );
        setProdutosDisponiveis(variacoesFormatadas);
      }

    } catch (err) {
      console.error("Erro ao buscar dados iniciais:", err);
      setError("Não foi possível carregar os dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

    fetchData();
  }, [router]); // MUDANÇA: A dependência do efeito agora é o router

  const showCustomMessage = (msg, type = 'info') => {
    alert(`[${type.toUpperCase()}] ${msg}`); 
  };

  const handleNewSaleRegistered = (newSale: any) => {
    setRegisteredSales(prevSales => [newSale, ...prevSales]);
  };

  const pushBackToMenu = () => {
    router.push("menuPage");
  };

  // MUDANÇA: Precisamos do token também no escopo do return para passar como prop
  const jwtToken = typeof window !== 'undefined' ? localStorage.getItem("jwtToken") : null;

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
                jwtToken={jwtToken || undefined}
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