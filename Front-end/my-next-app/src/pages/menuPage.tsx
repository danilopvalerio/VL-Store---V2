import Head from 'next/head';
import styles from '../styles/Menu.module.css';
import { useRouter } from 'next/router';

const MenuPage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>Menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <img src="/react.png" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Menu Principal</h1>
        </header>

        <main className={styles.menu}>
          <div className={styles.card} onClick={() => handleNavigation('/dashboard')}>
            <h3>Dashboard</h3>
            <p>Visualize informações gerais do sistema</p>
          </div>

          <div className={styles.card} onClick={() => handleNavigation('/products')}>
            <h3>Produtos</h3>
            <p>Gerencie o cadastro de produtos</p>
          </div>

          <div className={styles.card} onClick={() => handleNavigation('/orders')}>
            <h3>Pedidos</h3>
            <p>Acompanhe os pedidos realizados</p>
          </div>

          <div className={styles.card} onClick={() => handleNavigation('/profile')}>
            <h3>Perfil</h3>
            <p>Atualize seus dados de usuário</p>
          </div>
        </main>

        <footer className={styles.footer}>
          <button className="btn btn-secondary" onClick={() => router.push('/loginPage')}>Sair</button>
        </footer>
      </div>
    </>
  );
};

export default MenuPage;
