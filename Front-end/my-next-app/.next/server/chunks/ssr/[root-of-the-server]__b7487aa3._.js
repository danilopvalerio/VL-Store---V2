module.exports = {

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
    // --- LÓGICA DO VALOR TOTAL (COMPLETA) ---
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
    // --- LÓGICA DE ADICIONAR AO CARRINHO (COMPLETA) ---
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
    // --- LÓGICA DE REMOVER DO CARRINHO (COMPLETA) ---
    const handleRemoverProdutoDoCarrinho = (idVariacao)=>{
        setCarrinhoVenda(carrinhoVenda.filter((item)=>item.id_variacao !== idVariacao));
    };
    // --- LÓGICA DO INPUT NUMÉRICO (COMPLETA) ---
    const handleNumericInputChange = (setter, value)=>{
        const sanitizedValue = value.replace(/[^0-9,.]/g, "").replace(",", ".");
        if (sanitizedValue.split(".").length > 2) {
            return;
        }
        setter(sanitizedValue);
    };
    // --- LÓGICA DE RESETAR O FORMULÁRIO (COMPLETA) ---
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
    // --- LÓGICA DE SUBMISSÃO DA VENDA (JÁ ESTAVA COMPLETA) ---
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
        className: "terciary p-4 rounded-20px small-shadow d-flex flex-column h-100",
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
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        "Registrar Nova Venda"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 214,
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
                                            lineNumber: 227,
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
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                            className: "form-text text-white-50",
                                            children: "Gerado automaticamente."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 226,
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
                                            lineNumber: 245,
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
                                                    lineNumber: 258,
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
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 225,
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
                                            lineNumber: 276,
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
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 275,
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
                                            lineNumber: 292,
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
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "DINHEIRO",
                                                    className: "text-black",
                                                    children: "Dinheiro"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "CARTAO_CREDITO",
                                                    className: "text-black",
                                                    children: "Cartão de Crédito"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "CARTAO_DEBITO",
                                                    className: "text-black",
                                                    children: "Cartão de Débito"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "PIX",
                                                    className: "text-black",
                                                    children: "PIX"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h6", {
                            className: "mb-3 text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: "fas fa-shopping-basket mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this),
                                "Produtos da Venda"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "row align-items-end mb-3",
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
                                            lineNumber: 330,
                                            columnNumber: 15
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
                                                    lineNumber: 342,
                                                    columnNumber: 17
                                                }, this),
                                                produtosDisponiveis.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: p.id_variacao,
                                                        className: "text-black",
                                                        children: [
                                                            p.produto.nome,
                                                            " (REF: ",
                                                            p.produto.referencia,
                                                            ") -",
                                                            " ",
                                                            p.descricao_variacao
                                                        ]
                                                    }, p.id_variacao, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 336,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
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
                                            lineNumber: 358,
                                            columnNumber: 15
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
                                            lineNumber: 364,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
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
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "precoUnitario",
                                            value: precoUnitario ? `R$ ${precoUnitario}` : "",
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 382,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn btn-block primaria",
                                        style: {
                                            height: "38px",
                                            marginTop: "6px"
                                        },
                                        onClick: handleAdicionarProdutoVenda,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                className: "fas fa-plus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            "Adicionar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            id: "listaProdutosVenda",
                            className: "mb-4 table-responsive quartenary p-2 rounded-lg",
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
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Qtd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Preço Un."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Ação"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 408,
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
                                                lineNumber: 420,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 419,
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
                                                                lineNumber: 433,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: item.quantidade
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            item.precoUnitario.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            subtotalItem.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 437,
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
                                                                lineNumber: 447,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, item.id_variacao, true, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 428,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 417,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 402,
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
                                            lineNumber: 460,
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
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 459,
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
                                            lineNumber: 478,
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
                                            lineNumber: 484,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 458,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 220,
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
                                    lineNumber: 506,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 504,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 503,
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
                                lineNumber: 516,
                                columnNumber: 11
                            }, this),
                            "Finalizar Venda"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
        lineNumber: 213,
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
const SalesDetail = ({ show, onClose, sale })=>{
    if (!show || !sale) {
        return null;
    }
    const subtotalProdutos = sale.produtos.reduce((sum, item)=>sum + item.quantidade * item.precoUnitario, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "modal fade show",
        style: {
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        tabIndex: "-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "modal-dialog modal-lg modal-dialog-centered",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "modal-content rounded-8px",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "modal-header bg-info text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                className: "modal-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                        className: "fas fa-file-invoice-dollar mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 13,
                                        columnNumber: 41
                                    }, this),
                                    "Detalhes da Venda - ",
                                    sale.codigoVenda
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 13,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "close text-white",
                                onClick: onClose,
                                "aria-label": "Close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 14,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "modal-body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Código da Venda:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 19,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    sale.codigoVenda
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Data e Hora:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 20,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    sale.data
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Vendedor:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 21,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    sale.vendedor
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Forma de Pagamento:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 22,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    sale.pagamento
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {}, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h6", {
                                children: "Produtos:"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                className: "table table-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Produto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                    lineNumber: 28,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Referência"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                    lineNumber: 29,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Quantidade"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                    lineNumber: 30,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Valor Unitário"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                    lineNumber: 31,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                    lineNumber: 32,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 27,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 26,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: sale.produtos.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: item.nome
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                        lineNumber: 38,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: item.referencia
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                        lineNumber: 39,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: item.quantidade
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                        lineNumber: 40,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            item.precoUnitario.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                        lineNumber: 41,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            (item.quantidade * item.precoUnitario).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                        lineNumber: 42,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                                lineNumber: 37,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {}, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Subtotal Produtos:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 48,
                                        columnNumber: 16
                                    }, this),
                                    " R$ ",
                                    subtotalProdutos.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Desconto:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 49,
                                        columnNumber: 16
                                    }, this),
                                    " R$ ",
                                    sale.desconto.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Acréscimo:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 50,
                                        columnNumber: 16
                                    }, this),
                                    " R$ ",
                                    sale.acrescimo.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "Valor Total:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 51,
                                        columnNumber: 40
                                    }, this),
                                    " R$ ",
                                    sale.total.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "modal-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-secondary rounded-20px",
                                onClick: onClose,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                        className: "fas fa-times mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    "Fechar"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-primary rounded-20px",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                        className: "fas fa-print mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    "Imprimir Recibo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = SalesDetail;
}}),
"[project]/src/ui/components/sales/salesListComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesDetailComponent.tsx [ssr] (ecmascript)");
;
;
;
const ITEMS_PER_PAGE = 3;
const SalesList = ({ salesData })=>{
    const initialSales = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>[
            {
                codigoVenda: "VENDA-00122",
                data: "2025-06-03T10:30",
                vendedor: "João Silva",
                vendedorId: "1",
                valorTotal: 129.89,
                pagamento: "Cartão de Crédito",
                produtos: [
                    {
                        id: "101",
                        nome: "Camiseta Básica P",
                        referencia: "CB001",
                        quantidade: 1,
                        precoUnitario: 49.99
                    },
                    {
                        id: "102",
                        nome: "Calça Jeans Slim M",
                        referencia: "CJ002",
                        quantidade: 1,
                        precoUnitario: 79.90
                    }
                ],
                desconto: 0,
                acrescimo: 0
            },
            {
                codigoVenda: "VENDA-00121",
                data: "2025-06-02T15:45",
                vendedor: "Maria Oliveira",
                vendedorId: "2",
                valorTotal: 79.90,
                pagamento: "PIX",
                produtos: [
                    {
                        id: "102",
                        nome: "Calça Jeans Slim M",
                        referencia: "CJ002",
                        quantidade: 1,
                        precoUnitario: 79.90
                    }
                ],
                desconto: 0,
                acrescimo: 0
            },
            {
                codigoVenda: "VENDA-00120",
                data: "2025-06-01T09:12",
                vendedor: "João Silva",
                vendedorId: "1",
                valorTotal: 49.99,
                pagamento: "Dinheiro",
                produtos: [
                    {
                        id: "101",
                        nome: "Camiseta Básica P",
                        referencia: "CB001",
                        quantidade: 1,
                        precoUnitario: 49.99
                    }
                ],
                desconto: 0,
                acrescimo: 0
            },
            {
                codigoVenda: "VENDA-00119",
                data: "2025-05-30T14:00",
                vendedor: "João Silva",
                vendedorId: "1",
                valorTotal: 120.50,
                pagamento: "Cartão de Débito",
                produtos: [
                    {
                        id: "103",
                        nome: "Tênis Esportivo 40",
                        referencia: "TE003",
                        quantidade: 1,
                        precoUnitario: 120.50
                    }
                ],
                desconto: 0,
                acrescimo: 0
            },
            {
                codigoVenda: "VENDA-00118",
                data: "2025-05-29T11:20",
                vendedor: "Maria Oliveira",
                vendedorId: "2",
                valorTotal: 170.49,
                pagamento: "PIX",
                produtos: [
                    {
                        id: "101",
                        nome: "Camiseta Básica P",
                        referencia: "CB001",
                        quantidade: 1,
                        precoUnitario: 49.99
                    },
                    {
                        id: "103",
                        nome: "Tênis Esportivo 40",
                        referencia: "TE003",
                        quantidade: 1,
                        precoUnitario: 120.50
                    }
                ],
                desconto: 0,
                acrescimo: 0
            }
        ], []);
    const [allSales, setAllSales] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        ...initialSales
    ]);
    const [selectedSale, setSelectedSale] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [filterDate, setFilterDate] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [filterVendedor, setFilterVendedor] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [filterPagamento, setFilterPagamento] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setAllSales((prevSales)=>{
            const newSalesToAdd = salesData.filter((newSale)=>!prevSales.some((s)=>s.codigoVenda === newSale.codigoVenda));
            return [
                ...newSalesToAdd,
                ...prevSales
            ].sort((a, b)=>new Date(b.data).getTime() - new Date(a.data).getTime());
        });
    }, [
        salesData
    ]);
    const filteredSales = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        return allSales.filter((sale)=>{
            const saleDate = sale.data.substring(0, 10);
            const matchDate = filterDate ? saleDate === filterDate : true;
            const matchVendedor = filterVendedor ? sale.vendedorId === filterVendedor || sale.vendedor === filterVendedor : true;
            const matchPagamento = filterPagamento ? sale.pagamento === filterPagamento : true;
            return matchDate && matchVendedor && matchPagamento;
        });
    }, [
        allSales,
        filterDate,
        filterVendedor,
        filterPagamento
    ]);
    const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);
    const paginatedSales = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredSales.slice(startIndex, endIndex);
    }, [
        filteredSales,
        currentPage
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setCurrentPage(1);
    }, [
        filterDate,
        filterVendedor,
        filterPagamento
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
    const handleApplyFilters = (e)=>{
        e.preventDefault();
        setCurrentPage(1);
    };
    const uniqueVendedores = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const vendedores = new Map();
        allSales.forEach((sale)=>{
            if (sale.vendedorId && !vendedores.has(sale.vendedorId)) {
                vendedores.set(sale.vendedorId, sale.vendedor);
            } else if (!sale.vendedorId && !Array.from(vendedores.values()).includes(sale.vendedor)) {
                vendedores.set(sale.vendedor, sale.vendedor);
            }
        });
        return Array.from(vendedores.entries()).map(([id, nome])=>({
                id,
                nome
            }));
    }, [
        allSales
    ]);
    const uniquePagamentos = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const pagamentos = new Set();
        allSales.forEach((sale)=>pagamentos.add(sale.pagamento));
        return Array.from(pagamentos);
    }, [
        allSales
    ]);
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
                            lineNumber: 122,
                            columnNumber: 41
                        }, this),
                        "Vendas Registradas"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "row mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-md-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "date",
                            className: "form-control input-form",
                            id: "filtroData",
                            placeholder: "mm/dd/yyyy",
                            value: filterDate,
                            onChange: (e)=>setFilterDate(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-md-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            id: "filtroVendedor",
                            className: "form-control custom-select input-form",
                            value: filterVendedor,
                            onChange: (e)=>setFilterVendedor(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    className: "text-gray-500",
                                    children: "Vendedor..."
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                uniqueVendedores.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: v.id,
                                        className: "text-black",
                                        children: v.nome
                                    }, v.id, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-md-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            id: "filtroPagamento",
                            className: "form-control custom-select input-form",
                            value: filterPagamento,
                            onChange: (e)=>setFilterPagamento(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    className: "text-gray-500",
                                    children: "Pagamento..."
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                uniquePagamentos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: p,
                                        className: "text-black",
                                        children: p
                                    }, p, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-md-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "btn primaria btn-block",
                            onClick: (e)=>{
                                e.preventDefault();
                                setCurrentPage(1);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: "fas fa-filter mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                "Filtrar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
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
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "small font-weight-bold",
                                        children: "Data"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "small font-weight-bold",
                                        children: "Vendedor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "small font-weight-bold",
                                        children: "Valor Total"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "small font-weight-bold",
                                        children: "Pagamento"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "small font-weight-bold text-center",
                                        children: "Ações"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                            children: paginatedSales.length > 0 ? paginatedSales.map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                    className: "fine-transparent-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            className: "font-weight-medium",
                                            children: sale.codigoVenda
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: new Date(sale.data).toLocaleString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: sale.vendedor
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            className: "font-weight-medium",
                                            children: [
                                                "R$ ",
                                                sale.valorTotal.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: sale.pagamento
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
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
                                                            backgroundColor: '#17a2b8',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '0.375rem 0.5rem',
                                                            borderRadius: '50%',
                                                            width: '32px',
                                                            height: '32px',
                                                            marginRight: '4px'
                                                        },
                                                        title: "Visualizar",
                                                        onClick: ()=>openModalWithSale(sale),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-eye"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn btn-sm",
                                                        style: {
                                                            backgroundColor: '#ffc107',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '0.375rem 0.5rem',
                                                            borderRadius: '50%',
                                                            width: '32px',
                                                            height: '32px',
                                                            marginRight: '4px'
                                                        },
                                                        title: "Editar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn btn-sm",
                                                        style: {
                                                            backgroundColor: '#dc3545',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '0.375rem 0.5rem',
                                                            borderRadius: '50%',
                                                            width: '32px',
                                                            height: '32px'
                                                        },
                                                        title: "Excluir",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-trash"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, sale.codigoVenda, true, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    colSpan: 6,
                                    className: "text-center py-4 text-white-75",
                                    children: "Nenhuma venda encontrada com os filtros aplicados."
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 254,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                lineNumber: 253,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                "aria-label": "Navegação de páginas",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "d-flex justify-content-center align-items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: `btn primaria px-4 py-2 ${currentPage === 1 ? 'btn-secondary' : 'btn-outline-light'}`,
                            onClick: ()=>handlePageChange(currentPage - 1),
                            disabled: currentPage === 1,
                            style: {
                                minWidth: '80px'
                            },
                            children: "Anterior"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        Array.from({
                            length: totalPages
                        }, (_, i)=>i + 1).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `btn primaria px-4 py-2 ${currentPage === page ? 'primaria' : 'btn-outline-light'}`,
                                onClick: ()=>handlePageChange(page),
                                style: {
                                    minWidth: '40px',
                                    fontWeight: currentPage === page ? 'bold' : 'normal'
                                },
                                children: page
                            }, page, false, {
                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                lineNumber: 274,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: `btn primaria px-4 py-2 ${currentPage === totalPages ? 'btn-secondary' : 'btn-outline-light'}`,
                            onClick: ()=>handlePageChange(currentPage + 1),
                            disabled: currentPage === totalPages,
                            style: {
                                minWidth: '80px'
                            },
                            children: "Próxima"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this),
            selectedSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: isModalOpen,
                onClose: closeModal,
                sale: selectedSale
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 300,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = SalesList;
}}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesFormComponent.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesListComponent.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
function SalesPage() {
    // ... (mantenha os estados existentes até loading e error)
    // Estado simplificado para controle de visualização
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // ... (mantenha o useEffect, showCustomMessage, handleNewSaleRegistered, pushBackToMenu)
    // Funções mais claras para controle de visualização
    const openForm = ()=>setCurrentView("form");
    const openList = ()=>setCurrentView("list");
    const closeView = ()=>setCurrentView(null);
    // Determina o texto dos botões baseado no estado atual
    const getFormButtonText = ()=>currentView === "form" ? "Fechar Formulário" : "Adicionar Venda";
    const getListButtonText = ()=>currentView === "list" ? "Fechar Lista" : "Listar Vendas";
    // Estilo condicional para os botões ativos
    const getButtonClass = (buttonView)=>`btn ${currentView === buttonView ? "primaria" : "secundaria"} px-4 py-2`;
    // ... (mantenha o jwtToken)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center flex-column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Registro de Vendas - VL Store"
                }, void 0, false, {
                    fileName: "[project]/src/pages/salesPage.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 39,
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
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        className: "img logo",
                        src: "/vl-store-logo-white.svg",
                        alt: "VL Store Logo"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "container-fluid px-6 pt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "row mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col d-flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: getButtonClass("form"),
                                    onClick: ()=>currentView === "form" ? closeView() : openForm(),
                                    children: getFormButtonText()
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: getButtonClass("list"),
                                    onClick: ()=>currentView === "list" ? closeView() : openList(),
                                    children: getListButtonText()
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/salesPage.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-white",
                        children: "Carregando dados..."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-danger",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 82,
                        columnNumber: 19
                    }, this),
                    !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            currentView === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "col-lg-5 mb-4 mb-lg-0 d-flex flex-column",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onSaleRegistered: handleNewSaleRegistered,
                                    showMessage: showCustomMessage,
                                    vendedoresDisponiveis: vendedoresDisponiveis,
                                    produtosDisponiveis: produtosDisponiveis,
                                    jwtToken: jwtToken || undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            currentView === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: currentView === "form" ? "col-lg-7" : "col-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    salesData: registeredSales
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/salesPage.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b7487aa3._.js.map