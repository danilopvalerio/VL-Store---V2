import React, { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import styles from '../../styles/cashierPage.module.css';

const CashierDetails = ({ caixa, fecharModal }) => {
  const [novaMovimentacao, setNovaMovimentacao] = useState({
    tipo: 'ENTRADA',
    valor: '',
    descricao: ''
  });

  const [movimentacoes, setMovimentacoes] = useState([
    { id: 1, dataHora: '04/06/2025 08:30', tipo: 'ENTRADA', descricao: 'Venda #001 - Tênis Nike Air', valor: 'R$ 350,00', responsavel: 'João Silva' },
    { id: 2, dataHora: '04/06/2025 09:15', tipo: 'ENTRADA', descricao: 'Venda #002 - Camiseta Adidas', valor: 'R$ 120,00', responsavel: 'Maria Santos' },
    { id: 3, dataHora: '04/06/2025 10:00', tipo: 'SAIDA', descricao: 'Pagamento de fornecedor', valor: 'R$ 150,00', responsavel: 'Administrador' },
    { id: 4, dataHora: '04/06/2025 11:30', tipo: 'ENTRADA', descricao: 'Venda #003 - Calça Jeans', valor: 'R$ 180,00', responsavel: 'Carlos Oliveira' },
    { id: 5, dataHora: '04/06/2025 14:20', tipo: 'ENTRADA', descricao: 'Venda #004 - Kit Esportivo', valor: 'R$ 1.800,00', responsavel: 'Ana Costa' },
  ]);

  const handleAdicionarMovimentacao = (e) => {
    e.preventDefault();
    if (!novaMovimentacao.valor || !novaMovimentacao.descricao) return;
    
    const novaMov = {
      id: movimentacoes.length + 1,
      dataHora: new Date().toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      tipo: novaMovimentacao.tipo,
      descricao: novaMovimentacao.descricao,
      valor: `R$ ${parseFloat(novaMovimentacao.valor).toFixed(2).replace('.', ',')}`,
      responsavel: 'Usuário Atual'
    };
    
    setMovimentacoes([...movimentacoes, novaMov]);
    setNovaMovimentacao({ tipo: 'ENTRADA', valor: '', descricao: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaMovimentacao({
      ...novaMovimentacao,
      [name]: value
    });
  };

  if (!caixa) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={fecharModal}>
          <X size={20} />
        </button>
        
        <h2 className={styles.modalTitle}>Detalhes do Caixa #{caixa.id}</h2>
        
        {/* Informações principais */}
        <div className={`${styles.infoSection} ${styles.fineTransparentBorderBottom}`}>
          <div className={styles.statusBadgeContainer}>
            <span className={`${styles.statusBadge} ${caixa.status === 'ABERTO' ? styles.success : styles.danger}`}>
              {caixa.status}
            </span>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Data de Abertura</div>
              <div className={styles.infoValue}>{caixa.dataAbertura}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Hora de Abertura</div>
              <div className={styles.infoValue}>{caixa.horaAbertura}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Responsável</div>
              <div className={styles.infoValue}>{caixa.responsavel}</div>
            </div>
          </div>
        </div>
        
        {/* Totais */}
        <div className={`${styles.totaisSection} ${styles.fineTransparentBorderBottom}`}>
          <div className={styles.totaisGrid}>
            <div className={styles.totalItem}>
              <div className={styles.totalLabel}>Total de Entradas</div>
              <div className={styles.totalValue}>{caixa.entradas}</div>
            </div>
            <div className={styles.totalItem}>
              <div className={styles.totalLabel}>Total de Saídas</div>
              <div className={`${styles.totalValue} ${styles.textDanger}`}>{caixa.saidas}</div>
            </div>
            <div className={styles.totalItem}>
              <div className={styles.totalLabel}>Saldo Atual</div>
              <div className={`${styles.totalValue} ${styles.textAccent}`}>
                {caixa.status === 'ABERTO' ? caixa.saldo : caixa.saldoFinal}
              </div>
            </div>
          </div>
        </div>
        
        {/* Formulário de movimentação (se caixa aberto) */}
        {caixa.status === 'ABERTO' && (
          <div className={`${styles.formSection} ${styles.fineTransparentBorderBottom}`}>
            <h3 className={styles.sectionTitle}>Adicionar Movimentação</h3>
            <form onSubmit={handleAdicionarMovimentacao} className={styles.formGrid}>
              <div>
                <select 
                  name="tipo"
                  className={styles.inputForm}
                  value={novaMovimentacao.tipo}
                  onChange={handleChange}
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>
              <div>
                <input 
                  type="number"
                  name="valor"
                  className={styles.inputForm} 
                  placeholder="Valor (R$)" 
                  value={novaMovimentacao.valor}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                />
              </div>
              <div>
                <input 
                  type="text"
                  name="descricao"
                  className={styles.inputForm} 
                  placeholder="Descrição da movimentação" 
                  value={novaMovimentacao.descricao}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button 
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={!novaMovimentacao.valor || !novaMovimentacao.descricao}
                >
                  <Plus size={16} />
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Tabela de movimentações */}
        <div className={styles.movimentacoesSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Movimentações</h3>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                className={styles.inputForm} 
                placeholder="Buscar movimentação..." 
              />
              <button className={styles.btnIcon}>
                <Search size={16} />
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.movimentacoesTable}>
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Responsável</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoes.map((mov) => (
                  <tr key={mov.id}>
                    <td>{mov.dataHora}</td>
                    <td>
                      <span className={mov.tipo === 'ENTRADA' ? styles.textSuccess : styles.textDanger}>
                        {mov.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'}
                      </span>
                    </td>
                    <td>{mov.descricao}</td>
                    <td>{mov.valor}</td>
                    <td>{mov.responsavel}</td>
                    <td>
                      <button className={styles.btnIcon}>
                        ☐
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginação */}
          <div className={styles.pagination}>
            <button className={styles.pageButton}>Anterior</button>
            <button className={`${styles.pageButton} ${styles.active}`}>1</button>
            <button className={styles.pageButton}>2</button>
            <button className={styles.pageButton}>3</button>
            <button className={styles.pageButton}>Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDetails;