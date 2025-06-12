import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import styles from '@/ui/styles/cashierPage.module.css';
import CashierDetails from '@/ui/components/cashier/cashierDetails';

const CashierPage = () => {
  const [filters, setFilters] = useState({
    status: 'Todos os status',
    data: '2025-06-10',
    responsavel: ''
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [caixaSelecionado, setCaixaSelecionado] = useState(null);

  const caixasData = [
    {
      id: 1,
      dataAbertura: '2025-06-10',
      horaAbertura: '08:00',
      responsavel: 'João Silva',
      status: 'ABERTO',
      entradas: 'R$ 2.450,00',
      saidas: 'R$ 150,00',
      saldo: 'R$ 2.300,00',
      statusColor: 'success'
    },
    {
      id: 2,
      dataAbertura: '2025-06-09',
      horaAbertura: '09:30',
      responsavel: 'Maria Santos',
      status: 'ABERTO',
      entradas: 'R$ 950,00',
      saidas: 'R$ 0,00',
      saldo: 'R$ 950,00',
      statusColor: 'success'
    },
    {
      id: 3,
      dataAbertura: '2025-06-09',
      horaAbertura: '08:00 - 18:00',
      responsavel: 'Carlos Oliveira',
      status: 'FECHADO',
      entradas: 'R$ 3.200,00',
      saidas: 'R$ 300,00',
      saldoFinal: 'R$ 2.900,00',
      fechadoEm: '2025-06-09 18:00',
      statusColor: 'danger'
    }
  ];

  const StatusBadge = ({ status, color }) => (
    <span className={`${styles.statusBadge} ${styles[color]}`}>
      {status}
    </span>
  );

  const abrirModal = (caixa) => {
    setCaixaSelecionado(caixa);
    setModalAberto(true);
  };

  const CaixaCard = ({ caixa }) => (
    <div className={`${styles.circleBox} ${styles.fineTransparentBorder} ${styles.mb4} ${
      caixa.status === 'ABERTO' ? styles.borderLeftSuccess : styles.borderLeftDanger
    }`}
    onClick={() => abrirModal(caixa)}
    >
      
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsStart} ${styles.mb3}`}>
        <div>
          <div className={styles.textSecondary}>Data de Abertura</div>
          <div className={styles.textPrimary}>{caixa.dataAbertura}</div>
        </div>
        <div>
          <div className={styles.textSecondary}>Hora de Abertura</div>
          <div className={styles.textPrimary}>{caixa.horaAbertura}</div>
        </div>
        <StatusBadge status={caixa.status} color={caixa.statusColor} />
      </div>

      <div className={styles.mb3}>
        <div className={styles.textSecondary}>Responsável</div>
        <div className={styles.textPrimary}>{caixa.responsavel}</div>
      </div>

      <div className={`${styles.grid} ${styles.gridCols3} ${styles.gap4} ${styles.mb3}`}>
        <div className={styles.textCenter}>
          <div className={styles.textSecondary}>Entradas</div>
          <div className={styles.textPrimary}>{caixa.entradas}</div>
        </div>
        <div className={styles.textCenter}>
          <div className={styles.textSecondary}>Saídas</div>
          <div className={styles.textDanger}>{caixa.saidas}</div>
        </div>
        <div className={styles.textCenter}>
          <div className={styles.textSecondary}>{caixa.status === 'ABERTO' ? 'Saldo' : 'Saldo Final'}</div>
          <div className={styles.textAccent}>
            {caixa.status === 'ABERTO' ? caixa.saldo : caixa.saldoFinal}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb6}`}>
        <div>
          <h1 className={styles.pageTitle}>☐ Gerenciamento de Caixas</h1>
          <p className={styles.pageSubtitle}>Visualize e gerencie todos os caixas da loja</p>
        </div>
        <div className={styles.statusBox}>
          <div className={styles.statusIcon}>☐</div>
          <div className={styles.statusLabel}>Caixas Ativos</div>
          <div className={styles.statusValue}>2</div>
        </div>
      </div>

      <div className={`${styles.filterContainer} ${styles.quartenary}`}>
        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select
              className={styles.inputForm}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option>Todos os status</option>
              <option>ABERTO</option>
              <option>FECHADO</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Data</label>
            <input
              type="date"
              className={styles.inputForm}
              value={filters.data}
              onChange={(e) => setFilters({ ...filters, data: e.target.value })}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Responsável</label>
            <input
              type="text"
              className={styles.inputForm}
              placeholder="Nome do responsável"
              value={filters.responsavel}
              onChange={(e) => setFilters({ ...filters, responsavel: e.target.value })}
            />
          </div>
          <div className={styles.filterActions}>
            <button className={styles.btnPrimary}>
              <Search size={16} />
              Filtrar
            </button>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.btnPrimary}>
            <Plus size={16} />
            Abrir Novo Caixa
          </button>
          <button className={styles.btnSecondary}>
            <Filter size={16} />
            Limpar Filtros
          </button>
        </div>
      </div>

      <div className={styles.caixasGrid}>
        {caixasData.map((caixa) => (
          <CaixaCard key={caixa.id} caixa={caixa} />
        ))}
      </div>
      {modalAberto && (
        <CashierDetails 
          caixa={caixaSelecionado} 
          fecharModal={() => setModalAberto(false)} 
        />
      )}
    </div>
  );
};

export default CashierPage;