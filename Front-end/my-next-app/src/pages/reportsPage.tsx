import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ReportDisplay from "./../ui/components/reports/reportDisplay";
import styles from "../ui/styles/ReportsPage.module.css";
import "../ui/styles/General.module.css";

const ReportsPage: React.FC = () => {
  const router = useRouter();
  const [isViewOnly, setIsViewOnly] = useState(false);
  const { reportType } = router.query;

  if (reportType) {
    return <ReportDisplay reportType={reportType as string} />;
  }

  const reportButtons = [
    {
      label: "Produtos mais vendidos",
      path: "/reportsPage?reportType=produtos-mais-vendidos",
      disabled: false,
    },
    {
      label: "Ranking de vendas de funcionários",
      path: "/reportsPage?reportType=ranking-funcionarios",
      disabled: isViewOnly,
    },
    {
      label: "Relatório financeiro",
      path: "/reportsPage?reportType=financeiro",
      disabled: isViewOnly,
    },
    {
      label: "Total de vendas por forma de pagamento",
      path: "/reportsPage?reportType=vendas-forma-pagamento",
      disabled: false,
    },
    {
      label: "Estoque baixo",
      path: "/reportsPage?reportType=estoque-baixo",
      disabled: false,
    },
    {
      label: "Voltar para o Menu",
      path: "/menuPage",
      disabled: false,
      isSecondary: true,
    },
  ];

  return (
    <>
      <Head>
        <title>VL Store - Relatórios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <img
            src="/vl-store-logo-white.svg"
            alt="VL Store Logo"
            className={styles.logo}
          />
        </header>

        <main className={styles.reportsCard}>
          <section className={styles.titleSection}>
            <h1 className={styles.title}>VL Store</h1>
            <h2 className={styles.subtitle}>Página de Relatórios</h2>
          </section>

          <section className={styles.buttonGrid}>
            {reportButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.reportButton} ${
                  button.isSecondary ? styles.secondaryButton : ""
                }`}
                onClick={() => router.push(button.path)}
                disabled={button.disabled}
              >
                {button.label}
              </button>
            ))}
          </section>
        </main>

        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} VL Store. Todos os direitos
            reservados.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ReportsPage;