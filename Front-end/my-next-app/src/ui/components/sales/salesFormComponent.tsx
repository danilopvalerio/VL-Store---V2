import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Interfaces de dados
interface ProductVariation {
  id_variacao: string;
  produto: { nome: string; referencia: string };
  descricao_variacao: string;
  preco_venda: number;
}

interface CartItem {
  id_variacao: string;
  nome: string;
  referencia: string;
  descricao_variacao: string;
  quantidade: number;
  precoUnitario: number;
}

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

interface SalePayload {
  id_funcionario: string;
  forma_pagamento: string;
  itens: { id_variacao: string; quantidade: number; preco_unitario: number }[];
  desconto: number;
  acrescimo: number;
}

// Interface de Props
interface SalesFormProps {
  vendedoresDisponiveis: Seller[];
  produtosDisponiveis: ProductVariation[];
  jwtToken?: string;
  onSaleRegistered: (sale: any) => void;
}

const SalesForm: React.FC<SalesFormProps> = ({
  onSaleRegistered,
  jwtToken,
  vendedoresDisponiveis,
  produtosDisponiveis,
}) => {
  // Hooks de estado
  const [codigoVenda, setCodigoVenda] = useState<string>("");
  const [vendedorResponsavelId, setVendedorResponsavelId] =
    useState<string>("");
  const [dataVenda, setDataVenda] = useState<string>("");
  const [formaPagamento, setFormaPagamento] = useState<string>("");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [precoUnitario, setPrecoUnitario] = useState<string>("");
  const [carrinhoVenda, setCarrinhoVenda] = useState<CartItem[]>([]);
  const [descontoVenda, setDescontoVenda] = useState<string>("0.00");
  const [acrescimoVenda, setAcrescimoVenda] = useState<string>("0.00");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados para pesquisa de produto
  const [produtoSearchTerm, setProdutoSearchTerm] = useState<string>("");
  const [showProductDropdown, setShowProductDropdown] =
    useState<boolean>(false);

  // Estados para pesquisa de vendedor
  const [vendedorSearchTerm, setVendedorSearchTerm] = useState<string>("");
  const [showVendedorDropdown, setShowVendedorDropdown] =
    useState<boolean>(false);

  const showMessage = (message: string, type: "success" | "error") => {
    if (type === "error") {
      setError(message);
      setSuccess("");
      setTimeout(() => setError(""), 5000);
    } else {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 5000);
    }
  };

  useEffect(() => {
    const generateSaleCode = () =>
      `VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
    setCodigoVenda(generateSaleCode());
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // mês é 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setDataVenda(localDateTime);
  }, []);

  useEffect(() => {
    if (produtoSelecionadoId) {
      const produto = produtosDisponiveis.find(
        (p) => p.id_variacao === produtoSelecionadoId
      );
      if (produto && typeof produto.preco_venda === "number") {
        setPrecoUnitario(produto.preco_venda.toFixed(2));
      }
    } else {
      setPrecoUnitario("");
    }
  }, [produtoSelecionadoId, produtosDisponiveis]);

  const valorTotalVenda = useMemo(() => {
    const subtotalProdutos = carrinhoVenda.reduce(
      (sum, item) => sum + item.quantidade * item.precoUnitario,
      0
    );
    const descontoNum = parseFloat(descontoVenda.replace(",", ".")) || 0;
    const acrescimoNum = parseFloat(acrescimoVenda.replace(",", ".")) || 0;
    return subtotalProdutos - descontoNum + acrescimoNum;
  }, [carrinhoVenda, descontoVenda, acrescimoVenda]);

  const filteredProducts = useMemo(() => {
    if (!produtoSearchTerm.trim()) return produtosDisponiveis;

    const term = produtoSearchTerm.toLowerCase();
    return produtosDisponiveis.filter(
      (p) =>
        p.produto.nome.toLowerCase().includes(term) ||
        p.descricao_variacao.toLowerCase().includes(term) ||
        p.produto.referencia.toLowerCase().includes(term)
    );
  }, [produtoSearchTerm, produtosDisponiveis]);

  const filteredVendedores = useMemo(() => {
    if (!vendedorSearchTerm.trim()) return vendedoresDisponiveis;

    const term = vendedorSearchTerm.toLowerCase();
    return vendedoresDisponiveis.filter(
      (v) =>
        v.nome.toLowerCase().includes(term) ||
        (v.cargo && v.cargo.toLowerCase().includes(term))
    );
  }, [vendedorSearchTerm, vendedoresDisponiveis]);

  const handleAdicionarProdutoVenda = () => {
    if (!produtoSelecionadoId) {
      showMessage("Selecione um produto para adicionar.", "error");
      return;
    }

    const produto = produtosDisponiveis.find(
      (p) => p.id_variacao === produtoSelecionadoId
    );

    if (!produto) return;

    const itemExistente = carrinhoVenda.find(
      (item) => item.id_variacao === produtoSelecionadoId
    );

    if (itemExistente) {
      setCarrinhoVenda(
        carrinhoVenda.map((item) =>
          item.id_variacao === produtoSelecionadoId
            ? { ...item, quantidade: item.quantidade + quantidadeProduto }
            : item
        )
      );
    } else {
      const novoItem: CartItem = {
        id_variacao: produto.id_variacao,
        nome: produto.produto.nome,
        referencia: produto.produto.referencia,
        descricao_variacao: produto.descricao_variacao,
        quantidade: quantidadeProduto,
        precoUnitario: produto.preco_venda,
      };
      setCarrinhoVenda([...carrinhoVenda, novoItem]);
    }

    setProdutoSelecionadoId("");
    setQuantidadeProduto(1);
    setPrecoUnitario("");
    setProdutoSearchTerm("");
    setShowProductDropdown(false);
  };

  const handleRemoverProdutoDoCarrinho = (idVariacao: string) => {
    setCarrinhoVenda(
      carrinhoVenda.filter((item) => item.id_variacao !== idVariacao)
    );
  };

  const handleNumericInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    const sanitizedValue = value.replace(/[^0-9,.]/g, "").replace(",", ".");
    if (sanitizedValue.split(".").length > 2) {
      return;
    }
    setter(sanitizedValue);
  };

  const resetForm = () => {
    const generateSaleCode = () =>
      `VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
    setCodigoVenda(generateSaleCode());
    setVendedorResponsavelId("");
    setVendedorSearchTerm("");
    setFormaPagamento("");
    setCarrinhoVenda([]);
    setDescontoVenda("0.00");
    setAcrescimoVenda("0.00");
    setProdutoSelecionadoId("");
    setQuantidadeProduto(1);
    setProdutoSearchTerm("");
  };

  const handleSubmitVenda = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !vendedorResponsavelId ||
      !formaPagamento ||
      carrinhoVenda.length === 0
    ) {
      showMessage("Preencha todos os campos obrigatórios.", "error");
      return;
    }

    const payload: SalePayload = {
      id_funcionario: vendedorResponsavelId,
      forma_pagamento: formaPagamento,
      itens: carrinhoVenda.map((item) => ({
        id_variacao: item.id_variacao,
        quantidade: item.quantidade,
        preco_unitario: item.precoUnitario,
      })),
      desconto: parseFloat(descontoVenda.replace(",", ".")) || 0,
      acrescimo: parseFloat(acrescimoVenda.replace(",", ".")) || 0,
    };

    try {
      const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
      const response = await axios.post(
        "http://localhost:9700/api/vendas",
        payload,
        config
      );
      if (response.data?.success) {
        showMessage("Venda registrada com sucesso!", "success");
        onSaleRegistered(response.data.data);
        resetForm();
      }
    } catch (error: any) {
      console.error("Erro ao registrar venda:", error);
      const backendMessage =
        error.response?.data?.message || "Ocorreu um erro desconhecido.";
      showMessage(`Erro: ${backendMessage}`, "error");
    }
  };

  return (
    <div className="quinary text-white p-4 rounded-5 white-light-small d-flex flex-column w-75 mx-auto h-100">
      {/* Alertas de erro e sucesso */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="mb-3">
        <h5 className="mb-0 text-white">
          <i className="fas fa-plus-circle mr-2"></i>Registrar Nova Venda
        </h5>
      </div>
      <div
        className="flex-grow-1"
        style={{ overflowY: "auto", overflowX: "hidden", paddingRight: "10px" }}
      >
        <form id="sales-form-content" onSubmit={handleSubmitVenda} noValidate>
          <div className="row mb-3">
            <div className="col-md-6 position-relative">
              <label
                htmlFor="vendedorResponsavel"
                className="form-label text-white-75 small"
              >
                Vendedor Responsável
              </label>
              <input
                type="text"
                className="form-control input-form"
                placeholder="Buscar vendedor..."
                value={vendedorSearchTerm}
                onChange={(e) => {
                  setVendedorSearchTerm(e.target.value);
                  setShowVendedorDropdown(true);
                }}
                onFocus={() => setShowVendedorDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowVendedorDropdown(false), 200)
                }
              />
              {showVendedorDropdown && (
                <ul
                  className="list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm"
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                  }}
                >
                  {filteredVendedores.length === 0 ? (
                    <li className="list-group-item text-white bg-dark">
                      Nenhum vendedor encontrado
                    </li>
                  ) : (
                    filteredVendedores.map((v) => (
                      <li
                        key={v.id_funcionario}
                        className="list-group-item bg-dark text-white cursor-pointer hover-light"
                        onClick={() => {
                          setVendedorResponsavelId(v.id_funcionario);
                          setVendedorSearchTerm(
                            `${v.nome}${v.cargo ? ` (${v.cargo})` : ""}`
                          );
                          setShowVendedorDropdown(false);
                        }}
                      >
                        {v.nome} {v.cargo && `(${v.cargo})`}
                      </li>
                    ))
                  )}
                </ul>
              )}
              <input
                type="hidden"
                id="vendedorResponsavelId"
                value={vendedorResponsavelId}
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="dataVenda"
                className="form-label text-white-75 small"
              >
                Data e Hora
              </label>
              <input
                type="datetime-local"
                className="form-control input-form"
                id="dataVenda"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <label
                htmlFor="formaPagamento"
                className="form-label text-white-75 small"
              >
                Forma de Pagamento
              </label>
              <select
                id="formaPagamento"
                className="form-control custom-select input-form"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
                required
              >
                <option value="" disabled className="text-gray-500">
                  Selecione...
                </option>
                <option value="DINHEIRO" className="text-black">
                  Dinheiro
                </option>
                <option value="CARTAO_CREDITO" className="text-black">
                  Cartão de Crédito
                </option>
                <option value="CARTAO_DEBITO" className="text-black">
                  Cartão de Débito
                </option>
                <option value="PIX" className="text-black">
                  PIX
                </option>
              </select>
            </div>
          </div>
          <h6 className="mb-3 text-white">
            <i className="fas fa-shopping-basket mr-2"></i>Produtos da Venda
          </h6>
          <div className="row g-2 align-items-baseline">
            <div className="col-md-5">
              <div className="d-flex flex-column">
              <label
                htmlFor="produtoVenda"
                className="form-label text-white-75 small mb-1" style={{ height: "20px" }}
              >
                Produto
              </label>
              <div className="d-flex align-items-center" style={{ height: "38px" }}>
              <input
                type="text"
                className="form-control input-form border-end-0"
                placeholder="Buscar produto..."
                style={{ height: "100%" }}
                value={produtoSearchTerm}
                onChange={(e) => {
                  setProdutoSearchTerm(e.target.value);
                  setShowProductDropdown(true);
                }}
                onFocus={() => setShowProductDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowProductDropdown(false), 200)
                }
              />
              {showProductDropdown && (
                <ul
                  className="list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm"
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                  }}
                >
                  {filteredProducts.length === 0 ? (
                    <li className="list-group-item text-white bg-dark">
                      Nenhum produto encontrado
                    </li>
                  ) : (
                    filteredProducts.map((p) => (
                      <li
                        key={p.id_variacao}
                        className="list-group-item bg-dark text-white cursor-pointer hover-light"
                        onClick={() => {
                          setProdutoSelecionadoId(p.id_variacao);
                          setProdutoSearchTerm(
                            `${p.produto.nome} - ${p.descricao_variacao}`
                          );
                          setShowProductDropdown(false);
                        }}
                      >
                        {p.produto.nome} (REF: {p.produto.referencia}) -{" "}
                        {p.descricao_variacao}
                      </li>
                    ))
                  )}
                </ul>
              )}
              </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="d-flex flex-column">
              <label
                htmlFor="quantidadeProduto"
                className="form-label text-white-75 small mb-1" style={{ height: "20px" }}
              >
                Quantidade
              </label>
              <input
                type="number"
                className="form-control input-form"
                id="quantidadeProduto"
                value={quantidadeProduto}
                style={{ height: "38px", padding: "0.375rem 0.5rem" }}
                onChange={(e) =>
                  setQuantidadeProduto(parseInt(e.target.value, 10) || 1)
                }
                min="1"
              />
              </div>
            </div>
            <div className="col-md-2">
              <div className="d-flex flex-column">
              <label
                htmlFor="precoUnitario"
                className="form-label text-white-75 small mb-1" style={{ height: "20px" }}
              >
                Preço Un.
              </label>
              <input
                type="text"
                className="form-control input-form"
                id="precoUnitario"
                value={precoUnitario ? `R$ ${precoUnitario}` : ""}
                style={{ height: "38px", padding: "0.375rem 0.5rem" }}
                readOnly
              />
              </div>
            </div>
            <div className="col-md-2 d-flex flex-column">
              <div style={{ height: "20px" }}></div>
              <button
                type="button"
                className="btn primaria d-flex align-items-center justify-content-center"
                style={{ 
                  height: "38px",
                  padding: "0.375rem 0.75rem",
                  lineHeight: "1.5"
                }}
                onClick={handleAdicionarProdutoVenda}
              >
                <i className="fas fa-plus"></i> Adicionar
              </button>
            </div>
          </div>

          <div
            id="listaProdutosVenda"
            className="mb-4 table-responsive quartenary p-2 rounded-lg"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <table className="table table-sm table-borderless text-white">
              <thead>
                <tr className="fine-transparent-border">
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Preço Un.</th>
                  <th>Subtotal</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {carrinhoVenda.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-3 text-white-75">
                      Nenhum produto adicionado.
                    </td>
                  </tr>
                ) : (
                  carrinhoVenda.map((item) => {
                    const subtotalItem = item.quantidade * item.precoUnitario;
                    return (
                      <tr
                        key={item.id_variacao}
                        className="fine-transparent-border"
                      >
                        <td>
                          {item.nome} <small>({item.descricao_variacao})</small>
                        </td>
                        <td>{item.quantidade}</td>
                        <td>R$ {item.precoUnitario.toFixed(2)}</td>
                        <td>R$ {subtotalItem.toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-delete"
                            onClick={() =>
                              handleRemoverProdutoDoCarrinho(item.id_variacao)
                            }
                            title="Remover"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label
                htmlFor="descontoVenda"
                className="form-label text-white-75 small"
              >
                Desconto (R$)
              </label>
              <input
                type="text"
                className="form-control input-form"
                id="descontoVenda"
                placeholder="0.00"
                value={descontoVenda}
                onChange={(e) =>
                  handleNumericInputChange(setDescontoVenda, e.target.value)
                }
              />
            </div>
            <div className="col-md-6">
              <label
                htmlFor="acrescimoVenda"
                className="form-label text-white-75 small"
              >
                Acréscimo (R$)
              </label>
              <input
                type="text"
                className="form-control input-form"
                id="acrescimoVenda"
                placeholder="0.00"
                value={acrescimoVenda}
                onChange={(e) =>
                  handleNumericInputChange(setAcrescimoVenda, e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </div>
      <div
        className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div>
          <h4 className="text-white mb-0">
            Total:{" "}
            <span className="font-weight-bold" style={{ color: "#86efac" }}>
              R$ {valorTotalVenda.toFixed(2)}
            </span>
          </h4>
        </div>
        <button
          type="submit"
          form="sales-form-content"
          className="btn primaria px-4 py-2"
        >
          <i className="fas fa-check-circle mr-2"></i>Finalizar Venda
        </button>
      </div>
    </div>
  );
};

export default SalesForm;
