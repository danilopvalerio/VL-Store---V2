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
"[project]/src/pages/accountPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
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
const AccountPage = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [storeData, setStoreData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        nome: "",
        senha: "",
        email: "",
        cpf_cnpj_proprietario_loja: "",
        data_nasc_proprietario: "",
        telefone: "",
        id_loja: ""
    });
    const [originalData, setOriginalData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
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
    const getStore = async ()=>{
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const userData = localStorage.getItem("userData");
            if (!jwtToken || !userData) {
                console.error("Usuário não autenticado.");
                return;
            }
            const { id_loja } = JSON.parse(userData);
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get(`http://localhost:9700/api/lojas/${id_loja}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                timeout: 2000
            });
            localStorage.setItem("selectedStore", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            alert("Erro desconhecido, tente novamente mais tarde.");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loadStoreData = async ()=>{
            const storeResponse = await getStore();
            if (storeResponse && storeResponse.data) {
                const data = storeResponse.data;
                const parsed = {
                    nome: data.nome || "",
                    senha: data.senha || "",
                    email: data.email || "",
                    cpf_cnpj_proprietario_loja: data.cpf_cnpj_proprietario_loja || "",
                    data_nasc_proprietario: data.data_nasc_proprietario || "",
                    telefone: data.telefone || "",
                    id_loja: data.id_loja || ""
                };
                setStoreData(parsed);
                setOriginalData(parsed);
            } else {
                const cachedStore = localStorage.getItem("selectedStore");
                if (cachedStore) {
                    try {
                        const parsedCachedStore = JSON.parse(cachedStore);
                        if (parsedCachedStore.data) {
                            const data = parsedCachedStore.data;
                            const parsed = {
                                nome: data.nome || "",
                                senha: data.senha || "",
                                email: data.email || "",
                                cpf_cnpj_proprietario_loja: data.cpf_cnpj_proprietario_loja || "",
                                data_nasc_proprietario: data.data_nasc_proprietario || "",
                                telefone: data.telefone || "",
                                id_loja: data.id_loja || ""
                            };
                            setStoreData(parsed);
                            setOriginalData(parsed);
                        }
                    } catch (parseError) {
                        console.error("Erro ao parsear dados da loja do localStorage:", parseError);
                        setError("Erro ao carregar dados armazenados da loja.");
                    }
                }
            }
        };
        loadStoreData();
    }, []);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setStoreData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const hasStoreDataChanged = ()=>{
        if (!originalData) return false;
        return JSON.stringify(originalData) !== JSON.stringify(storeData);
    };
    const saveChanges = async ()=>{
        try {
            setIsSaving(true);
            // Extrai senha e pega o resto dos dados
            const { senha, ...dataWithoutPassword } = storeData;
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].patch(`http://localhost:9700/api/lojas/${storeData.id_loja}`, dataWithoutPassword, {
                headers: getAuthHeaders()
            });
            localStorage.setItem("userData", JSON.stringify(storeData));
            setOriginalData(storeData);
        } catch (err) {
            console.error("Erro ao salvar loja:", err);
            setError("Erro ao salvar loja");
            setTimeout(()=>setError(""), 3000);
        } finally{
            setIsSaving(false);
        }
    };
    const handleBackClick = async ()=>{
        if (hasStoreDataChanged()) {
            await saveChanges();
        }
        router.push("/menuPage");
    };
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const deleteStore = async ()=>{
        try {
            setIsDeleting(true);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].delete(`http://localhost:9700/api/lojas/${storeData.id_loja}`, {
                headers: getAuthHeaders()
            });
            // Limpa o localStorage ao deletar a conta
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userData");
            localStorage.removeItem("selectedStore");
            router.push("/initialPage"); // redireciona para a página inicial
        } catch (err) {
            console.error("Erro ao deletar loja:", err);
            setError("Erro ao deletar loja");
            setTimeout(()=>setError(""), 3000);
        } finally{
            setIsDeleting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-center align-items-center w-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "product-page d-flex justify-content-center align-items-center terciary p-4 flex-column rounded-5 white-light",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    className: "col-12 text-center",
                    children: "Editar Loja"
                }, void 0, false, {
                    fileName: "[project]/src/pages/accountPage.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-danger col-12 text-center mt-2",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/pages/accountPage.tsx",
                    lineNumber: 199,
                    columnNumber: 11
                }, this),
                isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-info col-12 text-center mt-2",
                    children: "Salvando dados..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/accountPage.tsx",
                    lineNumber: 205,
                    columnNumber: 11
                }, this),
                isDeleting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-info col-12 text-center mt-2",
                    children: "Deletando conta..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/accountPage.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    className: "row w-100 justify-content-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-12 w-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "row product-info w-100 d-flex justify-content-between align-items-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "mx-auto col-12 p-4 info-base row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                                            className: "text-center mb-2",
                                            children: "Informações gerais"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "product-label",
                                            children: "Nome da loja:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "mb-3 produto-input",
                                            name: "nome",
                                            placeholder: "Nome",
                                            value: storeData.nome,
                                            onChange: handleChange,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "product-label",
                                            children: "CPF/CNPJ*:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "mb-3 produto-input",
                                            name: "cpf_cnpj_proprietario_loja",
                                            placeholder: "Digite o CPF ou CNPJ",
                                            value: storeData.cpf_cnpj_proprietario_loja,
                                            onChange: handleChange,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "product-label",
                                            children: "Email:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "mb-3 produto-input",
                                            name: "email",
                                            placeholder: "Digite o email",
                                            value: storeData.email,
                                            onChange: handleChange,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "product-label",
                                            children: "Telefone:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "mb-3 produto-input",
                                            name: "telefone",
                                            placeholder: "Ex: (99) 99999-9999",
                                            value: storeData.telefone,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/accountPage.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/accountPage.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/accountPage.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/accountPage.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-between w-100 mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: handleBackClick,
                                    disabled: isSaving,
                                    children: "Voltar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/accountPage.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "down-btn btn col-12 col-md-3 primaria",
                                    onClick: deleteStore,
                                    children: "Deletar Loja"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/accountPage.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/accountPage.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/accountPage.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/accountPage.tsx",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/accountPage.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AccountPage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fe8a26fe._.js.map