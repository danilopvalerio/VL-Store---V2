  import React, { useState, useMemo } from 'react';
  import CashierList from '../ui/components/cashier/cashierListComponent';
  import CashierDetails from '../ui/components/cashier/cashierDetailsComponent';
  import styles from '../ui/styles/cashierPage.module.css';

const caixasIniciais = [
  {
    id: 1,
    dataAbertura: '12/06/2025',
    horaAbertura: '08:00',
    responsavel: 'João Silva',
    status: 'ABERTO',
    entradas: 2450.00,
    saidas: 150.00,
    movimentacoes: [
      { id: 1, dataHora: '12/06/2025 08:30', tipo: 'ENTRADA', descricao: 'Venda #001 - Tênis Nike Air', valor: 350.00, responsavel: 'João Silva' },
      { id: 2, dataHora: '12/06/2025 09:15', tipo: 'ENTRADA', descricao: 'Venda #002 - Camiseta', valor: 80.00, responsavel: 'João Silva' },
      { id: 3, dataHora: '12/06/2025 10:00', tipo: 'SAIDA', descricao: 'Pagamento de fornecedor', valor: 150.00, responsavel: 'João Silva' },
    ]
  },
  {
    id: 2,
    dataAbertura: '11/06/2025',
    horaAbertura: '09:30',
    responsavel: 'Maria Santos',
    status: 'ABERTO',
    entradas: 950.00,
    saidas: 0.00,
    movimentacoes: [
       { id: 1, dataHora: '11/06/2025 09:45', tipo: 'ENTRADA', descricao: 'Venda #101 - Boné', valor: 50.00, responsavel: 'Maria Santos' },
    ]
  },
  {
    id: 3,
    dataAbertura: '11/06/2025',
    horaAbertura: '08:00',
    dataFechamento: '11/06/2025',
    horaFechamento: '18:00',
    responsavel: 'Carlos Oliveira',
    status: 'FECHADO',
    entradas: 3200.00,
    saidas: 300.00,
    movimentacoes: []
  }
];


  const CashierPage = () => {
    const [caixas, setCaixas] = useState(caixasIniciais);
    const [selectedCashier, setSelectedCashier] = useState(null);
    
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