import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import styles from '../../styles/cashierPage.module.css';
import NewCashier from './openNewCashierComponent';

const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || typeof value !== 'number') {
    return 'R$ 0,00';
  }
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

const InfoItem = ({ label, value, className }) => (
  <div>
    <div className={styles.textSecondary}>{label}</div>
    <div className={`${className || styles.textPrimary}`}>{value}</div>
  </div>
);

const CaixaCard = ({ caixa, onSelect }) => {
  const isAberto = caixa.status === 'ABERTO';
  return (
    <div
      className={`${styles.box} ${styles.boxHover} ${isAberto ? styles.borderLeftSuccess : styles.borderLeftDanger} ${styles.cursorPointer}`}
      onClick={onSelect}
    >
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb4}`}>
        <div>
          <div className={styles.textPrimary}>{caixa.responsavel}</div>
          <div className={styles.textSecondary}>Aberto em: {caixa.dataAbertura} às {caixa.horaAbertura}</div>
        </div>
        <span className={`${styles.statusBadge} ${isAberto ? styles.success : styles.danger}`}>{caixa.status}</span>
      </div>
      <div className={`${styles.grid} ${styles.gap4} ${styles.textCenter}`} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <InfoItem label="Entradas" value={formatCurrency(caixa.entradas)} className={styles.textSuccess} />
        <InfoItem label="Saídas" value={formatCurrency(caixa.saidas)} className={styles.textDanger} />
        <InfoItem label={isAberto ? 'Saldo Atual' : 'Saldo Final'} value={formatCurrency(caixa.entradas - caixa.saidas)} className={styles.textAccent} />
      </div>
    </div>
  );
};

const CashierList = ({ caixas, onSelectCaixa }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb6}`}>
        <div>
          <h1 className={styles.pageTitle}>Gerenciamento de Caixas</h1>
          <p className={styles.pageSubtitle}>Visualize e gerencie todos os caixas da loja</p>
        </div>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowModal(true)}>
          <Plus size={16} /> Abrir Novo Caixa
        </button>
      </div>

      <div className={`${styles.box} ${styles.mb6}`}>
        <div className={`${styles.grid} ${styles.gap4} ${styles.itemsCenter}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <select className={styles.inputForm}>
              <option>Todos</option>
              <option>Aberto</option>
              <option>Fechado</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Responsável</label>
            <input type="text" placeholder="Buscar por nome..." className={styles.inputForm} />
          </div>
          <div className={`${styles.flex} ${styles.gap2}`} style={{ paddingTop: '1.5rem' }}>
            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.wFull}`}><Search size={16} />Filtrar</button>
            <button className={`${styles.btn} ${styles.btnSecondary} ${styles.wFull}`}><X size={16} />Limpar</button>
          </div>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.gap4}`} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {caixas.map((caixa) => (
          <CaixaCard key={caixa.id} caixa={caixa} onSelect={() => onSelectCaixa(caixa)} />
        ))}
      </div>

     {showModal && (
  <NewCashier
    onCancel={() => setShowModal(false)}
    onSave={(data) => {
      console.log(data);
      setShowModal(false);
    }}
  />
)}

    </>
  );
};

export default CashierList;
