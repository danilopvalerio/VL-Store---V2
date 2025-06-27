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
"[externals]/axios [external] (axios, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/ui/components/sales/salesFormComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
const SalesForm = ({ onSaleRegistered, showMessage, jwtToken, vendedoresDisponiveis, produtosDisponiveis })=>{
    // Hooks de estado
    const [codigoVenda, setCodigoVenda] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [vendedorResponsavelId, setVendedorResponsavelId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [dataVenda, setDataVenda] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [formaPagamento, setFormaPagamento] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [produtoSelecionadoId, setProdutoSelecionadoId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [quantidadeProduto, setQuantidadeProduto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [precoUnitario, setPrecoUnitario] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [carrinhoVenda, setCarrinhoVenda] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [descontoVenda, setDescontoVenda] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("0.00");
    const [acrescimoVenda, setAcrescimoVenda] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("0.00");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const generateSaleCode = ()=>`VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
        setCodigoVenda(generateSaleCode());
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setDataVenda(now.toISOString().slice(0, 16));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (produtoSelecionadoId) {
            const produto = produtosDisponiveis.find((p)=>p.id_variacao === produtoSelecionadoId);
            if (produto && typeof produto.preco_venda === "number") {
                setPrecoUnitario(produto.preco_venda.toFixed(2));
            }
        } else {
            setPrecoUnitario("");
        }
    }, [
        produtoSelecionadoId,
        produtosDisponiveis
    ]);
    const valorTotalVenda = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const subtotalProdutos = carrinhoVenda.reduce((sum, item)=>sum + item.quantidade * item.precoUnitario, 0);
        const descontoNum = parseFloat(descontoVenda.replace(",", ".")) || 0;
        const acrescimoNum = parseFloat(acrescimoVenda.replace(",", ".")) || 0;
        return subtotalProdutos - descontoNum + acrescimoNum;
    }, [
        carrinhoVenda,
        descontoVenda,
        acrescimoVenda
    ]);
    const handleAdicionarProdutoVenda = ()=>{
        if (!produtoSelecionadoId) {
            showMessage("Selecione um produto para adicionar.", "warning");
            return;
        }
        const produto = produtosDisponiveis.find((p)=>p.id_variacao === produtoSelecionadoId);
        if (!produto) return;
        const itemExistente = carrinhoVenda.find((item)=>item.id_variacao === produtoSelecionadoId);
        if (itemExistente) {
            setCarrinhoVenda(carrinhoVenda.map((item)=>item.id_variacao === produtoSelecionadoId ? {
                    ...item,
                    quantidade: item.quantidade + quantidadeProduto
                } : item));
        } else {
            const novoItem = {
                id_variacao: produto.id_variacao,
                nome: produto.produto.nome,
                referencia: produto.produto.referencia,
                descricao_variacao: produto.descricao_variacao,
                quantidade: quantidadeProduto,
                precoUnitario: produto.preco_venda
            };
            setCarrinhoVenda([
                ...carrinhoVenda,
                novoItem
            ]);
        }
        setProdutoSelecionadoId("");
        setQuantidadeProduto(1);
        setPrecoUnitario("");
    };
    const handleRemoverProdutoDoCarrinho = (idVariacao)=>{
        setCarrinhoVenda(carrinhoVenda.filter((item)=>item.id_variacao !== idVariacao));
    };
    const handleNumericInputChange = (setter, value)=>{
        const sanitizedValue = value.replace(/[^0-9,.]/g, "").replace(",", ".");
        if (sanitizedValue.split(".").length > 2) {
            return;
        }
        setter(sanitizedValue);
    };
    const resetForm = ()=>{
        const generateSaleCode = ()=>`VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
        setCodigoVenda(generateSaleCode());
        setVendedorResponsavelId("");
        setFormaPagamento("");
        setCarrinhoVenda([]);
        setDescontoVenda("0.00");
        setAcrescimoVenda("0.00");
        setProdutoSelecionadoId("");
        setQuantidadeProduto(1);
    };
    const handleSubmitVenda = async (event)=>{
        event.preventDefault();
        if (!vendedorResponsavelId || !formaPagamento || carrinhoVenda.length === 0) {
            showMessage("Preencha todos os campos obrigatórios.", "warning");
            return;
        }
        const payload = {
            id_funcionario: vendedorResponsavelId,
            forma_pagamento: formaPagamento,
            itens: carrinhoVenda.map((item)=>({
                    id_variacao: item.id_variacao,
                    quantidade: item.quantidade,
                    preco_unitario: item.precoUnitario
                })),
            desconto: parseFloat(descontoVenda.replace(",", ".")) || 0,
            acrescimo: parseFloat(acrescimoVenda.replace(",", ".")) || 0
        };
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post("http://localhost:9700/api/vendas", payload, config);
            if (response.data?.success) {
                showMessage("Venda registrada com sucesso!", "success");
                onSaleRegistered(response.data.data);
                resetForm();
            }
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
            const backendMessage = error.response?.data?.message || "Ocorreu um erro desconhecido.";
            showMessage(`Erro: ${backendMessage}`, "danger");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "terciary mx-auto p-4 rounded-5 white-light-small d-flex flex-column h-100 w-75",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                    className: "mb-0 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                            className: "fas fa-plus-circle mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        "Registrar Nova Venda"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-grow-1",
                style: {
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    id: "sales-form-content",
                    onSubmit: handleSubmitVenda,
                    noValidate: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "row mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "codigoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Código da Venda"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "codigoVenda",
                                            value: codigoVenda,
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                            className: "form-text text-white-50",
                                            children: "Gerado automaticamente."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "vendedorResponsavel",
                                            className: "form-label text-white-75 small",
                                            children: "Vendedor Responsável"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "vendedorResponsavel",
                                            className: "form-control custom-select input-form",
                                            value: vendedorResponsavelId,
                                            onChange: (e)=>setVendedorResponsavelId(e.target.value),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    className: "text-gray-500",
                                                    children: "Selecione..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                vendedoresDisponiveis.map((vendedor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: vendedor.id_funcionario,
                                                        className: "text-black",
                                                        children: [
                                                            vendedor.nome,
                                                            " ",
                                                            vendedor.cargo ? `(${vendedor.cargo})` : ""
                                                        ]
                                                    }, vendedor.id_funcionario, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "row mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "dataVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Data e Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "datetime-local",
                                            className: "form-control input-form",
                                            id: "dataVenda",
                                            value: dataVenda,
                                            onChange: (e)=>setDataVenda(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "formaPagamento",
                                            className: "form-label text-white-75 small",
                                            children: "Forma de Pagamento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "formaPagamento",
                                            className: "form-control custom-select input-form",
                                            value: formaPagamento,
                                            onChange: (e)=>setFormaPagamento(e.target.value),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    className: "text-gray-500",
                                                    children: "Selecione..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "DINHEIRO",
                                                    className: "text-black",
                                                    children: "Dinheiro"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "CARTAO_CREDITO",
                                                    className: "text-black",
                                                    children: "Cartão de Crédito"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "CARTAO_DEBITO",
                                                    className: "text-black",
                                                    children: "Cartão de Débito"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "PIX",
                                                    className: "text-black",
                                                    children: "PIX"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 291,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h6", {
                            className: "mb-3 text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: "fas fa-shopping-basket mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                "Produtos da Venda"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "row mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "produtoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Produto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 323,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "produtoVenda",
                                            className: "form-control custom-select input-form",
                                            value: produtoSelecionadoId,
                                            onChange: (e)=>setProdutoSelecionadoId(e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    className: "text-gray-500",
                                                    children: "Selecione..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 7
                                                }, this),
                                                produtosDisponiveis.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: p.id_variacao,
                                                        className: "text-black",
                                                        children: [
                                                            p.produto.nome,
                                                            " (REF: ",
                                                            p.produto.referencia,
                                                            ") - ",
                                                            p.descricao_variacao
                                                        ]
                                                    }, p.id_variacao, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 9
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 326,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 322,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "quantidadeProduto",
                                            className: "form-label text-white-75 small",
                                            children: "Quantidade"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 348,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "form-control input-form",
                                            id: "quantidadeProduto",
                                            value: quantidadeProduto,
                                            onChange: (e)=>setQuantidadeProduto(parseInt(e.target.value, 10) || 1),
                                            min: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 351,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 347,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "precoUnitario",
                                            className: "form-label text-white-75 small",
                                            children: "Preço Un."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 362,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "precoUnitario",
                                            value: precoUnitario ? `R$ ${precoUnitario}` : "",
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 365,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 361,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-2 d-flex align-items-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn btn-block primaria w-100",
                                        onClick: handleAdicionarProdutoVenda,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                className: "fas fa-plus me-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 380,
                                                columnNumber: 7
                                            }, this),
                                            "Adicionar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 375,
                                        columnNumber: 5
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 374,
                                    columnNumber: 3
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            id: "listaProdutosVenda",
                            className: "mb-4 table-responsive p-2 rounded-lg",
                            style: {
                                maxHeight: "200px",
                                overflowY: "auto"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                className: "table table-sm table-borderless text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            className: "fine-transparent-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Produto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Qtd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Preço Un."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Ação"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 391,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: carrinhoVenda.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                className: "text-center py-3 text-white-75",
                                                children: "Nenhum produto adicionado."
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 402,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 401,
                                            columnNumber: 19
                                        }, this) : carrinhoVenda.map((item)=>{
                                            const subtotalItem = item.quantidade * item.precoUnitario;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                className: "fine-transparent-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            item.nome,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                                children: [
                                                                    "(",
                                                                    item.descricao_variacao,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 414,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: item.quantidade
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            item.precoUnitario.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            subtotalItem.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 419,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn btn-delete",
                                                            onClick: ()=>handleRemoverProdutoDoCarrinho(item.id_variacao),
                                                            title: "Remover",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-trash-alt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, item.id_variacao, true, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 410,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "row mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "descontoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Desconto (R$)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 442,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "descontoVenda",
                                            placeholder: "0.00",
                                            value: descontoVenda,
                                            onChange: (e)=>handleNumericInputChange(setDescontoVenda, e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 448,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "acrescimoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Acréscimo (R$)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "acrescimoVenda",
                                            placeholder: "0.00",
                                            value: acrescimoVenda,
                                            onChange: (e)=>handleNumericInputChange(setAcrescimoVenda, e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 459,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 440,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-3 d-flex justify-content-between align-items-center border-top",
                style: {
                    borderColor: "rgba(255,255,255,0.1)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                            className: "text-white mb-0",
                            children: [
                                "Total:",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "font-weight-bold",
                                    style: {
                                        color: "#86efac"
                                    },
                                    children: [
                                        "R$ ",
                                        valorTotalVenda.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 488,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "submit",
                        form: "sales-form-content",
                        className: "btn primaria px-4 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                className: "fas fa-check-circle mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 498,
                                columnNumber: 11
                            }, this),
                            "Finalizar Venda"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = SalesForm;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/ui/components/sales/salesDetailComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const formatCurrency = (value)=>`R$ ${Number(value || 0).toFixed(2)}`;
const ModalHeader = ({ title, onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center p-3 fine-transparent-border-bottom",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                className: "modal-title text-white mb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                        className: "fas fa-file-invoice-dollar mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 8,
                        columnNumber: 7
                    }, this),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                className: "close text-white",
                onClick: onClose,
                "aria-label": "Close",
                style: {
                    fontSize: '1.5rem',
                    background: 'none',
                    border: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    "aria-hidden": "true",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                    lineNumber: 11,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, this);
const SaleInfo = ({ sale })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-3 text-white-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Código da Venda:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 18,
                        columnNumber: 8
                    }, this),
                    " ",
                    sale.id_venda
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Data e Hora:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 19,
                        columnNumber: 8
                    }, this),
                    " ",
                    sale.data_hora
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Vendedor:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 20,
                        columnNumber: 8
                    }, this),
                    " ",
                    sale.funcionario.nome
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "mb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Forma de Pagamento:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 21,
                        columnNumber: 25
                    }, this),
                    " ",
                    sale.forma_pagamento
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, this);
const ProductsTable = ({ products })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h6", {
                className: "text-white",
                children: "Produtos:"
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "table-responsive",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                    className: "table table-borderless text-white-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                            className: "fine-transparent-border-bottom",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Produto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Referência"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Qtd."
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Valor Unit."
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                            lineNumber: 30,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                            children: (products || []).map((itens, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                    className: "fine-transparent-border-bottom",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: itens.nome
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: itens.variacao.referencia_produto
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: itens.quantidade
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: formatCurrency(itens.preco_unitario)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: formatCurrency(itens.quantidade * itens.preco_unitario)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                            lineNumber: 39,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                    lineNumber: 29,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, this);
const SaleSummary = ({ sale, subtotalProdutos })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-3 text-white-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Subtotal Produtos:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 57,
                        columnNumber: 8
                    }, this),
                    " ",
                    formatCurrency(subtotalProdutos)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 57,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Desconto:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 58,
                        columnNumber: 8
                    }, this),
                    " ",
                    formatCurrency(sale.desconto)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 58,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Acréscimo:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 59,
                        columnNumber: 8
                    }, this),
                    " ",
                    formatCurrency(sale.acrescimo)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                className: "text-right text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: "Valor Total:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 61,
                        columnNumber: 7
                    }, this),
                    " ",
                    formatCurrency(sale.total)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 56,
        columnNumber: 3
    }, this);
