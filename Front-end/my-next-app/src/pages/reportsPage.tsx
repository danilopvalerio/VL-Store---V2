import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
// 1. Importando o novo CSS Module específico para esta página
import styles from "../ui/styles/ReportsPage.module.css";
import "../../public/css/general.css";

const ReportsPage: React.FC = () => {
  const router = useRouter();
  // O estado isViewOnly será usado para desabilitar botões específicos
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Array com os dados dos relatórios para um código mais limpo
  const reportButtons = [
    {
      label: "Produtos mais vendidos",
      path: "/productsReportPage", // Exemplo de rota
      disabled: false,
    },
    {
      label: "Ranking de vendas de funcionários",
      path: "/employeeSalesReportPage", // Exemplo de rota
      disabled: isViewOnly,
    },
    {
      label: "Relatório financeiro",
      path: "/financialReportPage", // Exemplo de rota
      disabled: isViewOnly,
    },
    {
      label: "Total de vendas por forma de pagamento",
      path: "/paymentMethodsReportPage", // Exemplo de rota
      disabled: false,
    },
    {
      label: "Estoque baixo",
      path: "/lowStockReportPage", // Exemplo de rota
      disabled: false,
    },
    {
      label: "Voltar para o Menu", // Adicionei um botão de voltar mais proeminente
      path: "/menuPage",
      disabled: false,
      isSecondary: true, // Estilo diferente para o botão de voltar
    },
  ];

  return (
    <>
      <Head>
        <title>VL Store - Relatórios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Container principal que centraliza todo o conteúdo na página */}
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <img
            src="/vl-store-logo-white.svg"
            alt="VL Store Logo"
            className={styles.logo}
          />
        </header>

        {/* O card principal com o efeito de vidro */}
        <main className={styles.reportsCard}>
          {/* Seção dos Títulos */}
          <section className={styles.titleSection}>
            <h1 className={styles.title}>VL Store</h1>
            <h2 className={styles.subtitle}>Página de Relatórios</h2>
          </section>

          <section className={styles.buttonGrid}>
            {reportButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.reportButton} ${button.isSecondary ? styles.secondaryButton : ''}`}
                onClick={() => router.push(button.path)}
                disabled={button.disabled}
              >
                {button.label}
              </button>
            ))}
          </section>
        </main>
        
        {/* Adicionei um footer para consistência, pode remover se não quiser */}
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} VL Store. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
};

export default ReportsPage;