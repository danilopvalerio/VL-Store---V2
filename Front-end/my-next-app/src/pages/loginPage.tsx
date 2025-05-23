import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../ui/styles/Login.module.css";
import axios from "axios";


console.log("Conteúdo do objeto styles:", styles);

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pushInitialPage = () => {
    router.push('/initialPage');
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
        email: email,
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

      if (response.status === 200) {
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
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
       <img className={styles.logo} src="/vlStore.svg" alt="VL Store Logo" onClick={pushInitialPage} />
       </header>

        <main className={styles.loginBox}>
          <div className={styles.welcomePanel}>
            <h2>Bem-vindo!</h2>
            <p>Insira os seus dados de login para ter acesso ao sistema.</p>
          </div>

          <div className={styles.formPanel}>
            <h3>Login</h3>
            {error && (
              <div className={styles.errorMessage}>{error}</div>
            )}
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  className={styles.inputField}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
                <Link href="/recover" className={styles.linkText}>
                  Recuperar senha
                </Link>
              </div>

              <div className={styles.signupLink}>
                <p>
                  Não possui conta?{" "}
                  <Link href="/RegisterPage" className={styles.linkTextHighlight}>
                    Cadastrar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthPage;