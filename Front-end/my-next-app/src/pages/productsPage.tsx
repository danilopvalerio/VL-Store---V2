import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "@/ui/components/products/ProductCardComponent";
import { useRouter } from "next/router";
import "../../public/css/products.css";
import "../../public/css/general.css";

const ProductPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const pushAddProductPage = () => {
    router.push("AddProductPage");
  };

  useEffect(() => {
    const checkAuth = async () => {
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
          `http://localhost:9700/api/produtos/loja/${idLoja}/paginado?page=1&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            timeout: 2000,
          }
        );

        setProdutos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao parsear userData ou carregar produtos:", error);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
      <header className="header-panel">
        <button
          id="menu-page-return"
          className="btn primaria position-fixed top-0 end-0 m-2 shadow"
          onClick={() => {
            router.push("/menuPage");
          }}
        >
          Voltar
        </button>
        <img className="img logo" src="/vl-store-logo-white.svg" />
      </header>

      <div className="mx-auto product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light">
        <h3 className="text-center mb-4">Produtos</h3>
        <div className="row w-100 justify-content-between">
          <div className="p-0 col-12 col-md-12">
            <input
              className="input-form primaria w-100"
              type="text"
              placeholder="Digite o produto..."
            />
          </div>
          <button className="btn primaria col-12 col-md-3 mt-2">
            Pesquisar
          </button>
          <button className="btn primaria col-12 col-md-3 mt-2">Limpar</button>
          <button
            className="btn primaria col-12 col-md-3 mt-2"
            onClick={pushAddProductPage}
          >
            Adicionar produto
          </button>
        </div>

        <div className="row w-100 gap-3 mt-4 justify-content-center">
          {loading ? (
            <p>Carregando produtos...</p>
          ) : (
            produtos.map((produto, index) => (
              <ProductCard key={index} product={produto} />
            ))
          )}
        </div>

        <div className="row w-100 gap-3 justify-content-center mt-4">
          <button className="btn col-3 primaria btn-paginacao">Anterior</button>
          <button className="btn col-3 primaria btn-paginacao">Próxima</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
