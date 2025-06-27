module.exports = {

"[project]/src/ui/styles/cashierPage.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "borderLeftDanger": "cashierPage-module__jGPq6a__borderLeftDanger",
  "borderLeftSuccess": "cashierPage-module__jGPq6a__borderLeftSuccess",
  "btnPrimary": "cashierPage-module__jGPq6a__btnPrimary",
  "btnSecondary": "cashierPage-module__jGPq6a__btnSecondary",
  "buttonGroup": "cashierPage-module__jGPq6a__buttonGroup",
  "caixasGrid": "cashierPage-module__jGPq6a__caixasGrid",
  "circleBox": "cashierPage-module__jGPq6a__circleBox",
  "danger": "cashierPage-module__jGPq6a__danger",
  "filterContainer": "cashierPage-module__jGPq6a__filterContainer",
  "filterGrid": "cashierPage-module__jGPq6a__filterGrid",
  "filterGroup": "cashierPage-module__jGPq6a__filterGroup",
  "filterLabel": "cashierPage-module__jGPq6a__filterLabel",
  "flex": "cashierPage-module__jGPq6a__flex",
  "gap4": "cashierPage-module__jGPq6a__gap4",
  "grid": "cashierPage-module__jGPq6a__grid",
  "gridCols3": "cashierPage-module__jGPq6a__gridCols3",
  "inputForm": "cashierPage-module__jGPq6a__inputForm",
  "itemsCenter": "cashierPage-module__jGPq6a__itemsCenter",
  "itemsStart": "cashierPage-module__jGPq6a__itemsStart",
  "justifyBetween": "cashierPage-module__jGPq6a__justifyBetween",
  "mb3": "cashierPage-module__jGPq6a__mb3",
  "mb4": "cashierPage-module__jGPq6a__mb4",
  "mb6": "cashierPage-module__jGPq6a__mb6",
  "pageContainer": "cashierPage-module__jGPq6a__pageContainer",
  "pageSubtitle": "cashierPage-module__jGPq6a__pageSubtitle",
  "pageTitle": "cashierPage-module__jGPq6a__pageTitle",
  "statusBadge": "cashierPage-module__jGPq6a__statusBadge",
  "statusBox": "cashierPage-module__jGPq6a__statusBox",
  "statusIcon": "cashierPage-module__jGPq6a__statusIcon",
  "statusLabel": "cashierPage-module__jGPq6a__statusLabel",
  "statusValue": "cashierPage-module__jGPq6a__statusValue",
  "success": "cashierPage-module__jGPq6a__success",
  "textAccent": "cashierPage-module__jGPq6a__textAccent",
  "textCenter": "cashierPage-module__jGPq6a__textCenter",
  "textDanger": "cashierPage-module__jGPq6a__textDanger",
  "textPrimary": "cashierPage-module__jGPq6a__textPrimary",
  "textSecondary": "cashierPage-module__jGPq6a__textSecondary",
  "textTertiary": "cashierPage-module__jGPq6a__textTertiary",
});
}}),
"[project]/src/ui/components/cashier/cashierDetails.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [ssr] (css module)");
;
;
;
;
const CashierDetails = ({ caixa, fecharModal })=>{
    const [novaMovimentacao, setNovaMovimentacao] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        tipo: 'ENTRADA',
        valor: '',
        descricao: ''
    });
    const [movimentacoes, setMovimentacoes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            id: 1,
            dataHora: '04/06/2025 08:30',
            tipo: 'ENTRADA',
            descricao: 'Venda #001 - Tênis Nike Air',
            valor: 'R$ 350,00',
            responsavel: 'João Silva'
        },
        {
            id: 2,
            dataHora: '04/06/2025 09:15',
            tipo: 'ENTRADA',
            descricao: 'Venda #002 - Camiseta Adidas',
            valor: 'R$ 120,00',
            responsavel: 'Maria Santos'
        },
        {
            id: 3,
            dataHora: '04/06/2025 10:00',
            tipo: 'SAIDA',
            descricao: 'Pagamento de fornecedor',
            valor: 'R$ 150,00',
            responsavel: 'Administrador'
        },
        {
            id: 4,
            dataHora: '04/06/2025 11:30',
            tipo: 'ENTRADA',
            descricao: 'Venda #003 - Calça Jeans',
            valor: 'R$ 180,00',
            responsavel: 'Carlos Oliveira'
        },
        {
            id: 5,
            dataHora: '04/06/2025 14:20',
            tipo: 'ENTRADA',
            descricao: 'Venda #004 - Kit Esportivo',
            valor: 'R$ 1.800,00',
            responsavel: 'Ana Costa'
        }
    ]);
    const handleAdicionarMovimentacao = (e)=>{
        e.preventDefault();
        if (!novaMovimentacao.valor || !novaMovimentacao.descricao) return;
        const novaMov = {
            id: movimentacoes.length + 1,
            dataHora: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            tipo: novaMovimentacao.tipo,
            descricao: novaMovimentacao.descricao,
            valor: `R$ ${parseFloat(novaMovimentacao.valor).toFixed(2).replace('.', ',')}`,
            responsavel: 'Usuário Atual'
        };
        setMovimentacoes([
            ...movimentacoes,
            novaMov
        ]);
        setNovaMovimentacao({
            tipo: 'ENTRADA',
            valor: '',
            descricao: ''
        });
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setNovaMovimentacao({
            ...novaMovimentacao,
            [name]: value
        });
    };
    if (!caixa) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalOverlay,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeButton,
                    onClick: fecharModal,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalTitle,
                    children: [
                        "Detalhes do Caixa #",
                        caixa.id
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBadgeContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBadge} ${caixa.status === 'ABERTO' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].danger}`,
                                children: caixa.status
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Data de Abertura"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.dataAbertura
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Hora de Abertura"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.horaAbertura
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Responsável"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.responsavel
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totaisSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totaisGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Total de Entradas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalValue,
                                        children: caixa.entradas
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Total de Saídas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalValue} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textDanger}`,
                                        children: caixa.saidas
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Saldo Atual"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].totalValue} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textAccent}`,
                                        children: caixa.status === 'ABERTO' ? caixa.saldo : caixa.saldoFinal
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                caixa.status === 'ABERTO' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: "Adicionar Movimentação"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleAdicionarMovimentacao,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        name: "tipo",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: novaMovimentacao.tipo,
                                        onChange: handleChange,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "ENTRADA",
                                                children: "Entrada"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "SAIDA",
                                                children: "Saída"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "valor",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Valor (R$)",
                                        value: novaMovimentacao.valor,
                                        onChange: handleChange,
                                        step: "0.01",
                                        min: "0.01"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "descricao",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Descrição da movimentação",
                                        value: novaMovimentacao.descricao,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                        disabled: !novaMovimentacao.valor || !novaMovimentacao.descricao,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            "Adicionar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].movimentacoesSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Movimentações"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                            placeholder: "Buscar movimentação..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnIcon,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].movimentacoesTable,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Data/Hora"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Descrição"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Valor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Responsável"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Ações"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: movimentacoes.map((mov)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: mov.dataHora
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: mov.tipo === 'ENTRADA' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textDanger,
                                                            children: mov.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: mov.descricao
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: mov.valor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: mov.responsavel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnIcon,
                                                            children: "☐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, mov.id, true, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pagination,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "Anterior"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active}`,
                                    children: "1"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "Próximo"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CashierDetails;
}}),
"[project]/src/pages/cashierPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetails$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/cashier/cashierDetails.tsx [ssr] (ecmascript)");
;
;
;
;
;
const CashierPage = ()=>{
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        status: "Todos os status",
        data: "2025-06-10",
        responsavel: ""
    });
    const [modalAberto, setModalAberto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [caixaSelecionado, setCaixaSelecionado] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const caixasData = [
        {
            id: 1,
            dataAbertura: "2025-06-10",
            horaAbertura: "08:00",
            responsavel: "João Silva",
            status: "ABERTO",
            entradas: "R$ 2.450,00",
            saidas: "R$ 150,00",
            saldo: "R$ 2.300,00",
            statusColor: "success"
        },
        {
            id: 2,
            dataAbertura: "2025-06-09",
            horaAbertura: "09:30",
            responsavel: "Maria Santos",
            status: "ABERTO",
            entradas: "R$ 950,00",
            saidas: "R$ 0,00",
            saldo: "R$ 950,00",
            statusColor: "success"
        },
        {
            id: 3,
            dataAbertura: "2025-06-09",
            horaAbertura: "08:00 - 18:00",
            responsavel: "Carlos Oliveira",
            status: "FECHADO",
            entradas: "R$ 3.200,00",
            saidas: "R$ 300,00",
            saldoFinal: "R$ 2.900,00",
            fechadoEm: "2025-06-09 18:00",
            statusColor: "danger"
        }
    ];
    const StatusBadge = ({ status, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"][color]}`,
            children: status
        }, void 0, false, {
            fileName: "[project]/src/pages/cashierPage.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, this);
    const abrirModal = (caixa)=>{
        setCaixaSelecionado(caixa);
        setModalAberto(true);
    };
    const CaixaCard = ({ caixa })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].circleBox} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fineTransparentBorder} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mb4} ${caixa.status === "ABERTO" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].borderLeftSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].borderLeftDanger}`,
            onClick: ()=>abrirModal(caixa),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemsStart} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mb3}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Data de Abertura"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 76,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.dataAbertura
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 77,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 75,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Hora de Abertura"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 80,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.horaAbertura
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 79,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatusBadge, {
                            status: caixa.status,
                            color: caixa.statusColor
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 83,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 72,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mb3,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                            children: "Responsável"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textPrimary,
                            children: caixa.responsavel
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 88,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].gridCols3} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mb3}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Entradas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 95,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.entradas
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 96,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 94,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Saídas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 99,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textDanger,
                                    children: caixa.saidas
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 100,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 98,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: caixa.status === "ABERTO" ? "Saldo" : "Saldo Final"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 103,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textAccent,
                                    children: caixa.status === "ABERTO" ? caixa.saldo : caixa.saldoFinal
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 106,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 102,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 91,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/cashierPage.tsx",
            lineNumber: 62,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mb6}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageTitle,
                                children: "☐ Gerenciamento de Caixas"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageSubtitle,
                                children: "Visualize e gerencie todos os caixas da loja"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBox,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusIcon,
                                children: "☐"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusLabel,
                                children: "Caixas Ativos"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusValue,
                                children: "2"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterContainer} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].quartenary}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: filters.status,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                status: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Todos os status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "ABERTO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "FECHADO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Data"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: filters.data,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                data: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Responsável"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Nome do responsável",
                                        value: filters.responsavel,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                responsavel: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filterActions,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/cashierPage.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        "Filtrar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    "Abrir Novo Caixa"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnSecondary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    "Limpar Filtros"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caixasGrid,
                children: caixasData.map((caixa)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CaixaCard, {
                        caixa: caixa
                    }, caixa.id, false, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            modalAberto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetails$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                caixa: caixaSelecionado,
                fecharModal: ()=>setModalAberto(false)
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/cashierPage.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CashierPage;
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "hasA11yProp": (()=>hasA11yProp),
    "mergeClasses": (()=>mergeClasses),
    "toCamelCase": (()=>toCamelCase),
    "toKebabCase": (()=>toKebabCase),
    "toPascalCase": (()=>toPascalCase)
});
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>defaultAttributes)
});
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/Icon.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>Icon)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [ssr] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>createLucideIcon)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/Icon.js [ssr] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Search)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Search": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Plus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "M12 5v14",
            key: "s699le"
        }
    ]
];
const Plus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])("plus", __iconNode);
;
 //# sourceMappingURL=plus.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript) <export default as Plus>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Plus": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Funnel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
            key: "sc7q7i"
        }
    ]
];
const Funnel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])("funnel", __iconNode);
;
 //# sourceMappingURL=funnel.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [ssr] (ecmascript) <export default as Filter>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Filter": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [ssr] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>X)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "X": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript)");
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/cashierPage.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "getServerSideProps": (()=>getServerSideProps),
    "getStaticPaths": (()=>getStaticPaths),
    "getStaticProps": (()=>getStaticProps),
    "reportWebVitals": (()=>reportWebVitals),
    "routeModule": (()=>routeModule),
    "unstable_getServerProps": (()=>unstable_getServerProps),
    "unstable_getServerSideProps": (()=>unstable_getServerSideProps),
    "unstable_getStaticParams": (()=>unstable_getStaticParams),
    "unstable_getStaticPaths": (()=>unstable_getStaticPaths),
    "unstable_getStaticProps": (()=>unstable_getStaticProps)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)");
// Import the app and document modules.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/document.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$_app$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/_app.tsx [ssr] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/cashierPage.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$_app$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$_app$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'default');
const getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticProps');
const getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticPaths');
const getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getServerSideProps');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'config');
const reportWebVitals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'reportWebVitals');
const unstable_getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticProps');
const unstable_getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticPaths');
const unstable_getStaticParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticParams');
const unstable_getServerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerProps');
const unstable_getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerSideProps');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PagesRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RouteKind"].PAGES,
        page: "/cashierPage",
        pathname: "/cashierPage",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    components: {
        // default export might not exist when optimized for data only
        App: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$_app$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        Document: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$cashierPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=_b87d8b53._.js.map