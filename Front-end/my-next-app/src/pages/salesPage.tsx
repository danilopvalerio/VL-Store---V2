import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import SalesForm from "../ui/components/sales/salesFormComponent";
import SalesList from "../ui/components/sales/salesListComponent";
import "../../public/css/general.css";

interface ProductVariation {
  id_variacao: string;
  produto: {
    nome: string;
    referencia: string;
  };
  descricao_variacao: string;
  preco_venda: number;
}

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

export default function SalesPage() {
  const [registeredSales, setRegisteredSales] = useState<any[]>([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<
    ProductVariation[]
  >([]);
  const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState<Seller[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [idloja, setIdloja] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"form" | "list" | null>(null);

  const router = useRouter();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("userData");

    if (!jwtToken || !userData) {
      router.push("/initialPage");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const parsedData = JSON.parse(userData);
        const idLoja = parsedData.id_loja;
        setIdloja(idLoja);
        const config = {
          headers: { Authorization: `Bearer ${jwtToken}` },
        };

        const [vendedoresRes, produtosRes] = await Promise.all([
          axios.get(
            `http://localhost:9700/api/funcionarios/loja/${idLoja}`,
            config
          ),
          axios.get(
            `http://localhost:9700/api/produtos/loja/${idLoja}`,
            config
          ),
        ]);

        if (vendedoresRes.data?.success) {
          setVendedoresDisponiveis(vendedoresRes.data.data);
        }

        if (produtosRes.data?.success) {
          const produtosDaApi = produtosRes.data.data;
          const variacoesFormatadas = produtosDaApi.flatMap((produto: any) =>
            produto.variacoes.map((variacao: any) => ({
              ...variacao,
              preco_venda: parseFloat(variacao.valor),
              produto: {
                nome: produto.nome,
                referencia: produto.referencia,
              },
            }))
          );
          setProdutosDisponiveis(variacoesFormatadas);
        }
      } catch (err) {
        console.error("Erro ao buscar dados iniciais:", err);
        setError("Não foi possível carregar os dados do servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const showCustomMessage = (msg: any, type = "info") => {
    alert(`[${type.toUpperCase()}] ${msg}`);
  };

  const handleNewSaleRegistered = (newSale: any) => {
    setRegisteredSales((prevSales) => [newSale, ...prevSales]);
  };

  const pushBackToMenu = () => {
    router.push("menuPage");
  };

  const toggleView = (view: "form" | "list") => {
    setActiveView((current) => (current === view ? null : view));
  };

  const jwtToken =
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
      <Head>
        <title>Registro de Vendas - VL Store</title>
      </Head>

      <header className="header-panel position-relative">
        <button
          className="btn primaria position-absolute top-0 end-0 px-3 py-1 shadow"
          onClick={pushBackToMenu}
        >
          Voltar
        </button>
        <img
          className="img logo"
          src="/vl-store-logo-white.svg"
          alt="VL Store Logo"
        />
      </header>

      <div className="container-fluid px-6 pt-5">
        <div className="row mb-4">
          <div className="col d-flex gap-3 justify-content-center">
            <button
              className={`btn primaria px-4 py-2`}
              onClick={() => toggleView("form")}
            >
              {activeView === "form" ? "Fechar Formulário" : "Adicionar Venda"}
            </button>
            <button
              className={`btn primaria px-4 py-2`}
              onClick={() => toggleView("list")}
            >
              {activeView === "list" ? "Fechar Lista" : "Listar Vendas"}
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-center text-white">Carregando dados...</p>
        )}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <div className="row">
            {/* Formulário de Vendas */}
            {activeView === "form" && (
              <div>
                <SalesForm
                  onSaleRegistered={handleNewSaleRegistered}
                  showMessage={showCustomMessage}
                  vendedoresDisponiveis={vendedoresDisponiveis}
                  produtosDisponiveis={produtosDisponiveis}
                  jwtToken={jwtToken || undefined}
                />
              </div>
            )}

            {/* Lista de Vendas */}
            {activeView === "list" && (
              <div>
                <SalesList idLoja={idloja} />
              </div>
            )}

            {/* Nenhuma visualização selecionada */}
            {!activeView && (
              <div className="col-12 text-center py-5 text-center text-white">
                <p className="">Selecione uma opção acima para começar</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
