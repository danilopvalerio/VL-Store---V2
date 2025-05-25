// pages/authPage.tsx
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../public/css/login.css"; // Importação do CSS específico

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pushInitialPage = () => {
    router.push("/initialPage");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: email.toLowerCase(),
        senha: password,
      };

      const response = await axios.post(
        "http://localhost:9700/api/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200 && data.success) {
        localStorage.setItem("jwtToken", data.data.token);
        localStorage.setItem("userData", JSON.stringify(data.data.loja));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        router.push("/menuPage");
      } else {
        setError(data.message || "Usuário ou senha incorretos.");
      }
    } catch (err) {
      console.error("Falha na chamada de login:", err);
      setError(
        "Falha na autenticação. Verifique sua conexão ou tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-between flex-column min-vh-100">
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="w-100">
        <div className="header-panel">
          <img
            className="img logo"
            src="/vl-store-logo-white.svg"
            alt="VL Store Logo"
            onClick={pushInitialPage}
            style={{ cursor: "pointer" }}
          />
        </div>
      </header>

      <main className="flex-grow-1 d-flex align-items-center">
        <div className="mx-auto login-register-block fine-transparent-border white-light d-flex justify-content-center align-items-center overflow-hidden w-75">
          <div className="row w-100 shadow overflow-hidden">
            {/* Painel de Boas-Vindas */}
            <div className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center text-center p-4 quartenary">
              <h4 className="m-3">Bem-vindo!</h4>
              <p className="w-75">
                Insira os seus dados de login para ter acesso ao sistema.
              </p>
            </div>

            <div className="col-md-6 p-4 terciary">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="input-block row mb-2 align-items-center mb-3">
                  <div className="col-12 w-100">
                    <input
                      type="email"
                      className="form-control input-form"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="input-block row mb-2 align-items-center mb-3">
                  <div className="col-12 w-100">
                    <input
                      type="password"
                      className="form-control input-form"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="row mt-3 gap-1">
                  <button
                    type="submit"
                    className="btn primaria col-11 col-lg-5 mx-auto d-flex justify-content-center align-items-center"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                  <Link
                    href="/recover"
                    className="btn primaria col-11 col-lg-5 mx-auto d-flex justify-content-center align-items-center text-decoration-none"
                  >
                    Recuperar senha
                  </Link>
                </div>

                <p className="w-100 text-center mt-3">
                  Não possui conta? <Link href="/RegisterPage">Cadastrar</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-100">
        <div className="footer-panel">
          {/* <button
            className="btn primaria footerButton col-3 mx-auto d-flex justify-content-center align-items-center"
            onClick={pushInitialPage}
          >
            Entrar como visitante
          </button> */}
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
