import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const pushInitialPage = () => {
    router.push('initialPage');
  }

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
                Insira os seus dados para se cadastrar no sistema.
              </p>
            </div>

            <div className={`p-4 ${styles.formPanel}`}>
              <h3 className="text-center mb-4">Cadastro</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {showRegisterForm && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome da loja"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                  </div>

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

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite o seu CPF (apenas números)"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite o seu telefone com DDD"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                  </div>

                  </>
                  )}

                 <div className="d-grid gap-2 mt-3">
                  {showRegisterForm === false ? (
                    <button onClick={() => setShowRegisterForm(true) } className={`btn btn-primary ${styles.btnPrimary}`}>
                    Realizar cadastro
                  </button>
                  ) : null}

                  {showRegisterForm === false ? (
                    <button onClick={pushInitialPage} className={`btn btn-primary ${styles.btnPrimary}`}>
                    Página inicial
                  </button>
                  ) : null}

                  {showRegisterForm === true ? (
                    <button onClick={handleSubmit} className={`btn btn-primary ${styles.btnPrimary}`}>Cadastrar</button>
                  ) : null}

                  {showRegisterForm === true ? (
                    <button onClick={() => setShowRegisterForm(false)} className={`btn btn-secondary ${styles.btnSecondary}`}>voltar</button>
                  ) : null}
                  
                  
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RegisterPage;