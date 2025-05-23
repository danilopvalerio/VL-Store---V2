import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../ui/styles/InitialPage.module.css';

const InitialPage: React.FC = () => {
  const router = useRouter();

  const pushLoginPage = () => {
    router.push('/loginPage');
  };

  const pushRegisterPage = () => {
    router.push('RegisterPage');
  }
 return (
    <>
      <Head>
        <title>Bem-vindo - VL Store</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <img className={styles.logo} src="/vlStore.svg" alt="VL Store Logo" />
        </header>
        <main className={styles.contentBox}>
          
          <div className={styles.infoPanel}>
            <h4>VL Store</h4>
            <p>
              Seja bem-vindo à VL Store, a plataforma de gerenciamento empresarial da VL Company.
            </p>
          </div>

          <div className={styles.actionsPanel}>
            <img className={styles.logoInternal} src="/vlStore.svg" alt="VL Store Logo Pequeno" />

            <button 
              onClick={pushLoginPage} 
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              Entrar com email e senha
            </button>
            <button 
              onClick={pushRegisterPage} 
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              Cadastrar
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default InitialPage;