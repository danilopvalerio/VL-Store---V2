// Arquivo: AuthPage.tsx (versão CORRIGIDA)
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../ui/styles/Login.module.css';
import axios from 'axios';
// Se for usar axios, importe-o:
// import axios from 'axios';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email e senha são obrigatórios.');
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
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        router.push('/menuPage');
      } else {
        setError(data.message || 'Usuário ou senha incorretos.');
      }
    } catch (err) {
      console.error('Falha na chamada de login:', err);
      setError('Falha na autenticação. Verifique sua conexão ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVisitor = () => {
    router.push('/menuPage');
  };

  const pushInitialPage = () => {
    router.push('/initialPage');
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`d-flex justify-content-between flex-column ${styles.container}`}>
        <header className="w-100">
          <div className={styles.headerPanel}>
            <img onClick={pushInitialPage} className={styles.logo} src="/vlStore.svg" alt="Logo" />
          </div>
        </header>

        <main className={`mx-auto w-75  ${styles.loginBlock}`}>
          <div className={`shadow  ${styles.column}`}>
            <div className={`text-white text-center p-4 ${styles.welcomePanel}`}>
              <h4>Bem-vindo!</h4>
              <p>
                Insira os seus dados de login para ter acesso ao sistema.
              </p>
            </div>

            <div className={`p-4 ${styles.formPanel}`}>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}> {/* onSubmit no form */}
                <>
                  <div className="mb-3">
                    <img height="100px" src="/react.png" alt="Logo" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  </>
                 <div className="d-grid gap-2 mt-3">
                    {/* Botão "Entrar como visitante" agora é type="button" */}
                    <button type="button" onClick={handleVisitor} className={`btn btn-primary ${styles.btnPrimary}`} disabled={loading}>
                      Entrar como visitante
                    </button>
                  
                    {/* Botão "Entrar" agora é type="submit" */}
                    <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`} disabled={loading}>
                      {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                 
                </div>

                <p className="w-100 text-center mt-3">
                  Esqueceu sua senha? <Link href="/recover">Recuperar senha</Link>
                </p>
                <Link className="w-100 text-center mt-3" href="/initialPage"><p>voltar para a página inicial</p></Link>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthPage;