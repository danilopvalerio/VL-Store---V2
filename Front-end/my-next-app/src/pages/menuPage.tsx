import Head from "next/head";
import styles from "../ui/styles/Menu.module.css";
import { useRouter } from "next/router";

const MenuPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <img src="/vlStore.svg" alt="Logo" className={styles.logo} />
        </header>
        
           <div className={styles.menu}>
            <div className={styles.button}>Produtos</div>
            <div className={styles.button}>Caixa</div>
            <div className={styles.button}>Funcionários</div>
            <div className={styles.button}>Vendas</div>
            <div className={styles.button}>Relatórios</div>
            <div className={styles.button}>Conta</div>
          </div>

        <footer className={styles.footer}>
          <button
            className={styles.button
            }
            onClick={() => router.push("/initialPage")}
          >
            Sair
          </button>
        </footer>
      </div>
    </>
  );
};

export default MenuPage;
