import styles from "../ui/styles/ProductsPage.module.css"
import AddProduct from "../ui/components/products/AddProductComponent"

const ProductPage = () => {
  return (
    <div className={styles.productPage}>
      <header className={styles.header}>
        <span className={styles.logo}>V</span>
        <button className={styles.backButton}>Voltar</button>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.productContainer}>
          <h2 className={styles.title}>Produtos</h2>

          <div className={styles.actions}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Digite o produto..."
            />
            <button
              className={`${styles.actionButton} ${styles['button-base']} ${styles['button-primary']}`}
            >
              Pesquisar
            </button>
            <button
              className={`${styles.actionButton} ${styles['button-base']} ${styles['button-secondary']}`}
            >
              Limpar
            </button>
            <AddProduct />
          </div>

          <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton} ${styles['button-base']} ${styles['button-secondary']}`}
            >
              Anterior
            </button>
            <button
              className={`${styles.paginationButton} ${styles['button-base']} ${styles['button-secondary']}`}
            >
              Próxima
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;