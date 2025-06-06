import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesDetail from "../sales/salesDetailComponent";

interface ProductItem {
  id: string;
  nome: string;
  referencia: string;
  quantidade: number;
  precoUnitario: number;
}

interface Sale {
  id_venda: string;
  data_hora: string;
  funcionario: {
    nome: string;
    id_funcionario: string;
  };
  total: string;
  forma_pagamento: string;
  itens: Array<{
    quantidade: number;
    preco_unitario: string;
    variacao: {
      descricao_variacao: string;
      referencia_produto: string;
    };
  }>;
  desconto: string;
  acrescimo: string;
}

interface SalesListProps {
  salesData?: Sale[]; // Tornando salesData opcional
  idLoja: string;
}

const ITEMS_PER_PAGE = 5;

const SalesList: React.FC<SalesListProps> = ({ salesData = [], idLoja }) => {
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:9700/api/vendas/loja/${idLoja}/paginado?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );

        if (response.data?.success) {
          setAllSales(response.data.data || []);
          setTotalPages(response.data.totalPages || 1);
          console.log(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar vendas:", err);
        setError("Não foi possível carregar as vendas do servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [idLoja, currentPage, jwtToken]);

  useEffect(() => {
    // Add any new sales from props to the list
    if (salesData && salesData.length > 0) {
      setAllSales((prevSales) => {
        const newSalesToAdd = salesData.filter(
          (newSale) => !prevSales.some((s) => s.id_venda === newSale.id_venda)
        );
        return [...newSalesToAdd, ...prevSales];
      });
    }
  }, [salesData]);

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

  return (
    <div className="quinary p-4 rounded-20px small-shadow">
      <div className="mb-4">
        <h5 className="mb-0 text-white">
          <i className="fas fa-list-ul mr-2"></i>Vendas Registradas
        </h5>
      </div>

      {loading && (
        <div className="text-center text-white py-4">Carregando vendas...</div>
      )}
      {error && <div className="text-center text-danger py-4">{error}</div>}

      {!loading && !error && (
        <>
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
                {allSales && allSales.length > 0 ? (
                  allSales.map((sale) => (
                    <tr key={sale.id_venda} className="fine-transparent-border">
                      <td className="font-weight-medium">{sale.id_venda}</td>
                      <td>
                        {new Date(sale.data_hora).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{sale.funcionario.nome}</td>
                      <td className="font-weight-medium">
                        R$ {parseFloat(sale.total).toFixed(2)}
                      </td>
                      <td>{sale.forma_pagamento}</td>
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#17a2b8",
                              color: "white",
                              border: "none",
                              padding: "0.375rem 0.5rem",
                              borderRadius: "50%",
                              width: "32px",
                              height: "32px",
                              marginRight: "4px",
                            }}
                            title="Visualizar"
                            onClick={() => openModalWithSale(sale)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#ffc107",
                              color: "white",
                              border: "none",
                              padding: "0.375rem 0.5rem",
                              borderRadius: "50%",
                              width: "32px",
                              height: "32px",
                              marginRight: "4px",
                            }}
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              padding: "0.375rem 0.5rem",
                              borderRadius: "50%",
                              width: "32px",
                              height: "32px",
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
                    <td colSpan={6} className="text-center py-4 text-white-75">
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav aria-label="Navegação de páginas">
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className={`btn primaria px-4 py-2 ${
                    currentPage === 1 ? "btn-secondary" : "btn-outline-light"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ minWidth: "80px" }}
                >
                  Anterior
                </button>

                <span className="mx-3 text-white">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  className={`btn primaria px-4 py-2 ${
                    currentPage === totalPages
                      ? "btn-secondary"
                      : "btn-outline-light"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ minWidth: "80px" }}
                >
                  Próxima
                </button>
              </div>
            </nav>
          )}
        </>
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
