import React, { useState } from "react";
import styles from "../../styles/AddProductComponent.module.css";
import axios from "axios";

const AddProduct: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [productData, setProductData] = useState({
    referencia: "",
    nome: "",
    categoria: "",
    material: "",
    genero: "",
  });

  const [variations, setVariations] = useState([
    { descricao_variacao: "", quant_variacao: 0, valor: 0 }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVariationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedVariations = [...variations];
    updatedVariations[index] = {
      ...updatedVariations[index],
      [name]: name === "quant_variacao" || name === "valor" ? Number(value) : value,
    };
    setVariations(updatedVariations);
  };

  const addVariation = () => {
    setVariations([...variations, { descricao_variacao: "", quant_variacao: 0, valor: 0 }]);
  };

  const removeVariation = (index: number) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderPayload = {
      ...productData,
      id_loja: "2e8bb522-62d1-4578-b402-c12f98c0d64a",
      variacoes: variations,
    };

    try {
      const response = await axios.post("/api/produtos", orderPayload);
      console.log("Produto criado:", response.data);
      setFormOpen(false);
      setProductData({ referencia: "", nome: "", categoria: "", material: "", genero: "" });
      setVariations([{ descricao_variacao: "", quant_variacao: 0, valor: 0 }]);
    } catch (err) {
      console.error("Erro ao criar produto:", err);
    }
  };

  return (
    <div className={styles.addProductContainer}>
      <button
        className={`${styles.toggleFormButton} ${styles['button-base']} ${formOpen ? styles['button-secondary'] : styles['button-primary']}`}
        onClick={() => setFormOpen(!formOpen)}
      >
        {formOpen ? "Cancelar" : "Adicionar Produto"}
      </button>

      {formOpen && (
        <form onSubmit={handleSubmit} className={styles.formAddProduct}>
          <input name="referencia" placeholder="Referência" className={styles.searchInput} value={productData.referencia} onChange={handleChange} required />
          <input name="nome" placeholder="Nome do Produto" className={styles.searchInput} value={productData.nome} onChange={handleChange} required />
          <input name="categoria" placeholder="Categoria" className={styles.searchInput} value={productData.categoria} onChange={handleChange} required />
          <input name="material" placeholder="Material" className={styles.searchInput} value={productData.material} onChange={handleChange} required />
          <input name="genero" placeholder="Gênero (opcional)" className={styles.searchInput} value={productData.genero} onChange={handleChange} />

          <div className={styles.variationsSection}>
            <h3 className={styles.variationsTitle}>Variações</h3>
            {variations.map((variation, index) => (
              <div key={index} className={styles.variationGroup}>
                <input name="descricao_variacao" placeholder="Descrição (Ex: Cor, Tamanho)" className={styles.searchInput} value={variation.descricao_variacao} onChange={(e) => handleVariationChange(index, e)} required />
                <input name="quant_variacao" type="number" placeholder="Quantidade" className={styles.searchInput} value={variation.quant_variacao} onChange={(e) => handleVariationChange(index, e)} required min="0" />
                <input name="valor" type="number" placeholder="Valor (R$)" step="0.01" className={styles.searchInput} value={variation.valor} onChange={(e) => handleVariationChange(index, e)} required min="0" />
                {variations.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.removeVariationButton} ${styles['button-base']} ${styles['button-secondary']}`}
                    onClick={() => removeVariation(index)}
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={`${styles.addVariationButton} ${styles['button-base']} ${styles['button-secondary']}`}
              onClick={addVariation}
            >
              Adicionar Variação
            </button>
          </div>

          <button
            type="submit"
            className={`${styles.submitProductButton} ${styles['button-base']} ${styles['button-primary']}`}
          >
            Salvar Produto
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;