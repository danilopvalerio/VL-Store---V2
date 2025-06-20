import React, { useMemo, useState } from "react";
import styles from "../../styles/cashierPage.module.css";
import axios from "axios";

export interface CreateCashierPayload {
  responsibleId: string;
  storeId: string;
}

interface Seller {
  id_funcionario: string;
  nome: string;
  cargo?: string;
}

interface Props {
  onCancel: () => void;
  onSave: (data: {
    id_funcionario_responsavel: string;
    id_loja: string;
  }) => void;
  vendedoresDisponiveis: Seller[]
  id_loja: string;
}

const NewCashier: React.FC<Props> = ({ onCancel, onSave, vendedoresDisponiveis, id_loja }) => {
  const [vendedorSearchTerm, setVendedorSearchTerm] = useState<string>("");
  const [showVendedorDropdown, setShowVendedorDropdown] = useState<boolean>(false);
  const [id_funcionario_responsavel, setId_funcionario] = useState<string>("");

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

    const filteredVendedores = useMemo(() => {
      if (!vendedorSearchTerm.trim()) return vendedoresDisponiveis;
  
      const term = vendedorSearchTerm.toLowerCase();
      return vendedoresDisponiveis.filter(
        (v) =>
          v.nome.toLowerCase().includes(term) ||
          (v.cargo && v.cargo.toLowerCase().includes(term))
      );
    }, [vendedorSearchTerm, vendedoresDisponiveis]);

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
                          setId_funcionario(v.id_funcionario);
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
                id="id_funcionario_responsavel"
                value={id_funcionario_responsavel}
              />
            </div>
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
