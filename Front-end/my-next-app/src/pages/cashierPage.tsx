  import React, { useState, useMemo, useEffect } from 'react';
  import CashierList from '../ui/components/cashier/cashierListComponent';
  import CashierDetails from '../ui/components/cashier/cashierDetailsComponent';
  import styles from '../ui/styles/cashierPage.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

  const CashierPage = () => {
    const [caixas, setCaixas] = useState([]);
    const [selectedCashier, setSelectedCashier] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
      const LIMIT: number = 6;
    
    const [filtroResponsavel, setFiltroResponsavel] = useState('');

    const handleUpdateCaixa = (updatedCashier) => {
      const newCashiersList = caixas.map(c => c.id === updatedCashier.id ? updatedCashier : c);
      setCaixas(newCashiersList);
      setSelectedCashier(updatedCashier);
    };

    const caixasFiltrados = useMemo(() => {
      if (!filtroResponsavel) {
        return caixas;
      }
      return caixas.filter(caixa => 
        caixa.responsavel.toLowerCase().includes(filtroResponsavel.toLowerCase())
      );
    }, [caixas, filtroResponsavel]);


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

const fetchCashiers = async (page: number) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userData = localStorage.getItem("userData");

  if (!jwtToken || !userData) {
    router.push("/initialPage");
    return;
  }

  setLoading(true);

  try {
    const parsedData = JSON.parse(userData);
    const idLoja = parsedData.id_loja;

    const response = await axios.get(
      `http://localhost:9700/api/caixas/loja/${idLoja}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        timeout: 2000,
      }
    );

    setCaixas(response.data.data);
    setCurrentPage(response.data.page);
    setTotalPages(response.data.totalPages);
    setTotalItems(response.data.totalItems);
  } catch (error) {
    console.error("Erro ao carregar caixas:", error);
  } finally {
    setLoading(false); // Garante que o loading seja desativado mesmo em caso de erro
  }
};

  useEffect(() => {
      fetchCashiers(1);
    }, [router]);
  
    const handleClearSearch = () => {
      setSearchTerm("");
      fetchCashiers(1);
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        if (searchTerm.trim() !== "") {
          handleSearch(currentPage + 1);
        } else {
          fetchCashiers(currentPage + 1);
        }
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        if (searchTerm.trim() !== "") {
          handleSearch(currentPage - 1);
        } else {
          fetchCashiers(currentPage - 1);
        }
      }
    };
    
    return (
      <div className={styles.pageContainer}>
        {selectedCashier ? (
          <CashierDetails
            caixa={selectedCashier} 
            onBack={() => setSelectedCashier(null)}
            onUpdateCaixa={handleUpdateCaixa}
          />
        ) : (
          <CashierList
            caixas={caixasFiltrados}
            onSelectCaixa={(caixa) => setSelectedCashier(caixa)}
          />
        )}
      </div>
    );
  };

  export default CashierPage;