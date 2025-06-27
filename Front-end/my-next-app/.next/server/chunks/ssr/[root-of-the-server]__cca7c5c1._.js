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
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

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
"[project]/src/ui/components/products/Variations.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// components/Variations.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const Variations = ({ variations, id_loja, referencia, onVariationsChange, setError })=>{
    const getAuthHeaders = ()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        return {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
        };
    };
    const handleVariationChange = async (index, e)=>{
        const { name, value } = e.target;
        const newValue = name === "quant_variacao" || name === "valor" ? Number(value) : value;
        const updatedVariations = [
            ...variations
        ];
        updatedVariations[index] = {
            ...updatedVariations[index],
            [name]: newValue
        };
        onVariationsChange(updatedVariations);
        const variation = updatedVariations[index];
        try {
            if (variation.id_variacao) {
                // Atualizar variação existente
                await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch(`http://localhost:9700/api/produtos/variacao/${variation.id_variacao}`, {
                    [name]: newValue
                }, {
                    headers: getAuthHeaders()
                });
            } else {
                // Criar nova variação
                const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post(`http://localhost:9700/api/produtos/variacao/loja/${id_loja}/referencia/${referencia}`, variation, {
                    headers: getAuthHeaders()
                });
                // Atualiza o ID da variação no estado
                updatedVariations[index].id_variacao = response.data.data.id_variacao;
                onVariationsChange(updatedVariations);
            }
        } catch (err) {
            console.error("Erro ao atualizar variação:", err);
            setError("Erro ao atualizar variação");
            setTimeout(()=>setError(""), 3000);
        }
    };
    const addVariation = ()=>{
        onVariationsChange([
            ...variations,
            {
                descricao_variacao: "",
                quant_variacao: 0,
                valor: 0
            }
        ]);
    };
    const removeVariation = async (index)=>{
        if (variations.length <= 1) return;
        const variationToRemove = variations[index];
        const updatedVariations = [
            ...variations
        ];
        updatedVariations.splice(index, 1);
        onVariationsChange(updatedVariations);
        if (variationToRemove.id_variacao) {
            try {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete(`http://localhost:9700/api/produtos/variacao/${variationToRemove.id_variacao}`, {
                    headers: getAuthHeaders()
                });
            } catch (err) {
                console.error("Erro ao remover variação:", err);
                setError("Erro ao remover variação");
                setTimeout(()=>setError(""), 3000);
                // Reverte a remoção se der erro
                onVariationsChange(variations);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "col-12 w-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                className: "text-center mb-4",
                children: "Variações*:"
            }, void 0, false, {
                fileName: "[project]/src/ui/components/products/Variations.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            variations.map((variation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                    className: "p-1 mx-auto variacao row align-items-center pb-4 justify-content-evenly mb-2 w-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-12 col-md-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "col-12 mt-2 text-center",
                                    children: "Descrição*"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: "col-12 produto-input",
                                    placeholder: "Ex: Tamanho GG - Azul",
                                    name: "descricao_variacao",
                                    value: variation.descricao_variacao,
                                    onChange: (e)=>handleVariationChange(index, e)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/products/Variations.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-6 col-md-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "col-12 m-2 text-center",
                                    children: "Quantidade*"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    className: "col-12 produto-input",
                                    placeholder: "Ex: 10",
                                    name: "quant_variacao",
                                    value: variation.quant_variacao || "",
                                    onChange: (e)=>handleVariationChange(index, e),
                                    min: "0"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/products/Variations.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-6 col-md-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "col-12 m-2 text-center",
                                    children: "Valor* (R$)"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    className: "col-12 produto-input",
                                    placeholder: "Ex: 79.90",
                                    name: "valor",
                                    step: "0.01",
                                    value: variation.valor || "",
                                    onChange: (e)=>handleVariationChange(index, e),
                                    min: "0"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/products/Variations.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "col-12 col-md-1 mt-4 btn-delete rounded-5",
                            onClick: ()=>removeVariation(index),
                            disabled: variations.length <= 1,
                            children: "X"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/products/Variations.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/ui/components/products/Variations.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                className: "down-btn btn col-12 col-md-3 primaria",
                onClick: addVariation,
                children: "Adicionar Variação"
            }, void 0, false, {
                fileName: "[project]/src/ui/components/products/Variations.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/products/Variations.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Variations;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/productDetail.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$Variations$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/products/Variations.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$Variations$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$Variations$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
const productDetail = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [productData, setProductData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        referencia: "",
        nome: "",
        categoria: "",
        material: "",
        genero: "",
        id_loja: ""
    });
    const [variations, setVariations] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            descricao_variacao: "",
            quant_variacao: 0,
            valor: 0
        }
    ]);
    // Carrega os dados iniciais
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const produto = localStorage.getItem("selectedProduct");
        if (produto) {
            const produtoObj = JSON.parse(produto);
            const data = produtoObj.data;
            setProductData({
                referencia: data.referencia || "",
                nome: data.nome || "",
                categoria: data.categoria || "",
                material: data.material || "",
                genero: data.genero || "",
                id_loja: data.id_loja
            });
            setVariations(data.variacoes?.length > 0 ? data.variacoes.map((v)=>({
                    id_variacao: v.id_variacao,
                    descricao_variacao: v.descricao_variacao || "",
                    quant_variacao: v.quant_variacao || 0,
                    valor: v.valor || 0
                })) : [
                {
                    descricao_variacao: "",
                    quant_variacao: 0,
                    valor: 0
                }
            ]);
        }
    }, []);
    // Verifica autenticação
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        const userData = localStorage.getItem("userData");
        if (!jwtToken || !userData) router.push("/initialPage");
    }, []);
    const getAuthHeaders = ()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        return {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
        };
    };
    const handleChange = async (e)=>{
        const { name, value } = e.target;
        const newData = {
            ...productData,
            [name]: value
        };
        setProductData(newData);
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch(`http://localhost:9700/api/produtos/loja/${newData.id_loja}/referencia/${newData.referencia}`, {
                [name]: value
            }, {
                headers: getAuthHeaders()
            });
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            setError("Erro ao atualizar produto");
            setTimeout(()=>setError(""), 3000);
        }
    };
    const deleteProduct = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete(`http://localhost:9700/api/produtos/loja/${productData.id_loja}/referencia/${productData.referencia}`, {
                headers: getAuthHeaders()
            });
            router.push("/productsPage");
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            setError("Erro ao deletar produto");
            setTimeout(()=>setError(""), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-center align-items-center w-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    className: "col-12 text-center",
                    children: "Editar Produto"
                }, void 0, false, {
                    fileName: "[project]/src/pages/productDetail.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-danger col-12 text-center mt-2",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/pages/productDetail.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    className: "row w-100 justify-content-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-12 w-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "row product-info w-100 d-flex justify-content-between align-items-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mx-auto col-12 p-4 info-base row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                                className: "text-center mb-2",
                                                children: "Informações gerais"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Referência:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "referencia",
                                                placeholder: "Ex: REF0008",
                                                value: productData.referencia,
                                                onChange: handleChange,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Nome do Produto:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "nome",
                                                placeholder: "Ex: Camiseta Polo Levi's",
                                                value: productData.nome,
                                                onChange: handleChange,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Categoria:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "categoria",
                                                placeholder: "Ex: Roupas",
                                                value: productData.categoria,
                                                onChange: handleChange,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Material:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "material",
                                                placeholder: "Ex: Algodão",
                                                value: productData.material,
                                                onChange: handleChange,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Gênero:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "genero",
                                                placeholder: "Ex: Masculino",
                                                value: productData.genero,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productDetail.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$Variations$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variations: variations,
                                        id_loja: productData.id_loja,
                                        referencia: productData.referencia,
                                        onVariationsChange: setVariations,
                                        setError: setError
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productDetail.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/productDetail.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/productDetail.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-between w-100 mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: ()=>router.push("/productsPage"),
                                    children: "Voltar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productDetail.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: deleteProduct,
                                    children: "Deletar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productDetail.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/productDetail.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/productDetail.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/productDetail.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/productDetail.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = productDetail;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__cca7c5c1._.js.map