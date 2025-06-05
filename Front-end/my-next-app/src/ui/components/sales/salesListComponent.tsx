import React, { useState, useEffect, useMemo } from 'react';
import SalesDetail from '../sales/salesDetailComponent';

interface ProductItem {
  id: string;
  nome: string;
  referencia: string;
  quantidade: number;
  precoUnitario: number;
}

interface Sale {
  codigoVenda: string;
  data: string;
  vendedor: string;
  vendedorId?: string;
  valorTotal: number;
  pagamento: string;
  produtos: ProductItem[];
  desconto: number;
  acrescimo: number;
}

interface SalesListProps {
  salesData: Sale[];
}

const ITEMS_PER_PAGE = 3;

const SalesList: React.FC<SalesListProps> = ({ salesData }) => {
  const initialSales: Sale[] = useMemo(() => [
    { codigoVenda: "VENDA-00122", data: "2025-06-03T10:30", vendedor: "João Silva", vendedorId: "1", valorTotal: 129.89, pagamento: "Cartão de Crédito", produtos: [{id: "101", nome: "Camiseta Básica P", referencia: "CB001", quantidade: 1, precoUnitario: 49.99}, {id: "102", nome: "Calça Jeans Slim M", referencia: "CJ002", quantidade: 1, precoUnitario: 79.90}], desconto: 0, acrescimo: 0 },
    { codigoVenda: "VENDA-00121", data: "2025-06-02T15:45", vendedor: "Maria Oliveira", vendedorId: "2", valorTotal: 79.90, pagamento: "PIX", produtos: [{id: "102", nome: "Calça Jeans Slim M", referencia: "CJ002", quantidade: 1, precoUnitario: 79.90}], desconto: 0, acrescimo: 0 },
    { codigoVenda: "VENDA-00120", data: "2025-06-01T09:12", vendedor: "João Silva", vendedorId: "1", valorTotal: 49.99, pagamento: "Dinheiro", produtos: [{id: "101", nome: "Camiseta Básica P", referencia: "CB001", quantidade: 1, precoUnitario: 49.99}], desconto: 0, acrescimo: 0 },
    { codigoVenda: "VENDA-00119", data: "2025-05-30T14:00", vendedor: "João Silva", vendedorId: "1", valorTotal: 120.50, pagamento: "Cartão de Débito", produtos: [{id: "103", nome: "Tênis Esportivo 40", referencia: "TE003", quantidade: 1, precoUnitario: 120.50}], desconto: 0, acrescimo: 0 },
    { codigoVenda: "VENDA-00118", data: "2025-05-29T11:20", vendedor: "Maria Oliveira", vendedorId: "2", valorTotal: 170.49, pagamento: "PIX", produtos: [{id: "101", nome: "Camiseta Básica P", referencia: "CB001", quantidade: 1, precoUnitario: 49.99}, {id: "103", nome: "Tênis Esportivo 40", referencia: "TE003", quantidade: 1, precoUnitario: 120.50}], desconto: 0, acrescimo: 0 },
  ], []);

  const [allSales, setAllSales] = useState<Sale[]>([...initialSales]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterDate, setFilterDate] = useState<string>('');
  const [filterVendedor, setFilterVendedor] = useState<string>('');
  const [filterPagamento, setFilterPagamento] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setAllSales(prevSales => {
      const newSalesToAdd = salesData.filter(newSale => !prevSales.some(s => s.codigoVenda === newSale.codigoVenda));
      return [...newSalesToAdd, ...prevSales].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    });
  }, [salesData]);


  const filteredSales = useMemo(() => {
    return allSales.filter(sale => {
      const saleDate = sale.data.substring(0, 10);
      const matchDate = filterDate ? saleDate === filterDate : true;
      const matchVendedor = filterVendedor ? sale.vendedorId === filterVendedor || sale.vendedor === filterVendedor : true;
      const matchPagamento = filterPagamento ? sale.pagamento === filterPagamento : true;
      return matchDate && matchVendedor && matchPagamento;
    });
  }, [allSales, filterDate, filterVendedor, filterPagamento]);

  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);

  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSales.slice(startIndex, endIndex);
  }, [filteredSales, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterDate, filterVendedor, filterPagamento]);


  const openModalWithSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleApplyFilters = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCurrentPage(1); 
  };

  const uniqueVendedores = useMemo(() => {
    const vendedores = new Map<string, string>();
    allSales.forEach(sale => {
      if (sale.vendedorId && !vendedores.has(sale.vendedorId)) {
        vendedores.set(sale.vendedorId, sale.vendedor);
      } else if (!sale.vendedorId && !Array.from(vendedores.values()).includes(sale.vendedor)) {
        vendedores.set(sale.vendedor, sale.vendedor);
      }
    });
    return Array.from(vendedores.entries()).map(([id, nome]) => ({ id, nome }));
  }, [allSales]);

  const uniquePagamentos = useMemo(() => {
    const pagamentos = new Set<string>();
    allSales.forEach(sale => pagamentos.add(sale.pagamento));
    return Array.from(pagamentos);
  }, [allSales]);

  return (
    <div className="quinary p-4 rounded-20px small-shadow">
      <div className="mb-4">
        <h5 className="mb-0 text-white"><i className="fas fa-list-ul mr-2"></i>Vendas Registradas</h5>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="date"
            className="form-control input-form"
            id="filtroData"
            placeholder="mm/dd/yyyy"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            id="filtroVendedor"
            className="form-control custom-select input-form"
            value={filterVendedor}
            onChange={(e) => setFilterVendedor(e.target.value)}
          >
            <option value="" className="text-gray-500">Vendedor...</option>
            {uniqueVendedores.map(v => (
              <option key={v.id} value={v.id} className="text-black">{v.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            id="filtroPagamento"
            className="form-control custom-select input-form"
            value={filterPagamento}
            onChange={(e) => setFilterPagamento(e.target.value)}
          >
            <option value="" className="text-gray-500">Pagamento...</option>
             {uniquePagamentos.map(p => (
              <option key={p} value={p} className="text-black">{p}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button 
            type="submit" 
            className="btn primaria btn-block" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          >
            <i className="fas fa-filter mr-1"></i>Filtrar
          </button>
        </div>
      </div>

      {/* Tabela de Vendas */}
      <div className="table-responsive quartenary p-3 rounded-lg mb-4">
        <table className="table table-sm table-borderless text-white">
          <thead>
            <tr className="fine-transparent-border">
              <th className="small font-weight-bold">Cód. Venda</th>
              <th className="small font-weight-bold">Data</th>
              <th className="small font-weight-bold">Vendedor</th>
              <th className="small font-weight-bold">Valor Total</th>
              <th className="small font-weight-bold">Pagamento</th>
              <th className="small font-weight-bold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.length > 0 ? (
              paginatedSales.map((sale) => (
                <tr key={sale.codigoVenda} className="fine-transparent-border">
                  <td className="font-weight-medium">{sale.codigoVenda}</td>
                  <td>{new Date(sale.data).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{sale.vendedor}</td>
                  <td className="font-weight-medium">R$ {sale.valorTotal.toFixed(2)}</td>
                  <td>{sale.pagamento}</td>
                  <td className="text-center">
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-sm" 
                        style={{
                          backgroundColor: '#17a2b8',
                          color: 'white',
                          border: 'none',
                          padding: '0.375rem 0.5rem',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          marginRight: '4px'
                        }}
                        title="Visualizar" 
                        onClick={() => openModalWithSale(sale)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn btn-sm" 
                        style={{
                          backgroundColor: '#ffc107',
                          color: 'white',
                          border: 'none',
                          padding: '0.375rem 0.5rem',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          marginRight: '4px'
                        }}
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm" 
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '0.375rem 0.5rem',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px'
                        }}
                        title="Excluir"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-white-75">Nenhuma venda encontrada com os filtros aplicados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav aria-label="Navegação de páginas">
          <div className="d-flex justify-content-center align-items-center">
            <button 
              className={`btn primaria px-4 py-2 ${currentPage === 1 ? 'btn-secondary' : 'btn-outline-light'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ minWidth: '80px' }}
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn primaria px-4 py-2 ${currentPage === page ? 'primaria' : 'btn-outline-light'}`}
                onClick={() => handlePageChange(page)}
                style={{ 
                  minWidth: '40px',
                  fontWeight: currentPage === page ? 'bold' : 'normal'
                }}
              >
                {page}
              </button>
            ))}
            
            <button 
              className={`btn primaria px-4 py-2 ${currentPage === totalPages ? 'btn-secondary' : 'btn-outline-light'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ minWidth: '80px' }}
            >
              Próxima
            </button>
          </div>
        </nav>
      )}

      {selectedSale && (
        <SalesDetail
          show={isModalOpen}
          onClose={closeModal}
          sale={selectedSale}
        />
      )}
    </div>
  );
};

export default SalesList;