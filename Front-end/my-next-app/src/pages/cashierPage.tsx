  import React, { useState, useMemo, useEffect, useCallback } from 'react';
  import CashierList from '../ui/components/cashier/cashierListComponent';
  import CashierDetails from '../ui/components/cashier/cashierDetailsComponent';
  import styles from '../ui/styles/cashierPage.module.css';
  import { useRouter } from 'next/router';
  import axios from 'axios';

interface Caixa {
  id_caixa: string;
  id_loja: string;
  status: 'ABERTO' | 'FECHADO';
  funcionario_responsavel: {
      nome: string;
  };
  entradas: number;
  saidas: number;
  saldo: number;
  data_abertura?: string;
  hora_abertura?: string;
}

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

  const CashierPage = () => {
    const [caixas, setCaixas] = useState<Caixa[]>([]);
    const [selectedCashier, setSelectedCashier] = useState<Caixa | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroResponsavel, setFiltroResponsavel] = useState('');
    const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState<Seller[]>(
      []
    );
    const [idloja, setIdloja] = useState("");

    const router = useRouter();
    
      const LIMIT: number = 6;

  const handleUpdateCaixa = useCallback((updatedCashier: Caixa) => {
    setCaixas(prevCaixas =>
      prevCaixas.map(c => (c.id_caixa === updatedCashier.id_caixa ? updatedCashier : c))
    );
    if (selectedCashier && selectedCashier.id_caixa === updatedCashier.id_caixa) {
      setSelectedCashier(updatedCashier);
    }
  }, [selectedCashier]);

  const handleCloseCaixa = useCallback((caixaFechado: Caixa) => {
    handleUpdateCaixa(caixaFechado);
    setSelectedCashier(null);
  }, [handleUpdateCaixa]);

  const caixasFiltrados = useMemo(() => {
  return caixas.filter(caixa => {
    const nomeResponsavel = caixa?.funcionario_responsavel?.nome?.toLowerCase() || '';
    
    const statusMatch = !filtroStatus || caixa.status === filtroStatus;
    
    const responsavelMatch = !filtroResponsavel || 
      nomeResponsavel.includes(filtroResponsavel.toLowerCase());
    
    return statusMatch && responsavelMatch;
  });
}, [caixas, filtroStatus, filtroResponsavel]);


  const fetchCashiers = useCallback(async (page: number, status = '', responsavel = '') => {
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
      params.append('limit', String(LIMIT));

      const response = await axios.get(
        `http://localhost:9700/api/caixas/loja/${id_loja}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          timeout: 10000,
        }
      );

      const uniqueCaixas: Caixa[] = response.data.data.reduce((acc: Caixa[], current: any) => {

        const formattedCaixa: Caixa = {
            id_caixa: current.id_caixa,
            id_loja: current.id_loja,
            status: current.status,
            funcionario_responsavel: current.funcionario_responsavel || { nome: 'Não informado' },
            data_abertura: current.data_abertura,
            hora_abertura: current.hora_abertura,
            entradas: 0,
            saidas: 0,
            saldo: 0,
        };

        const x = acc.find(item => item.id_caixa === formattedCaixa.id_caixa);
        if (!x) {
          return acc.concat([formattedCaixa]);
        } else {
          return acc;
        }
      }, []);

      const caixasComTotaisPromises = uniqueCaixas.map(async (caixaOriginal: Caixa) => {
        try {
          const totaisResponse = await axios.get(
            `http://localhost:9700/api/caixas/${caixaOriginal.id_caixa}/movimentacoes/all`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              timeout: 10000,
            }
          );

          if (totaisResponse.data.success) {
            const { totalEntradas, totalSaidas, saldo } = totaisResponse.data.data;
            return {
              ...caixaOriginal,
              entradas: totalEntradas,
              saidas: totalSaidas,
              saldo: saldo,
            };
          }
        } catch (error) {
          console.error(`Erro ao carregar totais para o caixa ${caixaOriginal.id_caixa}:`, error);
          return {
              ...caixaOriginal,
              entradas: 0,
              saidas: 0,
              saldo: 0,
          };
        }
        return {
            ...caixaOriginal,
            entradas: 0,
            saidas: 0,
            saldo: 0,
        };
      });

      const caixasAtualizados = await Promise.all(caixasComTotaisPromises);

      const parsedData = JSON.parse(userData);
        const idLoja = parsedData.id_loja;
        setIdloja(idLoja);

      const vendedoresRes = await axios.get(`http://localhost:9700/api/funcionarios/loja/${idLoja}`,
        {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        timeout: 10000,
        }
      );   

      if (vendedoresRes.data?.success) {
        setVendedoresDisponiveis(vendedoresRes.data.data);
      }

      setCaixas(caixasAtualizados);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);

    } catch (error) {
      console.error("Erro ao carregar caixas:", error);
    } finally {
      setLoading(false);
    }
  }, [router, LIMIT]);

  const handleApplyFilters = useCallback((status: string, responsavel: string) => {
    setFiltroStatus(status);
    setFiltroResponsavel(responsavel);
    fetchCashiers(1, status, responsavel);
  }, []);


  const handleBackToList = useCallback(() => {
      setSelectedCashier(null);
      fetchCashiers(currentPage, filtroStatus, filtroResponsavel);
  }, [fetchCashiers, currentPage, filtroStatus, filtroResponsavel]);

    const handleSaveNewCashier = useCallback(async (newlyCreatedCashier: any) => {

    await fetchCashiers(currentPage, filtroStatus, filtroResponsavel);
  }, [fetchCashiers, currentPage, filtroStatus, filtroResponsavel]);

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
            onBack={handleBackToList}
            onUpdateCaixa={handleUpdateCaixa}
            onCloseCaixa={handleCloseCaixa}
          />
        ) : (
          <CashierList
            caixas={caixasFiltrados}
            onSelectCaixa={(caixa) => setSelectedCashier(caixa)}
            vendedoresDisponiveis={vendedoresDisponiveis}
            id_loja={idloja}
            onFilter={handleApplyFilters}
            onSaveNewCashier={handleSaveNewCashier}
          />
        )}
      </div>
    </>
  );
};

  export default CashierPage;