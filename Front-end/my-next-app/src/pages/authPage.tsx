import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Usuário e senha são obrigatórios.');
      return;
    }
    try {
      // TODO: implementar chamada real à API de autenticação
      // Exemplo de simulação:
      if (username === 'visitante' && password === '123') {
        router.push('/menuPage');
      } else {
        setError('Usuário ou senha incorretos.');
        return;
      }
    } catch (err) {
      setError(`Falha na autenticação: ${err}`);
    }
  };

  const handleVisitor = () => {
    router.push('/menuPage');
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
            <img className={styles.logo} src="/react.png" alt="Logo" />
          </div>
        </header>

        <main className={`mx-auto w-75  ${styles.loginBlock}`}>  
          <div className={`shadow  ${styles.column}`}>
            <div className={`text-white text-center p-4${styles.welcomePanel}`}>
              <h4>Bem-vindo!</h4>
              <p>
                Insira os seus dados de login para ter acesso ao sistema.
              </p>
            </div>

            <div className={`p-4 ${styles.formPanel}`}>
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                {showLoginForm && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  </>
                  )}

                 <div className="d-grid gap-2 mt-3">
                  {showLoginForm === false ? (
                    <button onClick={() => setShowLoginForm(true) } className={`btn btn-primary ${styles.btnPrimary}`}>
                    Entrar com email e senha
                  </button>
                  ) : null}
                  
                  {showLoginForm === false ? (
                    <button onClick={handleVisitor} className={`btn btn-primary ${styles.btnPrimary}`}>
                    Entrar como visitante
                  </button>
                  ) : null}

                  {showLoginForm === true ? (
                    <button onClick={handleLogin} className={`btn btn-primary ${styles.btnPrimary}`}>Entrar</button>
                  ) : null}

                  {showLoginForm === true ? (
                    <button onClick={() => setShowLoginForm(false)} className={`btn btn-secondary ${styles.btnSecondary}`}>voltar</button>
                  ) : null}
                  
                  
                </div>

                <p className="w-100 text-center mt-3">
                  Esqueceu sua senha? <Link href="/recover">Recuperar senha</Link>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthPage;