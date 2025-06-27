module.exports = {

"[project]/src/ui/styles/AddProductComponent.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "addProductContainer": "AddProductComponent-module__BnmCha__addProductContainer",
  "addVariationButton": "AddProductComponent-module__BnmCha__addVariationButton",
  "removeVariationButton": "AddProductComponent-module__BnmCha__removeVariationButton",
  "searchInput": "AddProductComponent-module__BnmCha__searchInput",
  "submitProductButton": "AddProductComponent-module__BnmCha__submitProductButton",
  "toggleFormButton": "AddProductComponent-module__BnmCha__toggleFormButton",
  "variationGroup": "AddProductComponent-module__BnmCha__variationGroup",
  "variationsSection": "AddProductComponent-module__BnmCha__variationsSection",
  "variationsTitle": "AddProductComponent-module__BnmCha__variationsTitle",
});
}}),
"[externals]/axios [external] (axios, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/ui/components/products/AddProductComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/AddProductComponent.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const AddProduct = ()=>{
    const [formOpen, setFormOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
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
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setProductData((prevData)=>({
                ...prevData,
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
        const updatedVariations = [
            ...variations
        ];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const orderPayload = {
            ...productData,
            id_loja: "2e8bb522-62d1-4578-b402-c12f98c0d64a",
            variacoes: variations
        };
        try {
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post("/api/produtos", orderPayload);
            console.log("Produto criado:", response.data);
            setFormOpen(false);
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
        } catch (err) {
            console.error("Erro ao criar produto:", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].addProductContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].toggleFormButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-base']} ${formOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-secondary'] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-primary']}`,
                onClick: ()=>setFormOpen(!formOpen),
                children: formOpen ? "Cancelar" : "Adicionar Produto"
            }, void 0, false, {
                fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            formOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formAddProduct,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "referencia",
                        placeholder: "Referência",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                        value: productData.referencia,
                        onChange: handleChange,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "nome",
                        placeholder: "Nome do Produto",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                        value: productData.nome,
                        onChange: handleChange,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "categoria",
                        placeholder: "Categoria",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                        value: productData.categoria,
                        onChange: handleChange,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "material",
                        placeholder: "Material",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                        value: productData.material,
                        onChange: handleChange,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "genero",
                        placeholder: "Gênero (opcional)",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                        value: productData.genero,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variationsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variationsTitle,
                                children: "Variações"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            variations.map((variation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variationGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            name: "descricao_variacao",
                                            placeholder: "Descrição (Ex: Cor, Tamanho)",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                                            value: variation.descricao_variacao,
                                            onChange: (e)=>handleVariationChange(index, e),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            name: "quant_variacao",
                                            type: "number",
                                            placeholder: "Quantidade",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                                            value: variation.quant_variacao,
                                            onChange: (e)=>handleVariationChange(index, e),
                                            required: true,
                                            min: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            name: "valor",
                                            type: "number",
                                            placeholder: "Valor (R$)",
                                            step: "0.01",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                                            value: variation.valor,
                                            onChange: (e)=>handleVariationChange(index, e),
                                            required: true,
                                            min: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this),
                                        variations.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].removeVariationButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-base']} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-secondary']}`,
                                            onClick: ()=>removeVariation(index),
                                            children: "Remover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].addVariationButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-base']} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-secondary']}`,
                                onClick: addVariation,
                                children: "Adicionar Variação"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitProductButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-base']} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$AddProductComponent$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['button-primary']}`,
                        children: "Salvar Produto"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/products/AddProductComponent.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AddProduct;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/src/pages/productsPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/products/AddProductComponent.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const ProductPage = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center flex-column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "d-flex justify-content-between align-items-center flex-column",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "header-panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                id: "menu-page-return",
                                className: "btn primaria position-fixed top-0 end-0 m-2 shadow",
                                onClick: ()=>{
                                    router.push("/menuPage");
                                },
                                children: "Voltar"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                className: "img logo",
                                src: "/vl-store-logo-white.svg"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/productsPage.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mx-auto product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "text-center mb-4",
                                children: "Produtos"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "row w-100 justify-content-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "p-0 col-12 col-md-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input-form primaria w-100",
                                            type: "text",
                                            placeholder: "Digite o produto..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/productsPage.tsx",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 27,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn primaria col-12 col-md-3 mt-2",
                                        children: "Pesquisar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn primaria col-12 col-md-3 mt-2",
                                        children: "Limpar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn primaria col-12 col-md-3 mt-2",
                                        children: "Adicionar produto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "row w-100 gap-3 mt-4 justify-content-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "col-12 col-md-3 product-card rounded-5 p-3 d-flex justify-content-center flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 card-title text-center",
                                                children: "Quadrinho Turma da Mônica"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 47,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Categoria: Vestuário"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Material: Papel reciclado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Preço: R$ 29,90"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                id: "product-detail",
                                                className: "btn primaria w-100 mt-2",
                                                children: "Detalhes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "col-12 col-md-3 product-card rounded-5 p-3 d-flex justify-content-center flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 card-title text-center",
                                                children: "Camiseta Básica Branca"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Categoria: Vestuário"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 64,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Material: Algodão"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Preço: R$ 49,90"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                id: "product-detail",
                                                className: "btn primaria w-100 mt-2",
                                                children: "Detalhes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 67,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "col-12 col-md-3 product-card rounded-5 p-3 d-flex justify-content-center flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 card-title text-center",
                                                children: "Caneta Esferográfica Azul"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Categoria: Papelaria"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 76,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Material: Plástico"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "card-title text-center",
                                                children: "Preço: R$ 2,50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                id: "product-detail",
                                                className: "btn primaria w-100 mt-2",
                                                children: "Detalhes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/productsPage.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "row w-100 gap-3 justify-content-center mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn col-3 primaria btn-paginacao",
                                        children: "Anterior"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn col-3 primaria btn-paginacao",
                                        children: "Próxima"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/productsPage.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/productsPage.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/productsPage.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/productsPage.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/productsPage.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/productsPage.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ProductPage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4c6286cc._.js.map