import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "../../public/css/products.css";
import "../../public/css/general.css";


const EmployeeDetail = () => {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState({
    nome: "",
    cpf: "",
    email: "",
    data_de_nascimento: "",
    telefone: "",
    senha: "",
  });


  const [error, setError] = useState("");

  // Carrega os dados iniciais
  useEffect(() => {
    const funcionario = localStorage.getItem("selectedEmployee");
    if (funcionario) {
      const produtoObj = JSON.parse(funcionario);
      const data = produtoObj.data;

      setEmployeeData({
        nome: data.nome || "",
        cpf: data.categoria || "",
        email: data.material || "",
        data_de_nascimento: data.genero || "",
        telefone: data.id_loja,
        senha: data.senha
      });
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
    const newData = { ...employeeData, [name]: value };
    setEmployeeData(newData);

    try {
      await axios.patch(
        `http://localhost:9700/api/colocaaquiarota`,
        { [name]: value },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.error("Erro ao atualizar funcionário:", err);
      setError("Erro ao atualizar funcionário");
      setTimeout(() => setError(""), 3000);
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios.delete(
        `http://localhost:9700/api/colocaaquiarota`,
        { headers: getAuthHeaders() }
      );
      router.push("/employeesPage");
    } catch (err) {
      console.error("Erro ao deletar funcionário:", err);
      setError("Erro ao deletar funcionário");
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

                <label className="product-label">Nome:</label>

                <input
                  className="mb-3 produto-input"
                  name="Nome"
                  placeholder="Nome"
                  value={employeeData.nome}
                  readOnly
                  style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
                />

                <label className="product-label">CPF/CNPJ*:</label>
                <input
                  className="mb-3 produto-input"
                  name="cpf"
                  placeholder="Digite o CPF ou CNPJ"
                  value={employeeData.cpf}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Email:</label>
                <input
                  className="mb-3 produto-input"
                  name="email"
                  placeholder="Digite o email"
                  value={employeeData.email}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Data de nascimento:</label>
                <input
                  className="mb-3 produto-input"
                  name="data de nascimento"
                  placeholder="Digite a data de nascimento"
                  value={employeeData.data_de_nascimento}
                  onChange={handleChange}
                  required
                />

                <label className="product-label">Telefone:</label>
                <input
                  className="mb-3 produto-input"
                  name="telefone"
                  placeholder="Ex: (99) 99999-9999"
                  value={employeeData.telefone}
                  onChange={handleChange}
                />

                 <label className="product-label">Senha:</label>
                <input
                  className="mb-3 produto-input"
                  name="genero"
                  placeholder="Ex: Masculino"
                  value={employeeData.senha}
                  onChange={handleChange}
                />
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
              onClick={deleteEmployee}
            >
              Deletar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetail;
