module.exports = {

"[project]/src/ui/styles/ProductsPage.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "actionButton": "ProductsPage-module__qQmgQq__actionButton",
  "actions": "ProductsPage-module__qQmgQq__actions",
  "backButton": "ProductsPage-module__qQmgQq__backButton",
  "button-base": "ProductsPage-module__qQmgQq__button-base",
  "button-primary": "ProductsPage-module__qQmgQq__button-primary",
  "button-secondary": "ProductsPage-module__qQmgQq__button-secondary",
  "formAddProduct": "ProductsPage-module__qQmgQq__formAddProduct",
  "header": "ProductsPage-module__qQmgQq__header",
  "logo": "ProductsPage-module__qQmgQq__logo",
  "mainContent": "ProductsPage-module__qQmgQq__mainContent",
  "pagination": "ProductsPage-module__qQmgQq__pagination",
  "paginationButton": "ProductsPage-module__qQmgQq__paginationButton",
  "productContainer": "ProductsPage-module__qQmgQq__productContainer",
  "productPage": "ProductsPage-module__qQmgQq__productPage",
  "searchInput": "ProductsPage-module__qQmgQq__searchInput",
  "title": "ProductsPage-module__qQmgQq__title",
});
}}),
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
"[project]/src/pages/productsPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/ProductsPage.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/products/AddProductComponent.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
const ProductPage = ()=>{
    const router = useRouter();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].productPage,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo,
                        children: "V"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/productsPage.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].backButton,
                        onClick: ()=>router.push("/menu"),
                        children: "Voltar"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/productsPage.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/productsPage.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mainContent,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].productContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: "Produtos"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/productsPage.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actions,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                                    placeholder: "Digite o produto..."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actionButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-base"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-primary"]}`,
                                    children: "Pesquisar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actionButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-base"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-secondary"]}`,
                                    children: "Limpar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$products$2f$AddProductComponent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/productsPage.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pagination,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paginationButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-base"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-secondary"]}`,
                                    children: "Anterior"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paginationButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-base"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$ProductsPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]["button-secondary"]}`,
                                    children: "Próxima"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/productsPage.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/productsPage.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/productsPage.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/productsPage.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/productsPage.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ProductPage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/productsPage.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/productsPage.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'default');
const getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticProps');
const getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticPaths');
const getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getServerSideProps');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'config');
const reportWebVitals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'reportWebVitals');
const unstable_getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticProps');
const unstable_getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticPaths');
const unstable_getStaticParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticParams');
const unstable_getServerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerProps');
const unstable_getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerSideProps');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PagesRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RouteKind"].PAGES,
        page: "/productsPage",
        pathname: "/productsPage",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    components: {
        // default export might not exist when optimized for data only
        App: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$_app$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        Document: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$productsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__44752064._.js.map