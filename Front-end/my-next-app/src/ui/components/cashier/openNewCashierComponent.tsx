import React, { useState } from "react";
import styles from "../../styles/cashierPage.module.css";
import axios from "axios";

export interface CreateCashierPayload {
  responsibleId: string;
  storeId: string;
}

interface Props {
  onCancel: () => void;
  onSave: (data: {
    id_funcionario_responsavel: string;
    id_loja: string;
  }) => void;
}

const NewCashier: React.FC<Props> = ({ onCancel, onSave }) => {
  const [id_funcionario_responsavel, setResponsibleId] = useState("");
  const [id_loja, setStoreId] = useState("");

  const createCashier = async (payload: CreateCashierPayload) => {
    try {
      const response = await axios.post(
        "http://localhost:9700/api/caixas",
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro na requisição:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro inesperado:", error);
      }
      throw error;
    }
  };

  const handleCreateCashier = async () => {
    try {
      const payload = { id_funcionario_responsavel, id_loja };
      const createdCashier = await createCashier(payload);
      onSave(createdCashier);
    } catch (error) {
      alert("Erro ao abrir o caixa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>Abrir Novo Caixa</div>

      <div className={styles.formGroup}>
        <label>ID do Funcionário Responsável</label>
        <input
          type="text"
          placeholder="Digite o ID do funcionário..."
          className={styles.input}
          value={id_funcionario_responsavel}
          onChange={(e) => setResponsibleId(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>ID da Loja</label>
        <input
          type="text"
          placeholder="Digite o ID da loja..."
          className={styles.input}
          value={id_loja}
          onChange={(e) => setStoreId(e.target.value)}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button className="btn primaria mx-2 footerButton" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className="btn primaria mx-2 footerButton"
          onClick={handleCreateCashier}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default NewCashier;
