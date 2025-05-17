import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const LoginPage: React.FC = () => {
  const router = useRouter();

  {/* Responsáveis por enviar os usuários para as outras páginas*/}

  const pushLoginPage = () => {
    router.push('/authPage');
  };

  const pushRegisterPage = () => {
    router.push('RegisterPage');
  }

  return (
    <>
      {/* Header, não tenho muito o que explicar */}
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`d-flex justify-content-between flex-column ${styles.container}`}>
        <header className="w-100">
          <div className={styles.headerPanel}>
            <img className={styles.logo} src="/vlStore.svg" alt="Logo" />
          </div>
        </header>

        {/* Card que contém as informações da página inicial */}
        <main className={`mx-auto w-75  ${styles.loginBlock}`}>  
          <div className={`shadow  ${styles.column}`}>
            <div className={`text-white text-center p-4${styles.welcomePanel}`}>
              <h4>VL Store</h4>
              <p>
                Seja bem vindo ao VL Store, a plataforma de gerenciamento empresarial da VL Company
              </p>
            </div>

            {/* botões de direcionamento pra páginas de login e cadastro */}
            <div className={`p-4 ${styles.formPanel}`}>
                 <div className="d-grid gap-3 mt-3">
                {/* Esse margin left tá porco, depois eu ajeito */}
                  <img className={`ml-38.5  ${styles.logoLogin}`} src="/vlStore.svg" alt="Logo" />

                  <button onClick={pushLoginPage} className={`btn btn-primary ${styles.btnPrimary}`}>
                    Entrar com email e senha
                  </button>
                    <button onClick={pushRegisterPage} className={`btn text-white text-center ${styles.btnSecondary}`}>
                    Cadastrar
                    </button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;