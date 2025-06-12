import React, { useState } from 'react';
import { ArrowLeft, Lock, Plus } from 'lucide-react';
import styles from '../../styles/cashierPage.module.css';

export const formatCurrency = (value: number | null | undefined): string => {
  const numericValue = typeof value === 'number' ? value : 0;

  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const CardInfo = ({ titulo, valor, className }) => (
    <div className={styles.box}>
        <div className={styles.textSecondary}>{titulo}</div>
        <div className={`${className} ${styles.textPrimary}`} style={{fontSize: '2rem'}}>{valor}</div>
    </div>
);

const CashierDetails = ({ caixa, onBack, onUpdateCaixa }) => {
  if (!caixa) {
    return <div>Carregando detalhes do caixa...</div>; 
  }
  const [movimentacao, setMovimentacao] = useState({ tipo: 'ENTRADA', valor: '', descricao: '' });

  const handleAddMovimentacao = () => {
    const valorFloat = parseFloat(movimentacao.valor.replace(',', '.'));
    if (!valorFloat || !movimentacao.descricao) {
        alert("Por favor, preencha o valor e a descrição.");
        return;
    }
    const novaMovimentacao = {
        id: Date.now(), dataHora: new Date().toLocaleString('pt-BR'),
        tipo: movimentacao.tipo, descricao: movimentacao.descricao,
        valor: valorFloat, responsavel: caixa.responsavel
    };
    const caixaAtualizado = { ...caixa, movimentacoes: [novaMovimentacao, ...caixa.movimentacoes] };
    if (movimentacao.tipo === 'ENTRADA') caixaAtualizado.entradas += valorFloat;
    else caixaAtualizado.saidas += valorFloat;
    
    onUpdateCaixa(caixaAtualizado);
    setMovimentacao({ tipo: 'ENTRADA', valor: '', descricao: '' });
  };
  
  const saldo = caixa.entradas - caixa.saidas;

  return (
    <>
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.mb6}`}>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onBack}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className={styles.pageTitle}>Detalhes do Caixa</h2>
        {caixa.status === 'ABERTO' && (
          <button className={`${styles.btn} ${styles.btnDanger}`}>
            <Lock size={16} /> Fechar Caixa
          </button>
        )}
      </div>

      <div className={`${styles.grid} ${styles.gap4} ${styles.mb6}`} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
        <CardInfo titulo="Total de Entradas" valor={formatCurrency(caixa.entradas)} className={styles.textSuccess} />
        <CardInfo titulo="Total de Saídas" valor={formatCurrency(caixa.saidas)} className={styles.textDanger} />
        <CardInfo titulo="Saldo Atual" valor={formatCurrency(saldo)} className={styles.textAccent} />
      </div>

      {caixa.status === 'ABERTO' && (
        <div className={`${styles.box} ${styles.mb6}`}>
          <h3 className={`${styles.pageTitle} ${styles.mb4}`} style={{fontSize: '1.25rem'}}>Adicionar Movimentação</h3>
          <div className={`${styles.grid} ${styles.gap4} ${styles.itemsCenter}`} style={{gridTemplateColumns: '1fr 1fr 2fr 0.5fr'}}>
            <select className={styles.inputForm} value={movimentacao.tipo} onChange={(e) => setMovimentacao({...movimentacao, tipo: e.target.value})}>
              <option value="ENTRADA">Entrada</option> <option value="SAIDA">Saída</option>
            </select>
            <input type="text" placeholder="Valor (R$)" className={styles.inputForm} value={movimentacao.valor} onChange={(e) => setMovimentacao({...movimentacao, valor: e.target.value})} />
            <input type="text" placeholder="Descrição da movimentação" className={styles.inputForm} value={movimentacao.descricao} onChange={(e) => setMovimentacao({...movimentacao, descricao: e.target.value})} />
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAddMovimentacao}><Plus size={16}/></button>
          </div>
        </div>
      )}

      <div className={styles.box}>
        <h3 className={`${styles.pageTitle} ${styles.mb4}`} style={{fontSize: '1.25rem'}}>Últimas Movimentações</h3>
        <table className={styles.dataTable}>
          <thead><tr><th>Data/Hora</th><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Responsável</th></tr></thead>
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