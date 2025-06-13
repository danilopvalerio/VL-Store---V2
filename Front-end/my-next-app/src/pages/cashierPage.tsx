  import React, { useState, useMemo, useEffect, useCallback } from 'react';
  import CashierList from '../ui/components/cashier/cashierListComponent';
  import CashierDetails from '../ui/components/cashier/cashierDetailsComponent';
  import styles from '../ui/styles/cashierPage.module.css';
  import { useRouter } from 'next/router';
  import axios from 'axios';
import Funcionario from '../../../../Back-end/src/models/Funcionario';

interface Caixa {
  id: string;
  status: 'ABERTO' | 'FECHADO';
  funcionario_responsavel: Funcionario;
  entradas?: number;
  saidas?: number;
  movimentacoes?: any[];
}

  const CashierPage = () => {
    const [caixas, setCaixas] = useState<Caixa[]>([]);
    const [selectedCashier, setSelectedCashier] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroResponsavel, setFiltroResponsavel] = useState('');

    const router = useRouter();
    
      const LIMIT: number = 6;

    const handleUpdateCaixa = (updatedCashier) => {
      const newCashiersList = caixas.map(c => c.id === updatedCashier.id ? updatedCashier : c);
      setCaixas(newCashiersList);
      setSelectedCashier(updatedCashier);
    };

    const handleCloseCaixa = (caixaFechado: any) => {
      handleUpdateCaixa(caixaFechado); 
      setSelectedCashier(null);
    };

  const caixasFiltrados = useMemo(() => {
  return caixas.filter(caixa => {
    // Verifica se o objeto e subobjetos existem
    const nomeResponsavel = caixa?.funcionario_responsavel?.nome?.toLowerCase() || '';
    
    // Aplica filtro de status se fornecido
    const statusMatch = !filtroStatus || caixa.status === filtroStatus;
    
    // Aplica filtro de responsavel se fornecido
    const responsavelMatch = !filtroResponsavel || 
      nomeResponsavel.includes(filtroResponsavel.toLowerCase());
    
    return statusMatch && responsavelMatch;
  });
}, [caixas, filtroStatus, filtroResponsavel]);


    const handleSearch = async (page = 1) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userData = localStorage.getItem("userData");

  if (!jwtToken || !userData) {
    router.push("/initialPage");
    return;
  }

  const parsedData = JSON.parse(userData);
  const idLoja = parsedData.id_loja;

  try {
    const response = await axios.get(
      `http://localhost:9700/api/caixas/loja/${idLoja}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    setCaixas(response.data.data);
    setTotalItems(response.data.count);
    setTotalPages(response.data.totalPages);
    setCurrentPage(response.data.page);
  } catch (error) {
    console.error("Erro ao buscar caixas:", error);
  }
};

const fetchCashiers = async (page: number, status = '', responsavel = '') => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userData = localStorage.getItem("userData");

  if (!jwtToken || !userData) {
    router.push("/initialPage");
    return;
  }

  setLoading(true);

  try {
    const { id_loja } = JSON.parse(userData);

    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (responsavel) params.append('responsavel', responsavel);
    params.append('page', String(page));

    const response = await axios.get(
      `http://localhost:9700/api/caixas/loja/${id_loja}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        timeout: 2000,
      }
    );

    const caixasFormatados = response.data.data.map(caixa => ({
      ...caixa,
      funcionario_responsavel: {
        nome: caixa.funcionario_responsavel?.nome || 'Não informado',
      },
      entradas: caixa.entradas || 0,
      saidas: caixa.saidas || 0,
      status: caixa.status || 'FECHADO'
    }));

    setCaixas(caixasFormatados);
    setCurrentPage(response.data.page);
    setTotalPages(response.data.totalPages);
    setTotalItems(response.data.totalItems);
  } catch (error) {
    console.error("Erro ao carregar caixas:", error);
  } finally {
    setLoading(false);
  }
};

const handleApplyFilters = useCallback((status: string, responsavel: string) => {
    setFiltroStatus(status);
    setFiltroResponsavel(responsavel);
    fetchCashiers(1, status, responsavel);
  }, []);

  const pushBackToMenu = () => {
    router.push("menuPage");
  };

  useEffect(() => {
      fetchCashiers(1);
    }, [router]);
    
    return (
      <>
       <div className="d-flex justify-content-between align-items-center flex-column">
        <header className="header-panel position-relative">
        <button
          className="btn primaria position-absolute top-0 end-0 px-3 py-1 shadow"
          onClick={pushBackToMenu}
        >
          Voltar
        </button>
        <img
          className="img logo"
          src="/vl-store-logo-white.svg"
          alt="VL Store Logo"
        />
      </header>
      </div>
      <div className={styles.pageContainer}>
        {selectedCashier ? (
          <CashierDetails
            caixa={selectedCashier} 
            onBack={() => setSelectedCashier(null)}
            onUpdateCaixa={handleUpdateCaixa}
            onCloseCaixa={handleCloseCaixa}
          />
        ) : (
          <CashierList
            caixas={caixasFiltrados}
            onSelectCaixa={(caixa) => setSelectedCashier(caixa)}
            onFilter={handleApplyFilters}
/>
        )}
      </div>
    </>
  );
};

  export default CashierPage;