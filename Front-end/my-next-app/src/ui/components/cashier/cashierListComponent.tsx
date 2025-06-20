import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import styles from "../../styles/cashierPage.module.css";
import NewCashier from "./openNewCashierComponent";

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

interface Caixa {
  id_caixa: string;
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

interface CashierListProps {
  caixas: Caixa[];
  onSelectCaixa: (caixa: Caixa) => void;
  vendedoresDisponiveis: Seller[];
  id_loja: string;
  onFilter: (status: string, responsavel: string) => void;
  isLoading?: boolean;
  onSaveNewCashier: (data: any) => Promise<void>;
}

const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || typeof value !== "number") {
    return "R$ 0,00";
  }
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
};

const InfoItem = ({ label, value, className }) => (
  <div>
    <div className={styles.textSecondary}>{label}</div>
    <div className={`${className || styles.textPrimary}`}>{value}</div>
  </div>
);

const CaixaCard = ({ caixa, onSelect }) => {
  const isAberto = caixa?.status === "ABERTO";
  const responsavel = caixa?.funcionario_responsavel.nome || "Não informado";
  const dataAbertura = caixa?.data_abertura || "Data não disponível";
  const horaAbertura = caixa?.hora_abertura || "Hora não disponível";

  return (
    <div
      className={`${styles.box} ${styles.boxHover} ${
        isAberto ? styles.borderLeftSuccess : styles.borderLeftDanger
      } ${styles.cursorPointer}`}
      onClick={onSelect}
    >
      <div
        className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb4}`}
      >
        <div>
          <div className={styles.textPrimary}>{responsavel}</div>
          <div className={styles.textSecondary}>
            Aberto em: {dataAbertura} às {horaAbertura}
          </div>
        </div>
        {caixa?.status && (
          <span
            className={`${styles.statusBadge} ${
              isAberto ? styles.success : styles.danger
            }`}
          >
            {caixa.status}
          </span>
        )}
      </div>
      <div
        className={`${styles.grid} ${styles.gap4} ${styles.textCenter}`}
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <InfoItem
          label="Entradas"
          value={formatCurrency(caixa?.entradas)}
          className={styles.textSuccess}
        />
        <InfoItem
          label="Saídas"
          value={formatCurrency(caixa?.saidas)}
          className={styles.textDanger}
        />
        <InfoItem
          label={isAberto ? "Saldo Atual" : "Saldo Final"}
          value={formatCurrency((caixa?.entradas || 0) - (caixa?.saidas || 0))}
          className={styles.textAccent}
        />
      </div>
    </div>
  );
};

const CashierList: React.FC<CashierListProps> = ({ caixas, onSelectCaixa, onFilter, vendedoresDisponiveis, id_loja, onSaveNewCashier }) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleFilter = () => {
    onFilter(status, responsavel);
  };

  const handleClear = () => {
    setStatus("");
    setResponsavel("");
    onFilter("", "");
  };

    const handleNewCashierSave = async (data: any) => {
    await onSaveNewCashier(data);
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb6}`}
      >
        <div>
          <h1 className={styles.pageTitle}>Gerenciamento de Caixas</h1>
          <p className={styles.pageSubtitle}>
            Visualize e gerencie todos os caixas da loja
          </p>
        </div>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} /> Abrir Novo Caixa
        </button>
      </div>

      <div className={`${styles.box} ${styles.mb6}`}>
        <div
          className={`${styles.grid} ${styles.gap4} ${styles.itemsCenter}`}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <select
              className={styles.inputForm}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option
                className="list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm"
                value=""
              >
                Todos
              </option>
              <option
                className="list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm"
                value="ABERTO"
              >
                Aberto
              </option>
              <option
                className="list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm"
                value="FECHADO"
              >
                Fechado
              </option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Responsável</label>
            <input
              type="text"
              placeholder="Buscar por nome..."
              className={styles.inputForm}
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
          </div>

          <div
            className={`${styles.flex} ${styles.gap2}`}
            style={{ paddingTop: "1.5rem" }}
          >
            <button
              onClick={handleFilter}
              className={`${styles.btn} ${styles.btnPrimary} ${styles.wFull}`}
            >
              <Search size={16} />
              Filtrar
            </button>
            <button
              onClick={handleClear}
              className={`${styles.btn} ${styles.btnSecondary} ${styles.wFull}`}
            >
              <X size={16} />
              Limpar
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.grid} ${styles.gap4}`}
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
      >
        {caixas.map((caixa) => (
          <CaixaCard
            key={`${caixa.id_caixa}-${caixa.data_abertura}`}
            caixa={caixa}
            onSelect={() => onSelectCaixa(caixa)}
          />
        ))}
      </div>

      {showModal && (
        <NewCashier
          onCancel={() => setShowModal(false)}
          vendedoresDisponiveis={vendedoresDisponiveis}
          id_loja={id_loja}
          onSave={handleNewCashierSave}
          
        />
      )}
    </>
  );
};

export default CashierList;