const ModalFooter = ({ onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-end p-3 fine-transparent-border-top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                className: "btn primaria mx-2 footerButton",
                onClick: onClose,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                        className: "fas fa-times mr-1"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 69,
                        columnNumber: 7
                    }, this),
                    "Editar"
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 68,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                className: "btn primaria mx-2 footerButton",
                onClick: onClose,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                        className: "fas fa-times mr-1"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 72,
                        columnNumber: 7
                    }, this),
                    "Fechar"
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 71,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 67,
        columnNumber: 3
    }, this);
const SalesDetail = ({ show, onClose, sale })=>{
    if (!show || !sale) {
        return null;
    }
    const subtotalProdutos = (sale.itens || []).reduce((sum, itens)=>sum + itens.quantidade * itens.preco_unitario, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "modal fade show",
        style: {
            display: 'block',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        tabIndex: "-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "modal-dialog modal-lg modal-dialog-centered",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "modal-content quinary small-shadow fine-transparent-border",
                style: {
                    borderRadius: '20px',
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModalHeader, {
                        title: `Detalhes da Venda - ${sale.id_venda}`,
                        onClose: onClose
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "modal-body p-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SaleInfo, {
                                sale: sale
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {
                                className: "m-0 fine-transparent-border"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProductsTable, {
                                products: sale.itens
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {
                                className: "m-0 fine-transparent-border"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SaleSummary, {
                                sale: sale,
                                subtotalProdutos: subtotalProdutos
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModalFooter, {
                        onClose: onClose
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = SalesDetail;
}}),
"[externals]/@fortawesome/react-fontawesome [external] (@fortawesome/react-fontawesome, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@fortawesome/react-fontawesome", () => require("@fortawesome/react-fontawesome"));

module.exports = mod;
}}),
"[externals]/@fortawesome/free-solid-svg-icons [external] (@fortawesome/free-solid-svg-icons, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@fortawesome/free-solid-svg-icons");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/ui/components/sales/salesListComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesDetailComponent.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$react$2d$fontawesome__$5b$external$5d$__$2840$fortawesome$2f$react$2d$fontawesome$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@fortawesome/react-fontawesome [external] (@fortawesome/react-fontawesome, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@fortawesome/free-solid-svg-icons [external] (@fortawesome/free-solid-svg-icons, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
const ITEMS_PER_PAGE = 5;
const SalesList = ({ salesData = [], idLoja })=>{
    const [allSales, setAllSales] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selectedSale, setSelectedSale] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    s;
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const jwtToken = localStorage.getItem("jwtToken");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const fetchSales = async ()=>{
            try {
                setLoading(true);
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get(`http://localhost:9700/api/vendas/loja/${idLoja}/paginado?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                if (response.data?.success) {
                    setAllSales(response.data.data || []);
                    setTotalPages(response.data.totalPages || 1);
                    console.log(response.data);
                }
            } catch (err) {
                console.error("Erro ao buscar vendas:", err);
                setError("Não foi possível carregar as vendas do servidor.");
            } finally{
                setLoading(false);
            }
        };
        fetchSales();
    }, [
        idLoja,
        currentPage,
        jwtToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (salesData && salesData.length > 0) {
            setAllSales((prevSales)=>{
                const newSalesToAdd = salesData.filter((newSale)=>!prevSales.some((s1)=>s1.id_venda === newSale.id_venda));
                return [
                    ...newSalesToAdd,
                    ...prevSales
                ];
            });
        }
    }, [
        salesData
    ]);
    const openModalWithSale = (sale)=>{
        setSelectedSale(sale);
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        setSelectedSale(null);
    };
    const handlePageChange = (page)=>{
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const deleteSale = async (saleId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete(`http://localhost:9700/api/vendas/${saleId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setAllSales((prevSales)=>prevSales.filter((sale)=>sale.id_venda !== saleId));
        } catch (err) {
            console.error("Erro ao deletar venda:", err);
            setError("Erro ao deletar venda");
            setTimeout(()=>setError(null), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "quinary p-4 rounded-20px small-shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                    className: "mb-0 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                            className: "fas fa-list-ul mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        "Vendas Registradas"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center text-white py-4",
                children: "Carregando vendas..."
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 135,
                columnNumber: 11
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center text-danger py-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 137,
                columnNumber: 19
            }, this),
            !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "table-responsive quartenary p-3 rounded-lg mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                            className: "table table-sm table-borderless text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                        className: "fine-transparent-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Cód. Venda"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 145,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Data"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 146,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Vendedor"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Valor Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 148,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Pagamento"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold text-center",
                                                children: "Ações"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 144,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                    children: allSales && allSales.length > 0 ? allSales.map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            className: "fine-transparent-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    className: "font-weight-medium",
                                                    children: sale.id_venda
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: new Date(sale.data_hora).toLocaleString("pt-BR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: sale.funcionario.nome
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    className: "font-weight-medium",
                                                    children: [
                                                        "R$ ",
                                                        parseFloat(sale.total).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: sale.forma_pagamento
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    className: "text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "btn-group",
                                                        role: "group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn btn-sm",
                                                                style: {
                                                                    backgroundColor: "#dc3545",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "0.375rem 0.5rem",
                                                                    borderRadius: "50%",
                                                                    width: "32px",
                                                                    height: "32px"
                                                                },
                                                                title: "Excluir",
                                                                onClick: ()=>deleteSale(sale.id_venda),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$react$2d$fontawesome__$5b$external$5d$__$2840$fortawesome$2f$react$2d$fontawesome$2c$__cjs$29$__["FontAwesomeIcon"], {
                                                                    icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faTrash"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                    lineNumber: 188,
                                                                    columnNumber: 30
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn btn-sm",
                                                                style: {
                                                                    backgroundColor: "#17a2b8",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "0.375rem 0.5rem",
                                                                    borderRadius: "50%",
                                                                    width: "32px",
                                                                    height: "32px"
                                                                },
                                                                title: "Visualizar",
                                                                onClick: ()=>openModalWithSale(sale),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$react$2d$fontawesome__$5b$external$5d$__$2840$fortawesome$2f$react$2d$fontawesome$2c$__cjs$29$__["FontAwesomeIcon"], {
                                                                    icon: __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faEye"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 30
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 30
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, sale.id_venda, true, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 156,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "text-center py-4 text-white-75",
                                            children: "Nenhuma venda encontrada."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 213,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 212,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 141,
                        columnNumber: 13
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        "aria-label": "Navegação de páginas",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-center align-items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2 ${currentPage === 1 ? "btn-secondary" : "btn-outline-light"}`,
                                    onClick: ()=>handlePageChange(currentPage - 1),
                                    disabled: currentPage === 1,
                                    style: {
                                        minWidth: "80px"
                                    },
                                    children: "Anterior"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 225,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "mx-3 text-white",
                                    children: [
                                        "Página ",
                                        currentPage,
                                        " de ",
                                        totalPages
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 236,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2 ${currentPage === totalPages ? "btn-secondary" : "btn-outline-light"}`,
                                    onClick: ()=>handlePageChange(currentPage + 1),
                                    disabled: currentPage === totalPages,
                                    style: {
                                        minWidth: "80px"
                                    },
                                    children: "Próxima"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 240,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 224,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 223,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true),
            selectedSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: isModalOpen,
                onClose: closeModal,
                sale: selectedSale
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 259,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
        lineNumber: 127,
        columnNumber: 7
    }, this);
};
const __TURBOPACK__default__export__ = SalesList;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/salesPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>SalesPage)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesFormComponent.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesListComponent.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
;
function SalesPage() {
    const [registeredSales, setRegisteredSales] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [produtosDisponiveis, setProdutosDisponiveis] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [vendedoresDisponiveis, setVendedoresDisponiveis] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [idloja, setIdloja] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        const userData = localStorage.getItem("userData");
        if (!jwtToken || !userData) {
            router.push("/initialPage");
            return;
        }
        const fetchData = async ()=>{
            try {
                setLoading(true);
                setError(null);
                const parsedData = JSON.parse(userData);
                const idLoja = parsedData.id_loja;
                setIdloja(idLoja);
                const config = {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                };
                const [vendedoresRes, produtosRes] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get(`http://localhost:9700/api/funcionarios/loja/${idLoja}`, config),
                    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get(`http://localhost:9700/api/produtos/loja/${idLoja}`, config)
                ]);
                if (vendedoresRes.data?.success) {
                    setVendedoresDisponiveis(vendedoresRes.data.data);
                }
                if (produtosRes.data?.success) {
                    const produtosDaApi = produtosRes.data.data;
                    const variacoesFormatadas = produtosDaApi.flatMap((produto)=>produto.variacoes.map((variacao)=>({
                                ...variacao,
                                preco_venda: parseFloat(variacao.valor),
                                produto: {
                                    nome: produto.nome,
                                    referencia: produto.referencia
                                }
                            })));
                    setProdutosDisponiveis(variacoesFormatadas);
                }
            } catch (err) {
                console.error("Erro ao buscar dados iniciais:", err);
                setError("Não foi possível carregar os dados do servidor.");
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [
        router
    ]);
    const showCustomMessage = (msg, type = "info")=>{
        alert(`[${type.toUpperCase()}] ${msg}`);
    };
    const handleNewSaleRegistered = (newSale)=>{
        setRegisteredSales((prevSales)=>[
                newSale,
                ...prevSales
            ]);
    };
    const pushBackToMenu = ()=>{
        router.push("menuPage");
    };
    const toggleView = (view)=>{
        setActiveView((current)=>current === view ? null : view);
    };
    const jwtToken = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center flex-column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Registro de Vendas - VL Store"
                }, void 0, false, {
                    fileName: "[project]/src/pages/salesPage.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "header-panel position-relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "btn primaria position-absolute top-0 end-0 px-3 py-1 shadow",
                        onClick: pushBackToMenu,
                        children: "Voltar"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        className: "img logo",
                        src: "/vl-store-logo-white.svg",
                        alt: "VL Store Logo"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "container-fluid px-6 pt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "row mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col d-flex gap-3 justify-content-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2`,
                                    onClick: ()=>toggleView("form"),
                                    children: activeView === "form" ? "Fechar Formulário" : "Adicionar Venda"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2`,
                                    onClick: ()=>toggleView("list"),
                                    children: activeView === "list" ? "Fechar Lista" : "Listar Vendas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/salesPage.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-white",
                        children: "Carregando dados..."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-danger",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 161,
                        columnNumber: 19
                    }, this),
                    !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            activeView === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onSaleRegistered: handleNewSaleRegistered,
                                    showMessage: showCustomMessage,
                                    vendedoresDisponiveis: vendedoresDisponiveis,
                                    produtosDisponiveis: produtosDisponiveis,
                                    jwtToken: jwtToken || undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this),
                            activeView === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    idLoja: idloja
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, this),
                            !activeView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "col-12 text-center py-5 text-center text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "",
                                    children: "Selecione uma opção acima para começar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/salesPage.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7fa0ae4d._.js.map