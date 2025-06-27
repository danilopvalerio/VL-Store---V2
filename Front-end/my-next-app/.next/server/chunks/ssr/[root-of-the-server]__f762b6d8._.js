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
"[project]/src/pages/AddProductPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
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
const AddProduct = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [productData, setProductData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        referencia: "",
        nome: "",
        categoria: "",
        material: "",
        genero: ""
    });
    const [variations, setVariations] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            descricao_variacao: "",
            quant_variacao: 0,
            valor: 0
        }
    ]);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const jwtToken = localStorage.getItem("jwtToken");
        const userData = localStorage.getItem("userData");
        if (!jwtToken || !userData) {
            router.push("/initialPage");
            return;
        }
    }, []);
    const pushBackToProducts = ()=>{
        router.push("/productsPage");
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setProductData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleVariationChange = (index, e)=>{
        const { name, value } = e.target;
        const updatedVariations = [
            ...variations
        ];
        updatedVariations[index] = {
            ...updatedVariations[index],
            [name]: name === "quant_variacao" || name === "valor" ? Number(value) : value
        };
        setVariations(updatedVariations);
    };
    const addVariation = ()=>{
        setVariations([
            ...variations,
            {
                descricao_variacao: "",
                quant_variacao: 0,
                valor: 0
            }
        ]);
    };
    const removeVariation = (index)=>{
        if (variations.length <= 1) return;
        const updatedVariations = [
            ...variations
        ];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        const jwtToken = localStorage.getItem("jwtToken");
        const userData = localStorage.getItem("userData");
        if (!productData.referencia || !productData.nome || !productData.categoria || !productData.material || !productData.genero || variations.some((v)=>!v.descricao_variacao || v.quant_variacao <= 0 || v.valor <= 0)) {
            setError("Preencha todos os campos obrigatórios corretamente.");
            setLoading(false);
            // Limpa erro depois de 3 segundos
            setTimeout(()=>setError(""), 3000);
            return;
        }
        if (!jwtToken || !userData) {
            router.push("/initialPage");
            return;
        }
        try {
            const parsedData = JSON.parse(userData);
            const idLoja = parsedData.id_loja;
            const payload = {
                ...productData,
                id_loja: idLoja,
                variacoes: variations.map((variation)=>({
                        ...variation,
                        valor: Number(variation.valor)
                    }))
            };
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post("http://localhost:9700/api/produtos", payload, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                },
                timeout: 5000
            });
            if (response.status === 201) {
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                    pushBackToProducts();
                }, 3000);
            }
        } catch (error) {
            setError(`Erro ao adicionar produto. ${error.response.data.message}.`);
            setTimeout(()=>setError(""), 3000);
        } finally{
            setLoading(false);
        }
    };
    const clearForm = ()=>{
        setProductData({
            referencia: "",
            nome: "",
            categoria: "",
            material: "",
            genero: ""
        });
        setVariations([
            {
                descricao_variacao: "",
                quant_variacao: 0,
                valor: 0
            }
        ]);
        setError("");
        setSuccess(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-center align-items-center w-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    className: "col-12 text-center",
                    children: "Adicionar Novo Produto"
                }, void 0, false, {
                    fileName: "[project]/src/pages/AddProductPage.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-success col-12 text-center mt-2",
                    children: "Produto cadastrado com sucesso! Redirecionando..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/AddProductPage.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-danger col-12 text-center mt-2",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/pages/AddProductPage.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
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
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Referência*:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 183,
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
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Nome do Produto*:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 193,
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
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Categoria*:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 203,
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
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Material*:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 213,
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
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "product-label",
                                                children: "Gênero:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                className: "mb-3 produto-input",
                                                name: "genero",
                                                placeholder: "Ex: Masculino",
                                                value: productData.genero,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/AddProductPage.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "col-12 w-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                                className: "text-center mb-4",
                                                children: "Variações*:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 234,
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
                                                                    children: "Descrição*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 242,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: Tamanho GG - Azul",
                                                                    name: "descricao_variacao",
                                                                    value: variation.descricao_variacao,
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    required: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/AddProductPage.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "col-6 col-md-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "col-12 m-2 text-center",
                                                                    children: "Quantidade*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: 10",
                                                                    name: "quant_variacao",
                                                                    value: variation.quant_variacao || "",
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    required: true,
                                                                    min: "0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/AddProductPage.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "col-6 col-md-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "col-12 m-2 text-center",
                                                                    children: "Valor* (R$)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    className: "col-12 produto-input",
                                                                    placeholder: "Ex: 79.90",
                                                                    name: "valor",
                                                                    step: "0.01",
                                                                    value: variation.valor || "",
                                                                    onChange: (e)=>handleVariationChange(index, e),
                                                                    required: true,
                                                                    min: "0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                                    lineNumber: 270,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/AddProductPage.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "col-12 col-md-1 mt-4 btn-delete rounded-5",
                                                            onClick: ()=>removeVariation(index),
                                                            disabled: variations.length <= 1,
                                                            children: "X"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/AddProductPage.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "down-btn btn col-12 col-md-3 primaria",
                                                onClick: addVariation,
                                                children: "Adicionar Variação"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/AddProductPage.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/AddProductPage.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/AddProductPage.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-between w-100 mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: clearForm,
                                    children: "Limpar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: pushBackToProducts,
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    disabled: loading,
                                    children: loading ? "Salvando..." : "Salvar Produto"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/AddProductPage.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/AddProductPage.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/AddProductPage.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/AddProductPage.tsx",
            lineNumber: 159,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/AddProductPage.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AddProduct;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f762b6d8._.js.map