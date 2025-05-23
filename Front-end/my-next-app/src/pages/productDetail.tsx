import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "../../public/css/products.css";
import "../../public/css/general.css";

interface Variation {
  id_variacao?: string;
  descricao_variacao: string;
  quant_variacao: number;
  valor: number;
}

const productDetail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    referencia: "",
    nome: "",
    categoria: "",
    material: "",
    genero: "",
    id_loja: "",
  });

  const [variations, setVariations] = useState<Variation[]>([
    { descricao_variacao: "", quant_variacao: 0, valor: 0 },
  ]);

  const [error, setError] = useState("");

  // Carrega os dados iniciais
  useEffect(() => {
    const produto = localStorage.getItem("selectedProduct");
    if (produto) {
      const produtoObj = JSON.parse(produto);
      const data = produtoObj.data;

      setProductData({
        referencia: data.referencia || "",
        nome: data.nome || "",
        categoria: data.categoria || "",
        material: data.material || "",
        genero: data.genero || "",
        id_loja: data.id_loja,
      });

      setVariations(
        data.variacoes?.length > 0
          ? data.variacoes.map((v: any) => ({
              id_variacao: v.id_variacao,
              descricao_variacao: v.descricao_variacao || "",
              quant_variacao: v.quant_variacao || 0,
              valor: v.valor || 0,
            }))
          : [{ descricao_variacao: "", quant_variacao: 0, valor: 0 }]
      );
    }
  }, []);

  // Verifica autenticação
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("userData");
    if (!jwtToken || !userData) router.push("/initialPage");
  }, []);

  const getAuthHeaders = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    return {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...productData, [name]: value };
    setProductData(newData);

    try {
      await axios.patch(
        `http://localhost:9700/api/produtos/loja/${newData.id_loja}/referencia/${newData.referencia}`,
        { [name]: value },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      setError("Erro ao atualizar produto");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleVariationChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newValue =
      name === "quant_variacao" || name === "valor" ? Number(value) : value;

    const updatedVariations = [...variations];
    updatedVariations[index] = {
      ...updatedVariations[index],
      [name]: newValue,
    };
    setVariations(updatedVariations);

    const variation = updatedVariations[index];

    try {
      if (variation.id_variacao) {
        // Atualizar variação existente
        await axios.patch(
          `http://localhost:9700/api/produtos/variacao/${variation.id_variacao}`,
          { [name]: newValue },
          { headers: getAuthHeaders() }
        );
      } else {
        // Criar nova variação
        const response = await axios.post(
          `http://localhost:9700/api/produtos/variacao/loja/${productData.id_loja}/referencia/${productData.referencia}`,
          variation,
          { headers: getAuthHeaders() }
        );

        // Atualiza o ID da variação no estado
        updatedVariations[index].id_variacao = response.data.data.id_variacao;
        setVariations(updatedVariations);
      }
    } catch (err) {
      console.error("Erro ao atualizar variação:", err);
      setError("Erro ao atualizar variação");
      setTimeout(() => setError(""), 3000);
    }
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      { descricao_variacao: "", quant_variacao: 0, valor: 0 },
    ]);
  };

  const removeVariation = async (index: number) => {
    if (variations.length <= 1) return;

    const variationToRemove = variations[index];
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);

    if (variationToRemove.id_variacao) {
      try {
        await axios.delete(
          `http://localhost:9700/api/produtos/variacao/${variationToRemove.id_variacao}`,
          { headers: getAuthHeaders() }
        );
      } catch (err) {
        console.error("Erro ao remover variação:", err);
        setError("Erro ao remover variação");
        setTimeout(() => setError(""), 3000);
        // Reverte a remoção se der erro
        setVariations(variations);
      }
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:9700/api/produtos/loja/${productData.id_loja}/referencia/${productData.referencia}`,
        { headers: getAuthHeaders() }
      );
      router.push("/productsPage");
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      setError("Erro ao deletar produto");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light">
        <h3 className="col-12 text-center">Editar Produto</h3>

        {error && (
          <div className="alert alert-danger col-12 text-center mt-2">
            {error}
          </div>
        )}

        <form className="row w-100 justify-content-between">
          <div className="col-12 w-100">
            <div className="row product-info w-100 d-flex justify-content-between align-items-between">
              <div className="mx-auto col-12 p-4 info-base row">
                <h5 className="text-center mb-2">Informações gerais</h5>

                <label className="product-label">Referência*:</label>
                <input
                  className="mb-3 produto-input"
                  name="referencia"
                  placeholder="Ex: REF0008"
                  value={productData.referencia}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Nome do Produto*:</label>
                <input
                  className="mb-3 produto-input"
                  name="nome"
                  placeholder="Ex: Camiseta Polo Levi's"
                  value={productData.nome}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Categoria*:</label>
                <input
                  className="mb-3 produto-input"
                  name="categoria"
                  placeholder="Ex: Roupas"
                  value={productData.categoria}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Material*:</label>
                <input
                  className="mb-3 produto-input"
                  name="material"
                  placeholder="Ex: Algodão"
                  value={productData.material}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Gênero:</label>
                <input
                  className="mb-3 produto-input"
                  name="genero"
                  placeholder="Ex: Masculino"
                  value={productData.genero}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 w-100">
                <h5 className="text-center mb-4">Variações*:</h5>

                {variations.map((variation, index) => (
                  <article
                    key={index}
                    className="p-1 mx-auto variacao row align-items-center pb-4 justify-content-evenly mb-2 w-100"
                  >
                    <div className="col-12 col-md-6">
                      <p className="col-12 mt-2 text-center">Descrição*</p>
                      <input
                        type="text"
                        className="col-12 produto-input"
                        placeholder="Ex: Tamanho GG - Azul"
                        name="descricao_variacao"
                        value={variation.descricao_variacao}
                        onChange={(e) => handleVariationChange(index, e)}
                      />
                    </div>

                    <div className="col-6 col-md-2">
                      <p className="col-12 m-2 text-center">Quantidade*</p>
                      <input
                        type="number"
                        className="col-12 produto-input"
                        placeholder="Ex: 10"
                        name="quant_variacao"
                        value={variation.quant_variacao || ""}
                        onChange={(e) => handleVariationChange(index, e)}
                        min="0"
                      />
                    </div>

                    <div className="col-6 col-md-2">
                      <p className="col-12 m-2 text-center">Valor* (R$)</p>
                      <input
                        type="number"
                        className="col-12 produto-input"
                        placeholder="Ex: 79.90"
                        name="valor"
                        step="0.01"
                        value={variation.valor || ""}
                        onChange={(e) => handleVariationChange(index, e)}
                        min="0"
                      />
                    </div>

                    <button
                      type="button"
                      className="col-12 col-md-1 mt-4 btn-delete rounded-5"
                      onClick={() => removeVariation(index)}
                      disabled={variations.length <= 1}
                    >
                      X
                    </button>
                  </article>
                ))}

                <button
                  type="button"
                  className="down-btn btn col-12 col-md-3 primaria"
                  onClick={addVariation}
                >
                  Adicionar Variação
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between w-100 mt-3">
            <button
              type="button"
              className="down-btn btn col-12 col-md-3 primaria"
              onClick={() => router.push("/productsPage")}
            >
              Voltar
            </button>

            <button
              type="button"
              className="down-btn btn col-12 col-md-3 primaria"
            >
              Deletar
            </button>

            <button
              type="submit"
              className="down-btn btn col-12 col-md-3 primaria"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default productDetail;
