import React, { useState } from 'react';
import { ArrowLeft, Lock, Plus } from 'lucide-react';
import styles from '../../styles/cashierPage.module.css';
import axios from 'axios';

// Interfaces de tipo
interface Movimentacao {
  id: string;
  tipo: 'ENTRADA' | 'SAIDA';
  valor: number;
  descricao: string;
  dataHora: string;
  responsavel: string;
  id_venda?: string;
}

interface Caixa {
  id: string;
  status: 'ABERTO' | 'FECHADO';
  entradas?: number;
  saidas?: number;
  movimentacoes?: Movimentacao[];
  responsavel?: string;
  data_abertura?: string;
  hora_abertura?: string;
  hora_fechamento?: string | null;
}

interface CardInfoProps {
  titulo: string;
  valor: string;
  className: string;
}

interface CashierDetailsProps {
  caixa: Caixa | null;
  onBack: () => void;
  onUpdateCaixa: (updatedCaixa: Caixa) => void;
  onCloseCaixa: (closedCaixa: Caixa) => void;
}

interface MovimentacaoState {
  tipo: 'ENTRADA' | 'SAIDA';
  valor: string;
  descricao: string;
  id_venda?: string;
}

// Função utilitária para formatar moeda
export const formatCurrency = (value: number | null | undefined): string => {
  const numericValue = typeof value === 'number' ? value : 0;
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Componente CardInfo
const CardInfo: React.FC<CardInfoProps> = ({ titulo, valor, className }) => (
  <div className={styles.box}>
    <div className={styles.textSecondary}>{titulo}</div>
    <div className={`${className} ${styles.textPrimary}`} style={{ fontSize: '2rem' }}>{valor}</div>
  </div>
);

// Componente principal
const CashierDetails: React.FC<CashierDetailsProps> = ({ 
  caixa, 
  onBack, 
  onUpdateCaixa, 
  onCloseCaixa 
}) => {
  // Estados do componente
  const [movimentacao, setMovimentacao] = useState<MovimentacaoState>({ 
    tipo: 'ENTRADA', 
    valor: '', 
    descricao: '',
    id_venda: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Função para obter headers de autenticação
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Função para adicionar movimentação
  const handleAddMovimentacao = async () => {
    if (!caixa?.id) {
      setError("Caixa não encontrado ou ID inválido");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const valorFloat = parseFloat(movimentacao.valor.replace(',', '.'));
    if (isNaN(valorFloat) || !movimentacao.descricao) {
      setError("Por favor, preencha o valor e a descrição corretamente.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await axios.post<Movimentacao>(
        `http://localhost:9700/api/caixas/${caixa.id}/movimentacoes`,
        {
          tipo: movimentacao.tipo,
          valor: valorFloat,
          descricao: movimentacao.descricao,
          id_venda: movimentacao.id_venda || null,
          responsavel: caixa.responsavel || "Sistema"
        },
        { headers: getAuthHeaders() }
      );

      const novaMovimentacao = response.data;

      const caixaAtualizado: Caixa = {
        ...caixa,
        movimentacoes: [novaMovimentacao, ...(caixa.movimentacoes || [])],
        entradas: movimentacao.tipo === 'ENTRADA' 
          ? (caixa.entradas || 0) + valorFloat 
          : (caixa.entradas || 0),
        saidas: movimentacao.tipo === 'SAIDA' 
          ? (caixa.saidas || 0) + valorFloat 
          : (caixa.saidas || 0),
      };

      onUpdateCaixa(caixaAtualizado);
      setMovimentacao({ 
        tipo: 'ENTRADA', 
        valor: '', 
        descricao: '',
        id_venda: ''
      });
      setSuccess("Movimentação adicionada com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
      
    } catch (err) {
      console.error("Erro ao adicionar movimentação:", err);
      setError(err.response?.data?.message || "Erro ao adicionar movimentação");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Função para fechar o caixa
  const handleCloseCaixa = async () => {
    if (!caixa?.id) {
      setError("Caixa não encontrado ou ID inválido");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (window.confirm('Tem certeza que deseja fechar o caixa?')) {
      try {
        const response = await axios.patch<Caixa>(
          `http://localhost:9700/api/caixas/${caixa.id}/fechar`,
          {
            hora_fechamento: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          },
          { headers: getAuthHeaders() }
        );
    
        const caixaFechado = response.data;
        onCloseCaixa(caixaFechado);
        
        setSuccess("Caixa fechado com sucesso!");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error("Erro ao fechar caixa:", err);
        setError(err.response?.data?.message || "Erro ao fechar caixa");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // Calcula o saldo atual
  const saldo = (caixa?.entradas || 0) - (caixa?.saidas || 0);

  if (!caixa) return <div>Carregando detalhes do caixa...</div>;

  return (
    <>
      {/* Cabeçalho */}
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb6}`}>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onBack}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className={styles.pageTitle}>Detalhes do Caixa</h2>
        {caixa.status === 'ABERTO' && (
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleCloseCaixa} disabled={!caixa?.id}>
            <Lock size={16} /> Fechar Caixa
          </button>
        )}
      </div>

      {/* Mensagens de feedback */}
      {error && (
        <div className={`${styles.alert} ${styles.alertDanger}`}>
          {error}
        </div>
      )}
      {success && (
        <div className={`${styles.alert} ${styles.alertSuccess}`}>
          {success}
        </div>
      )}

      {/* Cartões de informações */}
      <div className={`${styles.grid} ${styles.gap4} ${styles.mb6}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <CardInfo titulo="Total de Entradas" valor={formatCurrency(caixa.entradas)} className={styles.textSuccess} />
        <CardInfo titulo="Total de Saídas" valor={formatCurrency(caixa.saidas)} className={styles.textDanger} />
        <CardInfo titulo="Saldo Atual" valor={formatCurrency(saldo)} className={styles.textAccent} />
      </div>

      {/* Formulário de movimentação (apenas para caixa aberto) */}
      {caixa.status === 'ABERTO' && (
        <div className={`${styles.box} ${styles.mb6}`}>
          <h3 className={`${styles.pageTitle} ${styles.mb4}`} style={{ fontSize: '1.25rem' }}>Adicionar Movimentação</h3>
          <div className={`${styles.grid} ${styles.gap4} ${styles.itemsCenter}`} style={{ gridTemplateColumns: '1fr 1fr 2fr 1fr 0.5fr' }}>
            <select 
              className={styles.inputForm} 
              value={movimentacao.tipo} 
              onChange={(e) => setMovimentacao({ ...movimentacao, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })}
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
            <input 
              type="text" 
              placeholder="Valor (R$)" 
              className={styles.inputForm} 
              value={movimentacao.valor} 
              onChange={(e) => setMovimentacao({ ...movimentacao, valor: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Descrição" 
              className={styles.inputForm} 
              value={movimentacao.descricao} 
              onChange={(e) => setMovimentacao({ ...movimentacao, descricao: e.target.value })} 
            />
            <input
              type="text"
              placeholder="ID Venda (opcional)"
              className={styles.inputForm}
              value={movimentacao.id_venda || ''}
              onChange={(e) => setMovimentacao({ ...movimentacao, id_venda: e.target.value })}
            />
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAddMovimentacao}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tabela de movimentações */}
      <div className={styles.box}>
        <h3 className={`${styles.pageTitle} ${styles.mb4}`} style={{ fontSize: '1.25rem' }}>Últimas Movimentações</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {(caixa.movimentacoes ?? []).map((mov) => (
              <tr key={mov.id}>
                <td>{mov.dataHora}</td>
                <td>
                  <span className={`${styles.statusBadge} ${mov.tipo === 'ENTRADA' ? styles.success : styles.danger}`}>
                    {mov.tipo}
                  </span>
                </td>
                <td>{mov.descricao}</td>
                <td className={mov.tipo === 'ENTRADA' ? styles.textSuccess : styles.textDanger}>
                  {formatCurrency(mov.valor)}
                </td>
                <td>{mov.responsavel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CashierDetails;