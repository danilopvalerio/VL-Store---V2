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
"[project]/src/styles/RegisterPage.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "btnPrimary": "RegisterPage-module__ypSeSW__btnPrimary",
  "btnSecondary": "RegisterPage-module__ypSeSW__btnSecondary",
  "column": "RegisterPage-module__ypSeSW__column",
  "container": "RegisterPage-module__ypSeSW__container",
  "formPanel": "RegisterPage-module__ypSeSW__formPanel",
  "headerPanel": "RegisterPage-module__ypSeSW__headerPanel",
  "loginBlock": "RegisterPage-module__ypSeSW__loginBlock",
  "logo": "RegisterPage-module__ypSeSW__logo",
  "logoLogin": "RegisterPage-module__ypSeSW__logoLogin",
  "welcomePanel": "RegisterPage-module__ypSeSW__welcomePanel",
});
}}),
"[externals]/react-imask [external] (react-imask, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("react-imask");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/utils/validationUtils.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "convertToISODate": (()=>convertToISODate),
    "extractDigitsOnly": (()=>extractDigitsOnly),
    "isValidCpfCnpj": (()=>isValidCpfCnpj),
    "isValidEmail": (()=>isValidEmail),
    "isValidPassword": (()=>isValidPassword)
});
const isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isValidCpfCnpj = (value)=>{
    const digitsOnly = value.replace(/\D/g, '');
    return digitsOnly.length === 11 || digitsOnly.length === 14;
};
const isValidPassword = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
const extractDigitsOnly = (value)=>{
    return value.replace(/\D/g, '');
};
const convertToISODate = (date)=>{
    const [day, month, year] = date.split('/');
    if (!day || !month || !year) {
        throw new Error('Data inválida');
    }
    return `${year}-${month}-${day}`;
};
}}),
"[project]/src/pages/RegisterPage.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/RegisterPage.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-imask [external] (react-imask, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validationUtils.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
;
const StoreRegistration = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [storeName, setStoreName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [cpfCnpj, setCpfCnpj] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [birthDate, setBirthDate] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [telephone, setTelephone] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleRegister = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        if (!storeName || !password || !email || !cpfCnpj || !birthDate || !telephone) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isValidEmail"])(email)) {
            setError('Formato de e-mail inválido.');
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isValidCpfCnpj"])(cpfCnpj)) {
            setError('CPF/CNPJ inválido. Deve conter 11 dígitos para CPF ou 14 para CNPJ.');
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isValidPassword"])(password)) {
            setError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            return;
        }
        const storeData = {
            nome: storeName,
            senha: password,
            email,
            cpf_cnpj_proprietario_loja: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["extractDigitsOnly"])(cpfCnpj),
            data_nasc_proprietario: new Date((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["convertToISODate"])(birthDate)).toISOString(),
            telefone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validationUtils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["extractDigitsOnly"])(telephone)
        };
        try {
            setLoading(true);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post("http://localhost:9700/api/lojas", storeData);
            setSuccess(true);
            setLoading(false);
            setTimeout(()=>{
                router.push('/authPage');
            }, 2000);
        } catch (error) {
            setLoading(false);
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setError('Dados inválidos. Verifique as informações fornecidas.');
                } else if (error.response.status === 409) {
                    setError('E-mail ou CPF/CNPJ já cadastrado.');
                } else {
                    setError(`Erro no cadastro: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
                }
            } else {
                setError('Erro de conexão. Verifique sua internet e tente novamente.');
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].headerPanel,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: "/vlStore.svg",
                    alt: "Logo",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo
                }, void 0, false, {
                    fileName: "[project]/src/pages/RegisterPage.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/RegisterPage.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loginBlock,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].column,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].welcomePanel,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                children: "Cadastro de Loja"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/RegisterPage.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/RegisterPage.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formPanel,
                            children: [
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "success-message",
                                    children: "Loja cadastrada com sucesso! Redirecionando para o login..."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "error-message",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                    onSubmit: handleRegister,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "storeName",
                                                    children: "Nome da loja"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    id: "storeName",
                                                    value: storeName,
                                                    onChange: (e)=>setStoreName(e.target.value),
                                                    disabled: loading,
                                                    className: "form-control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "email",
                                                    children: "E-mail"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    id: "email",
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    disabled: loading,
                                                    className: "form-control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "cpfCnpj",
                                                    children: "CPF/CNPJ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__["IMaskInput"], {
                                                    mask: [
                                                        {
                                                            mask: '000.000.000-00',
                                                            lazy: false
                                                        },
                                                        {
                                                            mask: '00.000.000/0000-00',
                                                            lazy: false
                                                        }
                                                    ],
                                                    id: "cpfCnpj",
                                                    value: cpfCnpj,
                                                    onAccept: (value)=>setCpfCnpj(value),
                                                    disabled: loading,
                                                    placeholder: "Digite o CPF ou CNPJ",
                                                    className: "form-control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "birthDate",
                                                    children: "Data de Nascimento"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__["IMaskInput"], {
                                                    mask: "00/00/0000",
                                                    placeholder: "dd/mm/aaaa",
                                                    className: "form-control",
                                                    id: "birthDate",
                                                    value: birthDate,
                                                    onAccept: (value)=>setBirthDate(value),
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "telephone",
                                                    children: "Telefone"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$imask__$5b$external$5d$__$28$react$2d$imask$2c$__esm_import$29$__["IMaskInput"], {
                                                    mask: "(00) 00000-0000",
                                                    id: "telephone",
                                                    value: telephone,
                                                    onAccept: (telephone)=>setTelephone(telephone),
                                                    className: "form-control",
                                                    placeholder: "Ex: (11) 99999-9999",
                                                    disabled: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "password",
                                                    children: "Senha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    id: "password",
                                                    value: password,
                                                    onChange: (e)=>setPassword(e.target.value),
                                                    disabled: loading,
                                                    className: "form-control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                    children: "Mínimo de 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "confirmPassword",
                                                    children: "Confirmar senha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    id: "confirmPassword",
                                                    value: confirmPassword,
                                                    onChange: (e)=>setConfirmPassword(e.target.value),
                                                    disabled: loading,
                                                    className: "form-control"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "form-buttons row",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: loading,
                                                className: `btn ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$RegisterPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary}`,
                                                children: loading ? 'Cadastrando...' : 'Cadastrar'
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/RegisterPage.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "login-link",
                                    children: [
                                        "Já tem uma conta? ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/authPage",
                                            children: "Faça login"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/RegisterPage.tsx",
                                            lineNumber: 239,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/RegisterPage.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/RegisterPage.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/RegisterPage.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/RegisterPage.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/RegisterPage.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = StoreRegistration;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f3b8284b._.js.map