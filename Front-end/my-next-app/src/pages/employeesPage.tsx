import { useEffect, useState } from "react";
import axios from "axios";

import EmployeeCard from "@/ui/components/products/ProductCardComponent";
import { useRouter } from "next/router";
import "../../public/css/products.css";
import "../../public/css/general.css";

const ProductPage = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const LIMIT: number = 6;

  const pushAddEmployeePage = () => {
    router.push("AddProductPage");
  };

  const pushBackToMenu = () => {
    router.push("menuPage");
  };

  const fetchEmployees = async (page: number) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("userData");

    if (!jwtToken || !userData) {
      router.push("/initialPage");
      return;
    }

    try {
      const parsedData = JSON.parse(userData);
      const idLoja = parsedData.id_loja;

      const response = await axios.get(
        `http://localhost:9700/api/produtos/loja/${idLoja}/paginado?page=${page}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          timeout: 2000,
        }
      );

      setFuncionarios(response.data.data);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(1);
  }, [router]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchEmployees(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchEmployees(currentPage - 1);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
      <header className="header-panel">
        <button
          id="menu-page-return"
          className="btn primaria position-fixed top-0 end-0 m-2 shadow"
          onClick={pushBackToMenu}
        >
          Voltar
        </button>
        <img className="img logo" src="/vl-store-logo-white.svg" />
      </header>

      <div className="mx-auto product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light">
        <h3 className="text-center mb-4">Funcionários</h3>
        <div className="row w-100 justify-content-between">
          <div className="p-0 col-12 col-md-12">
            <input
              className="input-form primaria w-100"
              type="text"
              placeholder="Digite o nome do funcionário..."
            />
          </div>
          <button className="btn primaria col-12 col-md-3 mt-2">
            Pesquisar
          </button>
          <button className="btn primaria col-12 col-md-3 mt-2">Limpar</button>
          <button
            className="btn primaria col-12 col-md-3 mt-2"
            onClick={pushAddEmployeePage}
          >
            Adicionar funcionário
          </button>
        </div>

        <div className="row w-100 gap-3 mt-4 justify-content-center">
          {loading ? (
            <p>Carregando funcionários...</p>
          ) : (
            <>
              {funcionarios.length > 0 ? (
                funcionarios.map((funcionario, index) => (
                  <EmployeeCard key={index} product={funcionario} />
                ))
              ) : (
                <p>Nenhum funcionário encontrado</p>
              )}
            </>
          )}
        </div>

        <div className="row w-100 gap-3 justify-content-center mt-4">
          <button
            className="btn col-3 primaria btn-paginacao"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <button
            className="btn col-3 primaria btn-paginacao"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Próxima
          </button>
          <span className="text-center">{currentPage}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
