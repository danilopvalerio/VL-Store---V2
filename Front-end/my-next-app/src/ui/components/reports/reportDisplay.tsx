import React, { useState, useEffect } from 'react';
import { Download, ArrowLeft, Calendar, FileText } from 'lucide-react';
import "../../styles/ReportDisplay.module.css"

const ReportDisplay = ({ reportType = 'produtos-mais-vendidos' }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reportConfigs = {
    'produtos-mais-vendidos': {
      title: 'Produtos Mais Vendidos',
      icon: <FileText size={24} />,
      description: 'Ranking dos produtos com maior volume de vendas'
    },
    'relatorio-vendas-por-periodo': {
      title: 'Relatório de Vendas por Período',
      icon: <Calendar size={24} />,
      description: 'Análise detalhada das vendas em período específico'
    },
    'relatorio-financeiro': {
      title: 'Relatório Financeiro',
      icon: <FileText size={24} />,
      description: 'Resumo financeiro e indicadores econômicos'
    },
    'top-10-produtos-vendas-em-dinheiro': {
      title: 'Top 10 Produtos - Vendas em Dinheiro',
      icon: <FileText size={24} />,
      description: 'Produtos mais vendidos com pagamento em dinheiro'
    },
    'estoque-baixo': {
      title: 'Estoque Baixo',
      icon: <FileText size={24} />,
      description: 'Produtos com estoque abaixo do limite mínimo'
    },
    'mais-vendidos': {
      title: 'Mais Vendidos',
      icon: <FileText size={24} />,
      description: 'Produtos com maior saída no período'
    }
  };

  // Dados de exemplo para demonstração
  const generateMockData = (type) => {
    const baseData = {
      generatedAt: new Date().toLocaleString('pt-BR'),
      period: 'Junho 2025'
    };

    switch (type) {
      case 'produtos-mais-vendidos':
        return {
          ...baseData,
          items: [
            { rank: 1, produto: 'Camiseta Infantil Rosa', vendas: 145, valor: 'R$ 2.175,00' },
            { rank: 2, produto: 'Shorts Jeans Azul', vendas: 132, valor: 'R$ 1.980,00' },
            { rank: 3, produto: 'Vestido Floral', vendas: 118, valor: 'R$ 2.360,00' },
            { rank: 4, produto: 'Tênis Esportivo', vendas: 95, valor: 'R$ 4.275,00' },
            { rank: 5, produto: 'Jaqueta de Moletom', vendas: 87, valor: 'R$ 2.610,00' }
          ]
        };
      
      case 'relatorio-financeiro':
        return {
          ...baseData,
          summary: {
            totalVendas: 'R$ 45.230,50',
            totalCusto: 'R$ 28.145,30',
            lucroLiquido: 'R$ 17.085,20',
            margemLucro: '37.8%'
          },
          breakdown: [
            { categoria: 'Roupas Femininas', vendas: 'R$ 22.150,00', participacao: '49%' },
            { categoria: 'Roupas Masculinas', vendas: 'R$ 15.680,50', participacao: '35%' },
            { categoria: 'Acessórios', vendas: 'R$ 7.400,00', participacao: '16%' }
          ]
        };

      default:
        return {
          ...baseData,
          items: [
            { id: 1, description: 'Item de demonstração 1', value: 'R$ 150,00' },
            { id: 2, description: 'Item de demonstração 2', value: 'R$ 250,00' },
            { id: 3, description: 'Item de demonstração 3', value: 'R$ 180,00' }
          ]
        };
    }
  };

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    setTimeout(() => {
      try {
        const data = generateMockData(reportType);
        setReportData(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar relatório');
        setLoading(false);
      }
    }, 1000);
  }, [reportType]);

  const handleDownloadPDF = () => {
    // Aqui você implementaria a lógica real de download do PDF
    alert('Funcionalidade de download em desenvolvimento');
  };

  const handleBack = () => {
    alert('Voltar para página de relatórios');
  };

  const currentReport = reportConfigs[reportType];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando relatório...</p>
        </div>
      </div>
    );
  }

  if (error || !currentReport) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Erro</h2>
          <p>{error || 'Relatório não encontrado'}</p>
          <button className="btn-primary" onClick={handleBack}>
            Voltar aos Relatórios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <header className="report-header">
        <div className="header-content">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <div className="logo-container">
            <img src="/logo.png" alt="VL Store" className="logo" />
          </div>
          <div className="header-spacer"></div>
        </div>
      </header>

      {/* Report Content */}
      <main className="report-main">
        <div className="report-card">
          {/* Report Title */}
          <div className="report-title-section">
            <div className="report-icon">
              {currentReport.icon}
            </div>
            <div className="report-title-info">
              <h1 className="report-title">{currentReport.title}</h1>
              <p className="report-description">{currentReport.description}</p>
              <div className="report-meta">
                <span>Gerado em: {reportData.generatedAt}</span>
                <span>Período: {reportData.period}</span>
              </div>
            </div>
          </div>

          {/* Report Actions */}
          <div className="report-actions">
            <button className="btn-primary btn-download" onClick={handleDownloadPDF}>
              <Download size={18} />
              Download PDF
            </button>
          </div>

          {/* Report Data */}
          <div className="report-content">
            {reportType === 'relatorio-financeiro' && reportData.summary ? (
              <>
                <div className="financial-summary">
                  <h3>Resumo Financeiro</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Total de Vendas</span>
                      <span className="summary-value">{reportData.summary.totalVendas}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Total de Custos</span>
                      <span className="summary-value">{reportData.summary.totalCusto}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Lucro Líquido</span>
                      <span className="summary-value profit">{reportData.summary.lucroLiquido}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Margem de Lucro</span>
                      <span className="summary-value">{reportData.summary.margemLucro}</span>
                    </div>
                  </div>
                </div>

                <div className="breakdown-section">
                  <h3>Vendas por Categoria</h3>
                  <div className="table-container">
                    <table className="report-table">
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Vendas</th>
                          <th>Participação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.breakdown.map((item, index) => (
                          <tr key={index}>
                            <td>{item.categoria}</td>
                            <td>{item.vendas}</td>
                            <td>{item.participacao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : reportData.items ? (
              <div className="table-container">
                <table className="report-table">
                  <thead>
                    <tr>
                      {reportType === 'produtos-mais-vendidos' ? (
                        <>
                          <th>Posição</th>
                          <th>Produto</th>
                          <th>Vendas</th>
                          <th>Valor Total</th>
                        </>
                      ) : (
                        <>
                          <th>ID</th>
                          <th>Descrição</th>
                          <th>Valor</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.items.map((item, index) => (
                      <tr key={index}>
                        {reportType === 'produtos-mais-vendidos' ? (
                          <>
                            <td className="rank-cell">#{item.rank}</td>
                            <td>{item.produto}</td>
                            <td>{item.vendas}</td>
                            <td>{item.valor}</td>
                          </>
                        ) : (
                          <>
                            <td>{item.id}</td>
                            <td>{item.description}</td>
                            <td>{item.value}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-data">
                <p>Nenhum dado disponível para este relatório.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="report-footer">
        <p>© 2025 VL Store. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ReportDisplay;