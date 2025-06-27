module.exports = {

"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[project]/src/ui/styles/ReportDisplay.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "alertDanger": "ReportDisplay-module__aWHpXW__alertDanger",
  "btnBack": "ReportDisplay-module__aWHpXW__btnBack",
  "btnDownload": "ReportDisplay-module__aWHpXW__btnDownload",
  "btnPrimary": "ReportDisplay-module__aWHpXW__btnPrimary",
  "errorContainer": "ReportDisplay-module__aWHpXW__errorContainer",
  "filterInput": "ReportDisplay-module__aWHpXW__filterInput",
  "filterLabel": "ReportDisplay-module__aWHpXW__filterLabel",
  "filterSection": "ReportDisplay-module__aWHpXW__filterSection",
  "headerContent": "ReportDisplay-module__aWHpXW__headerContent",
  "headerSpacer": "ReportDisplay-module__aWHpXW__headerSpacer",
  "loadingContainer": "ReportDisplay-module__aWHpXW__loadingContainer",
  "loadingSpinner": "ReportDisplay-module__aWHpXW__loadingSpinner",
  "logo": "ReportDisplay-module__aWHpXW__logo",
  "logoContainer": "ReportDisplay-module__aWHpXW__logoContainer",
  "noData": "ReportDisplay-module__aWHpXW__noData",
  "pageContainer": "ReportDisplay-module__aWHpXW__pageContainer",
  "reportActions": "ReportDisplay-module__aWHpXW__reportActions",
  "reportCard": "ReportDisplay-module__aWHpXW__reportCard",
  "reportContent": "ReportDisplay-module__aWHpXW__reportContent",
  "reportDescription": "ReportDisplay-module__aWHpXW__reportDescription",
  "reportFooter": "ReportDisplay-module__aWHpXW__reportFooter",
  "reportHeader": "ReportDisplay-module__aWHpXW__reportHeader",
  "reportIcon": "ReportDisplay-module__aWHpXW__reportIcon",
  "reportMain": "ReportDisplay-module__aWHpXW__reportMain",
  "reportMeta": "ReportDisplay-module__aWHpXW__reportMeta",
  "reportTable": "ReportDisplay-module__aWHpXW__reportTable",
  "reportTitle": "ReportDisplay-module__aWHpXW__reportTitle",
  "reportTitleInfo": "ReportDisplay-module__aWHpXW__reportTitleInfo",
  "reportTitleSection": "ReportDisplay-module__aWHpXW__reportTitleSection",
  "spin": "ReportDisplay-module__aWHpXW__spin",
  "tableContainer": "ReportDisplay-module__aWHpXW__tableContainer",
});
}}),
"[project]/src/ui/styles/General.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "alert": "General-module__TBMboa__alert",
  "alert-danger": "General-module__TBMboa__alert-danger",
  "alert-info": "General-module__TBMboa__alert-info",
  "alert-success": "General-module__TBMboa__alert-success",
  "alert-warning": "General-module__TBMboa__alert-warning",
  "big-container": "General-module__TBMboa__big-container",
  "btn-delete": "General-module__TBMboa__btn-delete",
  "btn-paginacao": "General-module__TBMboa__btn-paginacao",
  "circle-box": "General-module__TBMboa__circle-box",
  "fadeIn": "General-module__TBMboa__fadeIn",
  "fine-transparent-border": "General-module__TBMboa__fine-transparent-border",
  "fine-transparent-border-bottom": "General-module__TBMboa__fine-transparent-border-bottom",
  "fine-transparent-border-top": "General-module__TBMboa__fine-transparent-border-top",
  "footer-panel": "General-module__TBMboa__footer-panel",
  "footerButton": "General-module__TBMboa__footerButton",
  "header-panel": "General-module__TBMboa__header-panel",
  "input-block": "General-module__TBMboa__input-block",
  "input-form": "General-module__TBMboa__input-form",
  "link": "General-module__TBMboa__link",
  "logo": "General-module__TBMboa__logo",
  "noBreak-line": "General-module__TBMboa__noBreak-line",
  "primaria": "General-module__TBMboa__primaria",
  "quartenary": "General-module__TBMboa__quartenary",
  "quinary": "General-module__TBMboa__quinary",
  "small-shadow": "General-module__TBMboa__small-shadow",
  "terciary": "General-module__TBMboa__terciary",
  "white-light": "General-module__TBMboa__white-light",
});
}}),
"[project]/src/ui/components/reports/reportDisplay.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/ReportDisplay.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$General$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/General.module.css [ssr] (css module)");
;
;
;
;
;
;
const REPORT_CONFIGS = {
    'produtos-mais-vendidos': {
        title: 'Produtos Mais Vendidos',
        endpoint: 'produtos-mais-vendidos',
        requiresPeriod: true,
        columns: [
            {
                key: 'nome_produto',
                label: 'Produto',
                type: 'text'
            },
            {
                key: 'referencia_produto',
                label: 'Referência',
                type: 'text'
            },
            {
                key: 'total_unidades_vendidas',
                label: 'Unidades Vendidas',
                type: 'number'
            }
        ]
    },
    'ranking-funcionarios': {
        title: 'Ranking de Funcionários',
        endpoint: 'ranking-funcionarios',
        requiresPeriod: true,
        columns: [
            {
                key: 'nome_funcionario',
                label: 'Funcionário',
                type: 'text'
            },
            {
                key: 'total_vendido',
                label: 'Total Vendido',
                type: 'currency'
            }
        ]
    },
    'financeiro': {
        title: 'Relatório Financeiro',
        endpoint: 'total-entradas-saidas',
        requiresPeriod: true,
        columns: [
            {
                key: 'total_entradas',
                label: 'Total de Entradas',
                type: 'currency'
            },
            {
                key: 'total_saidas',
                label: 'Total de Saídas',
                type: 'currency'
            },
            {
                key: 'saldo',
                label: 'Saldo',
                type: 'currency'
            }
        ]
    },
    'vendas-forma-pagamento': {
        title: 'Vendas por Forma de Pagamento',
        endpoint: 'vendas-forma-pagamento',
        requiresPeriod: true,
        columns: [
            {
                key: 'forma_pagamento',
                label: 'Forma de Pagamento',
                type: 'text'
            },
            {
                key: 'total_arrecadado',
                label: 'Total Arrecadado',
                type: 'currency'
            },
            {
                key: 'quantidade_transacoes',
                label: 'Qtd. Transações',
                type: 'number'
            }
        ]
    },
    'estoque-baixo': {
        title: 'Produtos com Estoque Baixo',
        endpoint: 'estoque-baixo',
        requiresLimit: true,
        columns: [
            {
                key: 'referencia',
                label: 'Referência',
                type: 'text'
            },
            {
                key: 'nome',
                label: 'Produto',
                type: 'text'
            },
            {
                key: 'estoque_total',
                label: 'Estoque Total',
                type: 'number'
            }
        ]
    }
};
const ReportDisplay = ({ reportType })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        id_loja: '',
        dataInicio: '',
        dataFim: '',
        limite: '7'
    });
    const config = REPORT_CONFIGS[reportType];
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const userDataString = localStorage.getItem("userData");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id_loja) {
                setFilters((prevFilters)=>({
                        ...prevFilters,
                        id_loja: userData.id_loja
                    }));
            }
        } else {
            console.error("Dados do usuário não encontrados no localStorage.");
            setError("Não foi possível identificar a loja. Por favor, faça o login novamente.");
        }
    }, []);
    if (!config) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            children: "Tipo de relatório não encontrado"
        }, void 0, false, {
            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    const fetchReportData = async ()=>{
        if (!filters.id_loja) {
            setError('ID da loja não encontrado. Verifique se está logado.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (config.requiresPeriod && (!filters.dataInicio || !filters.dataFim)) {
                setError('As datas de início e fim são obrigatórias');
                setLoading(false);
                return;
            }
            const params = new URLSearchParams();
            if (config.requiresPeriod) {
                params.append('dataInicio', filters.dataInicio);
                params.append('dataFim', filters.dataFim);
            }
            if (config.requiresLimit && filters.limite) {
                params.append('limite', filters.limite);
            }
            const url = `http://localhost:9700/api/relatorios/loja/${filters.id_loja}/${config.endpoint}?${params.toString()}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro ${response.status}`);
            }
            const result = await response.json();
            if (result.success === false) {
                throw new Error(result.message || 'Erro ao carregar relatório');
            }
            setData(Array.isArray(result.data) ? result.data : [
                result.data
            ]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro inesperado');
        } finally{
            setLoading(false);
        }
    };
    const downloadPDF = async ()=>{
        try {
            const params = new URLSearchParams({
                tipo: reportType,
                id_loja: filters.id_loja,
                ...Object.fromEntries(Object.entries(filters).filter(([key])=>key !== 'id_loja'))
            });
            const configRequest = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch(`http://localhost:9700/api/relatorios/loja/${filters.id_loja}/pdf?${params.toString()}`, configRequest);
            if (!response.ok) {
                throw new Error('Erro ao gerar PDF');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${config.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError('Erro ao fazer download do PDF');
        }
    };
    const formatValue = (value, type)=>{
        if (value === null || value === undefined) return '-';
        switch(type){
            case 'currency':
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(parseFloat(value));
            case 'number':
                return new Intl.NumberFormat('pt-BR').format(value);
            default:
                return value;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: [
                            "VL Store - ",
                            config.title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "header-panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                id: "menu-page-return",
                                className: "btn primaria position-fixed top-0 end-0 m-2 shadow",
                                onClick: ()=>router.push('/reportsPage'),
                                children: "Voltar"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                lineNumber: 235,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                className: "img logo",
                                src: "/vl-store-logo-white.svg"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                lineNumber: 242,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportMain,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportTitleSection,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportTitleInfo,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportTitle,
                                                children: config.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 249,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportDescription,
                                                children: "Relatório detalhado do sistema"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 250,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportMeta,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Loja: ",
                                                            filters.id_loja
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 19
                                                    }, this),
                                                    config.requiresPeriod && filters.dataInicio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Período: ",
                                                            filters.dataInicio,
                                                            " a ",
                                                            filters.dataFim
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportActions,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnDownload}`,
                                        onClick: downloadPDF,
                                        disabled: loading || data.length === 0,
                                        children: "Download PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterSection,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "row g-3",
                                        children: [
                                            config.requiresPeriod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "col-md-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                htmlFor: "dataInicio",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                                                children: "Data Início"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterInput,
                                                                id: "dataInicio",
                                                                value: filters.dataInicio,
                                                                onChange: (e)=>setFilters({
                                                                        ...filters,
                                                                        dataInicio: e.target.value
                                                                    }),
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "col-md-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                htmlFor: "dataFim",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                                                children: "Data Fim"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterInput,
                                                                id: "dataFim",
                                                                value: filters.dataFim,
                                                                onChange: (e)=>setFilters({
                                                                        ...filters,
                                                                        dataFim: e.target.value
                                                                    }),
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            config.requiresLimit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "col-md-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "limite",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                                        children: "Limite de Estoque"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterInput,
                                                        id: "limite",
                                                        value: filters.limite,
                                                        onChange: (e)=>setFilters({
                                                                ...filters,
                                                                limite: e.target.value
                                                            }),
                                                        min: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 300,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "col-md-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                                    onClick: fetchReportData,
                                                    disabled: loading,
                                                    style: {
                                                        marginTop: '1.8rem'
                                                    },
                                                    children: loading ? 'Carregando...' : 'Gerar Relatório'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportContent,
                                    children: [
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].errorContainer,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].alertDanger,
                                                children: error
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this),
                                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loadingContainer,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loadingSpinner
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: "Gerando relatório..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this),
                                        !loading && data.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableContainer,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportTable,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                            children: config.columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                    children: col.label
                                                                }, col.key, false, {
                                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                                        children: data.map((row, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                                children: config.columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: formatValue(row[col.key], col.type)
                                                                    }, col.key, false, {
                                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 29
                                                                    }, this))
                                                            }, index, false, {
                                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                            lineNumber: 341,
                                            columnNumber: 17
                                        }, this),
                                        !loading && data.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].noData,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: '4rem'
                                                    },
                                                    children: "📊"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                    children: "Nenhum dado encontrado"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: 'Configure os filtros e clique em "Gerar Relatório" para visualizar os dados.'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                            lineNumber: 366,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportDisplay$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportFooter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " VL Store. Todos os direitos reservados."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/reports/reportDisplay.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = ReportDisplay;
}}),
"[project]/src/ui/styles/ReportsPage.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "buttonGrid": "ReportsPage-module__BeWnjG__buttonGrid",
  "footer": "ReportsPage-module__BeWnjG__footer",
  "header": "ReportsPage-module__BeWnjG__header",
  "logo": "ReportsPage-module__BeWnjG__logo",
  "pageContainer": "ReportsPage-module__BeWnjG__pageContainer",
  "reportButton": "ReportsPage-module__BeWnjG__reportButton",
  "reportsCard": "ReportsPage-module__BeWnjG__reportsCard",
  "secondaryButton": "ReportsPage-module__BeWnjG__secondaryButton",
  "subtitle": "ReportsPage-module__BeWnjG__subtitle",
  "title": "ReportsPage-module__BeWnjG__title",
  "titleSection": "ReportsPage-module__BeWnjG__titleSection",
});
}}),
"[project]/src/pages/reportsPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$reports$2f$reportDisplay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/reports/reportDisplay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/ReportsPage.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$General$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/General.module.css [ssr] (css module)");
;
;
;
;
;
;
;
const ReportsPage = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isViewOnly, setIsViewOnly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const { reportType } = router.query;
    if (reportType) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$reports$2f$reportDisplay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            reportType: reportType
        }, void 0, false, {
            fileName: "[project]/src/pages/reportsPage.tsx",
            lineNumber: 14,
            columnNumber: 12
        }, this);
    }
    const reportButtons = [
        {
            label: "Produtos mais vendidos",
            path: "/reportsPage?reportType=produtos-mais-vendidos",
            disabled: false
        },
        {
            label: "Ranking de vendas de funcionários",
            path: "/reportsPage?reportType=ranking-funcionarios",
            disabled: isViewOnly
        },
        {
            label: "Relatório financeiro",
            path: "/reportsPage?reportType=financeiro",
            disabled: isViewOnly
        },
        {
            label: "Total de vendas por forma de pagamento",
            path: "/reportsPage?reportType=vendas-forma-pagamento",
            disabled: false
        },
        {
            label: "Estoque baixo",
            path: "/reportsPage?reportType=estoque-baixo",
            disabled: false
        },
        {
            label: "Voltar para o Menu",
            path: "/menuPage",
            disabled: false,
            isSecondary: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "VL Store - Relatórios"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/reportsPage.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/reportsPage.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/reportsPage.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: "/vl-store-logo-white.svg",
                            alt: "VL Store Logo",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo
                        }, void 0, false, {
                            fileName: "[project]/src/pages/reportsPage.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/reportsPage.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportsCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titleSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                                        children: "VL Store"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/reportsPage.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                                        children: "Página de Relatórios"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/reportsPage.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/reportsPage.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonGrid,
                                children: reportButtons.map((button, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reportButton} ${button.isSecondary ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].secondaryButton : ""}`,
                                        onClick: ()=>router.push(button.path),
                                        disabled: button.disabled,
                                        children: button.label
                                    }, index, false, {
                                        fileName: "[project]/src/pages/reportsPage.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/reportsPage.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/reportsPage.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ReportsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " VL Store. Todos os direitos reservados."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/reportsPage.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/reportsPage.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/reportsPage.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = ReportsPage;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__07ea8186._.js.map