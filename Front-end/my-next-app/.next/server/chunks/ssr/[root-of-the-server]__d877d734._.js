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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
const ProductDetail = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isViewOnly, setIsViewOnly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
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
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
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
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        const userDataStr = localStorage.getItem("userData");
        if (!jwtToken || !userDataStr) {
            router.push("/initialPage");
            return;
        }
        const userData = JSON.parse(userDataStr);
        console.log(userData);
        if (userData.role == "funcionario") {
            setIsViewOnly(true);
        }
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
    const handleVariationBlur = async (index)=>{
        const variation = variations[index];
        const valorNumerico = parseFloat(variation.valor.toString().replace(",", ".")) || 0;
        const hasValidData = variation.descricao_variacao.trim() !== "" && valorNumerico > 0;
        if (variation.id_variacao) {
            try {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch(`http://localhost:9700/api/produtos/variacoes/${variation.id_variacao}`, {
                    valor: valorNumerico
                }, {
                    headers: getAuthHeaders()
                });
                const updated = [
                    ...variations
                ];
                updated[index].valor = valorNumerico;
                setVariations(updated);
            } catch (err) {
                console.error("Erro ao atualizar valor:", err);
                setError("Erro ao atualizar valor");
                setTimeout(()=>setError(""), 3000);
            }
        } else if (hasValidData) {
            try {
                const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post(`http://localhost:9700/api/produtos/referencia/${productData.referencia}/loja/${productData.id_loja}/variacoes`, {
                    descricao_variacao: variation.descricao_variacao,
                    quant_variacao: variation.quant_variacao,
                    valor: valorNumerico
                }, {
                    headers: getAuthHeaders()
                });
                const updated = [
                    ...variations
                ];
                updated[index] = {
                    ...variation,
                    id_variacao: response.data.id_variacao,
                    valor: valorNumerico
                };
                setVariations(updated);
            } catch (err) {
                console.error("Erro ao criar variação:", err);
                setError("Erro ao criar variação");
                setTimeout(()=>setError(""), 3000);
            }
        }
    };
    const handleVariationChange = (index, e)=>{
        const { name, value } = e.target;
        const updated = [
            ...variations
        ];
        updated[index] = {
            ...updated[index],
            [name]: name === "valor" ? value : name === "descricao_variacao" ? value : parseFloat(value) || 0
        };
        setVariations(updated);
        if (name !== "valor") {
            const variation = updated[index];
            if (variation.id_variacao) {
                const url = `http://localhost:9700/api/produtos/variacoes/${variation.id_variacao}`;
                __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch(url, {
                    [name]: variation[name]
                }, {
                    headers: getAuthHeaders()
                }).catch((err)=>{
                    console.error("Erro ao atualizar variação:", err);
                    setError("Erro ao atualizar variação");
                    setTimeout(()=>setError(""), 3000);
                });
            }
        }
    };
    const addVariation = ()=>{
        const newVariation = {
            descricao_variacao: "",
            quant_variacao: 0,
            valor: 0
        };
        console.log("Adicionando variação local:", newVariation);
        setVariations([
            ...variations,
            newVariation
        ]);
    };
    const removeVariation = async (index)=>{
        const variation = variations[index];
        if (variation.id_variacao) {
            try {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete(`http://localhost:9700/api/produtos/variacoes/${variation.id_variacao}`, {
                    headers: getAuthHeaders()
                });
            } catch (err) {
                console.error("Erro ao excluir variação:", err);
                setError("Erro ao excluir variação");
                setTimeout(()=>setError(""), 3000);
                return;
            }
        }
        const updated = [
            ...variations
        ];
        updated.splice(index, 1);
        setVariations(updated);
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
                    lineNumber: 242,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-danger col-12 text-center mt-2",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/pages/productDetail.tsx",
                    lineNumber: 245,
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
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Referência:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "referencia",
                                                placeholder: "Ex: REF0008",
                                                value: productData.referencia,
                                                readOnly: true,
                                                style: {
                                                    backgroundColor: "#f8f9fa",
                                                    cursor: "not-allowed"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Nome do Produto:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "nome",
                                                placeholder: "Ex: Camiseta Polo Levi's",
                                                value: productData.nome,
                                                onChange: handleChange,
                                                required: true,
                                                disabled: isViewOnly
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Categoria:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 278,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "categoria",
                                                placeholder: "Ex: Roupas",
                                                value: productData.categoria,
                                                onChange: handleChange,
                                                required: true,
                                                disabled: isViewOnly
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Material:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "material",
                                                placeholder: "Ex: Algodão",
                                                value: productData.material,
                                                onChange: handleChange,
                                                required: true,
                                                disabled: isViewOnly
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Gênero:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "genero",
                                                placeholder: "Ex: Masculino",
                                                value: productData.genero,
                                                onChange: handleChange,
                                                disabled: isViewOnly
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 301,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productDetail.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "col-12 w-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                                className: "text-center mb-4",
                                                children: "Variações:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this),
                                            variations.map((variation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                                    className: "p-1 mx-auto variacao row align-items-center pb-4 justify-content-evenly mb-2 w-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "col-12 col-md-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "col-12 mt-2 text-center",
                                                                    children: "Descrição"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 320,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: Tamanho GG - Azul",
                                                                    name: "descricao_variacao",
                                                                    value: variation.descricao_variacao,
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    disabled: isViewOnly
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 321,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/productDetail.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "col-6 col-md-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "col-12 m-2 text-center",
                                                                    children: "Quantidade"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: 10",
                                                                    name: "quant_variacao",
                                                                    value: variation.quant_variacao || "",
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    min: "0",
                                                                    disabled: isViewOnly
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 334,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/productDetail.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "col-6 col-md-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "col-12 m-2 text-center",
                                                                    children: "Valor (R$)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: 79.90",
                                                                    name: "valor",
                                                                    value: variation.valor || "",
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    onBlur: ()=>handleVariationBlur(index),
                                                                    disabled: isViewOnly
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/productDetail.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "col-12 col-md-1 mt-4 btn-delete rounded-5",
                                                            onClick: ()=>removeVariation(index),
                                                            disabled: variations.length <= 1 || isViewOnly,
                                                            children: "X"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/productDetail.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/pages/productDetail.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "down-btn btn col-12 col-md-3 primaria",
                                                onClick: addVariation,
                                                disabled: isViewOnly,
                                                children: "Adicionar Variação"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productDetail.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productDetail.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/productDetail.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/productDetail.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-between w-100 mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: ()=>{
                                        setTimeout(()=>{
                                            router.push("/productsPage");
                                        }, 1000);
                                    },
                                    children: "Voltar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productDetail.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: deleteProduct,
                                    disabled: isViewOnly,
                                    children: "Deletar Produto"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productDetail.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/productDetail.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/productDetail.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/productDetail.tsx",
            lineNumber: 241,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/productDetail.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ProductDetail;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d877d734._.js.map