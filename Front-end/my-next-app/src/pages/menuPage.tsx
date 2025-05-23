import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../public/css/general.css";
import "../../public/css/menu.css";

const MenuPage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  // Recupera os dados do usuário ao carregar a página
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.nome || parsedData.nome_proprietario || "Usuário");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/initialPage");
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-column min-vh-100">
      <Head>
        <title>VL Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="w-100">
        <div className="header-panel">
          <img
            src="/vl-store-logo-white.svg"
            alt="VL Store Logo"
            className="img logo"
          />
        </div>
      </header>

      <div className="menu row w-75 white-light overflow-hidden rounded-5">
        <div className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center text-center p-2 quinary">
          <h4 className="m-3">VL Store</h4>
          <h4 className="m-3">Bem-vindo, {userName}!</h4>
          <p className="w-75">Sistema de Gestão Comercial</p>
        </div>

        <div className="col-md-6 terciary d-flex flex-column justify-content-center align-items-center text-center p-2">
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/products")}
          >
            Produtos
          </button>
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/cashier")}
          >
            Caixa
          </button>
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/employees")}
          >
            Funcionários
          </button>
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/sales")}
          >
            Vendas
          </button>
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/reports")}
          >
            Relatórios
          </button>
          <button
            type="button"
            className="btn primaria col-9 col-lg-5 mb-2"
            onClick={() => navigateTo("/account")}
          >
            Conta
          </button>
        </div>
      </div>

      <footer className="w-100">
        <div className="footer-panel">
          <button
            className="btn primaria footerButton col-3 mx-auto d-flex justify-content-center align-items-center"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
