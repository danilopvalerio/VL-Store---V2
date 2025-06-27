(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/ui/styles/cashierPage.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "borderLeftDanger": "cashierPage-module__jGPq6a__borderLeftDanger",
  "borderLeftSuccess": "cashierPage-module__jGPq6a__borderLeftSuccess",
  "box": "cashierPage-module__jGPq6a__box",
  "boxHover": "cashierPage-module__jGPq6a__boxHover",
  "btn": "cashierPage-module__jGPq6a__btn",
  "btnDanger": "cashierPage-module__jGPq6a__btnDanger",
  "btnPrimary": "cashierPage-module__jGPq6a__btnPrimary",
  "btnSecondary": "cashierPage-module__jGPq6a__btnSecondary",
  "buttonGroup": "cashierPage-module__jGPq6a__buttonGroup",
  "cardContainer": "cashierPage-module__jGPq6a__cardContainer",
  "cardTitle": "cashierPage-module__jGPq6a__cardTitle",
  "cursorPointer": "cashierPage-module__jGPq6a__cursorPointer",
  "danger": "cashierPage-module__jGPq6a__danger",
  "dataTable": "cashierPage-module__jGPq6a__dataTable",
  "fadeIn": "cashierPage-module__jGPq6a__fadeIn",
  "flex": "cashierPage-module__jGPq6a__flex",
  "formGroup": "cashierPage-module__jGPq6a__formGroup",
  "formLabel": "cashierPage-module__jGPq6a__formLabel",
  "gap2": "cashierPage-module__jGPq6a__gap2",
  "gap4": "cashierPage-module__jGPq6a__gap4",
  "gap6": "cashierPage-module__jGPq6a__gap6",
  "grid": "cashierPage-module__jGPq6a__grid",
  "input": "cashierPage-module__jGPq6a__input",
  "inputForm": "cashierPage-module__jGPq6a__inputForm",
  "itemsCenter": "cashierPage-module__jGPq6a__itemsCenter",
  "justifyBetween": "cashierPage-module__jGPq6a__justifyBetween",
  "mb4": "cashierPage-module__jGPq6a__mb4",
  "mb6": "cashierPage-module__jGPq6a__mb6",
  "modalContent": "cashierPage-module__jGPq6a__modalContent",
  "modalOverlay": "cashierPage-module__jGPq6a__modalOverlay",
  "pageContainer": "cashierPage-module__jGPq6a__pageContainer",
  "pageSubtitle": "cashierPage-module__jGPq6a__pageSubtitle",
  "pageTitle": "cashierPage-module__jGPq6a__pageTitle",
  "scaleIn": "cashierPage-module__jGPq6a__scaleIn",
  "statusBadge": "cashierPage-module__jGPq6a__statusBadge",
  "success": "cashierPage-module__jGPq6a__success",
  "textAccent": "cashierPage-module__jGPq6a__textAccent",
  "textCenter": "cashierPage-module__jGPq6a__textCenter",
  "textDanger": "cashierPage-module__jGPq6a__textDanger",
  "textPrimary": "cashierPage-module__jGPq6a__textPrimary",
  "textSecondary": "cashierPage-module__jGPq6a__textSecondary",
  "textSuccess": "cashierPage-module__jGPq6a__textSuccess",
  "wFull": "cashierPage-module__jGPq6a__wFull",
});
}}),
"[project]/src/ui/components/cashier/openNewCashierComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const NewCashier = ({ onCancel, onSave, vendedoresDisponiveis, id_loja })=>{
    _s();
    const [vendedorSearchTerm, setVendedorSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showVendedorDropdown, setShowVendedorDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [id_funcionario_responsavel, setId_funcionario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredVendedores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewCashier.useMemo[filteredVendedores]": ()=>{
            if (!vendedorSearchTerm.trim()) return vendedoresDisponiveis;
            const term = vendedorSearchTerm.toLowerCase();
            return vendedoresDisponiveis.filter({
                "NewCashier.useMemo[filteredVendedores]": (v)=>v.nome.toLowerCase().includes(term) || v.cargo && v.cargo.toLowerCase().includes(term)
            }["NewCashier.useMemo[filteredVendedores]"]);
        }
    }["NewCashier.useMemo[filteredVendedores]"], [
        vendedorSearchTerm,
        vendedoresDisponiveis
    ]);
    const handleCreateCashier = async ()=>{
        if (!id_funcionario_responsavel) {
            alert("Por favor, selecione um vendedor responsável.");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                id_funcionario_responsavel,
                id_loja
            };
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("http://localhost:9700/api/caixas", payload);
            onSave(response.data);
        } catch (error) {
            alert("Erro ao abrir o caixa. Verifique os dados e tente novamente.");
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
                console.error("Erro na requisição:", error.response?.data || error.message);
            } else {
                console.error("Erro inesperado:", error);
            }
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalOverlay,
        onClick: onCancel,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalContent,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardTitle,
                    children: "Abrir Novo Caixa"
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "row mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-md-12 position-relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "vendedorResponsavel",
                                className: "form-label text-white-75 small",
                                children: "Vendedor Responsável"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "form-control input-form",
                                placeholder: "Buscar vendedor...",
                                value: vendedorSearchTerm,
                                onChange: (e)=>{
                                    setVendedorSearchTerm(e.target.value);
                                    setShowVendedorDropdown(true);
                                },
                                onFocus: ()=>setShowVendedorDropdown(true),
                                onBlur: ()=>setTimeout(()=>setShowVendedorDropdown(false), 200)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            showVendedorDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm",
                                style: {
                                    maxHeight: "250px",
                                    overflowY: "auto"
                                },
                                children: filteredVendedores.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "list-group-item text-white bg-dark",
                                    children: "Nenhum vendedor encontrado"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                    lineNumber: 98,
                                    columnNumber: 19
                                }, this) : filteredVendedores.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "list-group-item bg-dark text-white cursor-pointer hover-light",
                                        onClick: ()=>{
                                            setId_funcionario(v.id_funcionario);
                                            setVendedorSearchTerm(`${v.nome}${v.cargo ? ` (${v.cargo})` : ""}`);
                                            setShowVendedorDropdown(false);
                                        },
                                        children: [
                                            v.nome,
                                            " ",
                                            v.cargo && `(${v.cargo})`
                                        ]
                                    }, v.id_funcionario, true, {
                                        fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                        lineNumber: 103,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "hidden",
                                id: "id_funcionario_responsavel",
                                value: id_funcionario_responsavel
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "d-flex justify-content-center mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primaria mx-2 footerButton",
                            onClick: onCancel,
                            disabled: isLoading,
                            children: "Cancelar"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primaria mx-2 footerButton",
                            onClick: handleCreateCashier,
                            disabled: isLoading || !id_funcionario_responsavel,
                            children: isLoading ? 'Salvando...' : 'Salvar'
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/cashier/openNewCashierComponent.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
};
_s(NewCashier, "j0gSndmKe+g+yTuIdwvvb1efqOM=");
_c = NewCashier;
const __TURBOPACK__default__export__ = NewCashier;
var _c;
__turbopack_context__.k.register(_c, "NewCashier");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ui/components/cashier/cashierListComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$openNewCashierComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/cashier/openNewCashierComponent.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const formatCurrency = (value)=>{
    if (value === null || typeof value !== "number") {
        return "R$ 0,00";
    }
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
};
const InfoItem = ({ label, value, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 47,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${className || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 48,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
        lineNumber: 46,
        columnNumber: 3
    }, this);
_c = InfoItem;
// MODIFIED: Added onDelete prop to CaixaCard
const CaixaCard = ({ caixa, onSelect, onDelete })=>{
    const isAberto = caixa?.status === "ABERTO";
    const responsavel = caixa?.funcionario_responsavel.nome || "Não informado";
    const dataAbertura = caixa?.data_abertura || "Data não disponível";
    const horaAbertura = caixa?.hora_abertura || "Hora não disponível";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].boxHover} ${isAberto ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].borderLeftSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].borderLeftDanger} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cursorPointer}`,
        onClick: onSelect,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb4}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary,
                                children: responsavel
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                children: [
                                    "Aberto em: ",
                                    dataAbertura,
                                    " às ",
                                    horaAbertura
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap2}`,
                        children: [
                            caixa?.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} ${isAberto ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].danger}`,
                                children: caixa.status
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation(); // Prevents the card's onSelect from firing
                                    onDelete();
                                },
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} border-0 bg-danger text-white`,
                                title: "Deletar Caixa",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textCenter}`,
                style: {
                    gridTemplateColumns: "repeat(3, 1fr)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                        label: "Entradas",
                        value: formatCurrency(caixa?.entradas),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSuccess
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                        label: "Saídas",
                        value: formatCurrency(caixa?.saidas),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                        label: isAberto ? "Saldo Atual" : "Saldo Final",
                        value: formatCurrency((caixa?.entradas || 0) - (caixa?.saidas || 0)),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textAccent
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
};
_c1 = CaixaCard;
// MODIFIED: Destructured new props
const CashierList = ({ caixas, onSelectCaixa, onFilter, vendedoresDisponiveis, id_loja, onSaveNewCashier, onDeleteCashier, jwtToken })=>{
    _s();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [responsavel, setResponsavel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleFilter = ()=>{
        onFilter(status, responsavel);
    };
    const handleClear = ()=>{
        setStatus("");
        setResponsavel("");
        onFilter("", "");
    };
    const handleNewCashierSave = async (data)=>{
        await onSaveNewCashier(data);
        setShowModal(false);
    };
    // NEW: Function to handle the deletion logic and API call
    const handleDeleteCashier = async (id_caixa)=>{
        if (!jwtToken) {
            alert("Erro de autenticação. Por favor, faça login novamente.");
            return;
        }
        if (!window.confirm("Tem certeza que deseja deletar este caixa? Esta ação não pode ser desfeita.")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:9700/api/caixas/${id_caixa}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            if (response.ok) {
                alert("Caixa deletado com sucesso!");
                // Notify the parent component to update the state
                onDeleteCashier(id_caixa);
            } else {
                const errorData = await response.json().catch(()=>null);
                throw new Error(errorData?.message || "Falha ao deletar o caixa.");
            }
        } catch (error) {
            console.error("Erro ao deletar caixa:", error);
            alert(`Erro: ${error}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle,
                                children: "Gerenciamento de Caixas"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageSubtitle,
                                children: "Visualize e gerencie todos os caixas da loja"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary}`,
                        onClick: ()=>setShowModal(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            " Abrir Novo Caixa"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter}`,
                    style: {
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formLabel,
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                    value: status,
                                    onChange: (e)=>setStatus(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Todos"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "ABERTO",
                                            children: "Aberto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "FECHADO",
                                            children: "Fechado"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formLabel,
                                    children: "Responsável"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Buscar por nome...",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                    value: responsavel,
                                    onChange: (e)=>setResponsavel(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap2}`,
                            style: {
                                paddingTop: "0.35rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleFilter,
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].wFull}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this),
                                        "Filtrar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClear,
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnSecondary} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].wFull}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this),
                                        "Limpar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4}`,
                style: {
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))"
                },
                children: caixas.map((caixa)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CaixaCard, {
                        caixa: caixa,
                        onSelect: ()=>onSelectCaixa(caixa),
                        onDelete: ()=>handleDeleteCashier(caixa.id_caixa)
                    }, caixa.id_caixa, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$openNewCashierComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                onCancel: ()=>setShowModal(false),
                vendedoresDisponiveis: vendedoresDisponiveis,
                id_loja: id_loja,
                onSave: handleNewCashierSave
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierListComponent.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
};
_s(CashierList, "uHTu68FF1ibVbrLjHAF74p70SzY=");
_c2 = CashierList;
const __TURBOPACK__default__export__ = CashierList;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "InfoItem");
__turbopack_context__.k.register(_c1, "CaixaCard");
__turbopack_context__.k.register(_c2, "CashierList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ui/components/cashier/cashierDetailsComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "formatCurrency": (()=>formatCurrency)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const formatCurrency = (value)=>{
    const numericValue = typeof value === "number" ? value : 0;
    return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};
const formatDateTime = (dateTimeString)=>{
    try {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch  {
        return dateTimeString;
    }
};
const CardInfo = ({ titulo, valor, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                children: titulo
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 88,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${className} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary}`,
                style: {
                    fontSize: "2rem"
                },
                children: valor
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 89,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
        lineNumber: 87,
        columnNumber: 3
    }, this);
_c = CardInfo;
const CashierDetails = ({ caixa, onBack, onUpdateCaixa, onCloseCaixa })=>{
    _s();
    const [movimentacao, setMovimentacao] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        tipo: "ENTRADA",
        valor: "",
        descricao: ""
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [movimentacoes, setMovimentacoes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        limit: 10,
        total: 0
    });
    const getAuthHeaders = ()=>{
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    };
    const loadMovimentacoes = async ()=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/caixas/${caixa?.id_caixa}/movimentacoes?page=${pagination.page}&limit=${pagination.limit}`, {
                headers: getAuthHeaders()
            });
            const movimentacoes = response.data.data;
            const movimentacoesParaExibir = movimentacoes.map((mov)=>({
                    ...mov,
                    valor: parseFloat(mov.valor)
                }));
            setMovimentacoes(movimentacoesParaExibir);
            setPagination((prev)=>({
                    ...prev,
                    total: response.data.total
                }));
        } catch (err) {
            console.error("Erro ao carregar movimentações:", err);
            setError("Erro ao carregar movimentações");
            setTimeout(()=>setError(""), 3000);
        } finally{
            setIsLoading(false);
        }
    };
    const atualizarTotais = async ()=>{
        if (!caixa?.id_caixa) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/caixas/${caixa.id_caixa}/movimentacoes/all`, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                const { totalEntradas, totalSaidas, saldo } = response.data.data;
                onUpdateCaixa({
                    ...caixa,
                    entradas: totalEntradas,
                    saidas: totalSaidas,
                    saldo: saldo
                });
            }
        } catch (err) {
            console.error("Erro ao carregar resumo do caixa:", err);
        }
    };
    const validateAndParseValue = (value)=>{
        const cleanValue = value.trim().replace(",", ".");
        const numericValue = parseFloat(cleanValue);
        return isNaN(numericValue) ? null : Math.round(numericValue * 100) / 100;
    };
    const handleAddMovimentacao = async ()=>{
        if (!caixa?.id_caixa) return;
        const valorFloat = validateAndParseValue(movimentacao.valor);
        if (valorFloat === null || valorFloat <= 0) {
            setError("Insira um valor numérico válido maior que zero.");
            setTimeout(()=>setError(""), 3000);
            return;
        }
        if (!movimentacao.descricao.trim()) {
            setError("Insira uma descrição.");
            setTimeout(()=>setError(""), 3000);
            return;
        }
        setIsLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`http://localhost:9700/api/caixas/${caixa.id_caixa}/movimentacoes`, {
                ...movimentacao,
                valor: valorFloat
            }, {
                headers: getAuthHeaders()
            });
            setMovimentacao({
                tipo: "ENTRADA",
                valor: "",
                descricao: ""
            });
            setPagination((prev)=>({
                    ...prev,
                    page: 1
                }));
            await atualizarTotais();
            setSuccess("Movimentação adicionada com sucesso!");
            setTimeout(()=>setSuccess(""), 3000);
        } catch (err) {
            console.error("Erro ao adicionar movimentação:", err);
            setError(err.response?.data?.message || "Erro ao adicionar movimentação.");
            setTimeout(()=>setError(""), 5000);
        } finally{
            setIsLoading(false);
        }
    };
    const handleCloseCaixa = async ()=>{
        if (!caixa?.id_caixa) return;
        if (window.confirm("Tem certeza que deseja fechar o caixa?")) {
            setIsLoading(true);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].patch(`http://localhost:9700/api/caixas/${caixa.id_caixa}/fechar`, {
                    hora_fechamento: new Date().toTimeString().split(' ')[0]
                }, {
                    headers: getAuthHeaders()
                });
                onCloseCaixa(response.data);
                setSuccess("Caixa fechado com sucesso!");
                setTimeout(()=>setSuccess(""), 3000);
            } catch (err) {
                console.error("Erro ao fechar caixa:", err);
                setError(err.response?.data?.message || "Erro ao fechar caixa.");
                setTimeout(()=>setError(""), 3000);
            } finally{
                setIsLoading(false);
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CashierDetails.useEffect": ()=>{
            if (caixa?.id_caixa) {
                loadMovimentacoes();
                atualizarTotais();
            }
        }
    }["CashierDetails.useEffect"], [
        caixa?.id_caixa,
        pagination.page,
        pagination.limit
    ]);
    const saldo = caixa?.saldo ?? 0;
    const hasNextPage = pagination.page * pagination.limit < pagination.total;
    const hasPreviousPage = pagination.page > 1;
    if (!caixa) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Carregando detalhes do caixa..."
    }, void 0, false, {
        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
        lineNumber: 253,
        columnNumber: 20
    }, this);
    const handlePageChange = (newPage)=>setPagination({
            ...pagination,
            page: newPage
        });
    if (!caixa) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Carregando detalhes do caixa..."
    }, void 0, false, {
        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
        lineNumber: 258,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnSecondary}`,
                        onClick: onBack,
                        disabled: isLoading,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            " Voltar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle,
                        children: "Detalhes do Caixa"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    caixa.status === "ABERTO" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnDanger}`,
                        onClick: handleCloseCaixa,
                        disabled: isLoading,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this),
                            " ",
                            isLoading ? "Fechando..." : "Fechar Caixa"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].alert} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].alertDanger}`,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].alert} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].alertSuccess}`,
                children: success
            }, void 0, false, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 288,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                style: {
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardInfo, {
                        titulo: "Total de Entradas",
                        valor: formatCurrency(caixa.entradas),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSuccess
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardInfo, {
                        titulo: "Total de Saídas",
                        valor: formatCurrency(caixa.saidas),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardInfo, {
                        titulo: "Saldo Atual",
                        valor: formatCurrency(saldo),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textAccent
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this),
            caixa.status === "ABERTO" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb4}`,
                        style: {
                            fontSize: "1.25rem"
                        },
                        children: "Adicionar Movimentação"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter}`,
                        style: {
                            gridTemplateColumns: "1fr 1fr 2fr 0.5fr"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                value: movimentacao.tipo,
                                onChange: (e)=>setMovimentacao({
                                        ...movimentacao,
                                        tipo: e.target.value
                                    }),
                                disabled: isLoading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        className: "list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm",
                                        value: "ENTRADA",
                                        children: "Entrada"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        className: "list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm",
                                        value: "SAIDA",
                                        children: "Saída"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Valor (ex: 80,00)",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                value: movimentacao.valor,
                                onChange: (e)=>setMovimentacao({
                                        ...movimentacao,
                                        valor: e.target.value
                                    }),
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Descrição",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                value: movimentacao.descricao,
                                onChange: (e)=>setMovimentacao({
                                        ...movimentacao,
                                        descricao: e.target.value
                                    }),
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary}`,
                                onClick: handleAddMovimentacao,
                                disabled: isLoading,
                                children: isLoading ? "..." : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                    lineNumber: 375,
                                    columnNumber: 36
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb4}`,
                        style: {
                            fontSize: "1.25rem"
                        },
                        children: "Histórico de Movimentações"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    movimentacoes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                        children: "Nenhuma movimentação registrada ainda."
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tableContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dataTable,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Data/Hora"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Tipo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Descrição"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Valor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                lineNumber: 397,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: movimentacoes.map((mov)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: formatDateTime(mov.criado_em)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                            lineNumber: 407,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} ${mov.tipo === "ENTRADA" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].danger}`,
                                                                children: mov.tipo
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                                lineNumber: 409,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: mov.descricao
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: mov.tipo === "ENTRADA" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger,
                                                            children: formatCurrency(mov.valor)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                            lineNumber: 420,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, mov.id_movimentacao, true, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                            lineNumber: 404,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mt4}`,
                                children: [
                                    hasPreviousPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnSecondary}`,
                                        onClick: ()=>handlePageChange(pagination.page - 1),
                                        disabled: isLoading,
                                        children: "Anterior"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                        lineNumber: 438,
                                        columnNumber: 17
                                    }, this),
                                    hasNextPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnSecondary}`,
                                        onClick: ()=>handlePageChange(pagination.page + 1),
                                        disabled: isLoading,
                                        children: "Próxima"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                        lineNumber: 447,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/cashier/cashierDetailsComponent.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(CashierDetails, "LMRF9bFmVU2lXiblLQNinwMaKuc=");
_c1 = CashierDetails;
const __TURBOPACK__default__export__ = CashierDetails;
var _c, _c1;
__turbopack_context__.k.register(_c, "CardInfo");
__turbopack_context__.k.register(_c1, "CashierDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/cashierPage.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierListComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/cashier/cashierListComponent.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetailsComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/cashier/cashierDetailsComponent.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const CashierPage = ()=>{
    _s();
    const [caixas, setCaixas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCashier, setSelectedCashier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalItems, setTotalItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filtroStatus, setFiltroStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filtroResponsavel, setFiltroResponsavel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [vendedoresDisponiveis, setVendedoresDisponiveis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [idloja, setIdloja] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    // NEW: State for JWT token
    const [jwtToken, setJwtToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const LIMIT = 6;
    const handleUpdateCaixa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[handleUpdateCaixa]": (updatedCashier)=>{
            setCaixas({
                "CashierPage.useCallback[handleUpdateCaixa]": (prevCaixas)=>prevCaixas.map({
                        "CashierPage.useCallback[handleUpdateCaixa]": (c)=>c.id_caixa === updatedCashier.id_caixa ? updatedCashier : c
                    }["CashierPage.useCallback[handleUpdateCaixa]"])
            }["CashierPage.useCallback[handleUpdateCaixa]"]);
            if (selectedCashier && selectedCashier.id_caixa === updatedCashier.id_caixa) {
                setSelectedCashier(updatedCashier);
            }
        }
    }["CashierPage.useCallback[handleUpdateCaixa]"], [
        selectedCashier
    ]);
    const caixasFiltrados = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashierPage.useMemo[caixasFiltrados]": ()=>{
            return caixas.filter({
                "CashierPage.useMemo[caixasFiltrados]": (caixa)=>{
                    const nomeResponsavel = caixa?.funcionario_responsavel?.nome?.toLowerCase() || "";
                    const statusMatch = !filtroStatus || caixa.status === filtroStatus;
                    const responsavelMatch = !filtroResponsavel || nomeResponsavel.includes(filtroResponsavel.toLowerCase());
                    return statusMatch && responsavelMatch;
                }
            }["CashierPage.useMemo[caixasFiltrados]"]);
        }
    }["CashierPage.useMemo[caixasFiltrados]"], [
        caixas,
        filtroStatus,
        filtroResponsavel
    ]);
    const fetchCashiers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[fetchCashiers]": async (page, status = "", responsavel = "")=>{
            // MODIFIED: token variable is now set to state
            const token = localStorage.getItem("jwtToken");
            const userData = localStorage.getItem("userData");
            setJwtToken(token); // Set token to state
            if (!token || !userData) {
                router.push("/initialPage");
                return;
            }
            setLoading(true);
            try {
                const { id_loja } = JSON.parse(userData);
                const params = new URLSearchParams();
                if (status) params.append("status", status);
                if (responsavel) params.append("responsavel", responsavel);
                params.append("page", String(page));
                params.append("limit", String(LIMIT));
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/caixas/loja/${id_loja}?${params.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 10000
                });
                const uniqueCaixas = response.data.data.reduce({
                    "CashierPage.useCallback[fetchCashiers].uniqueCaixas": (acc, current)=>{
                        const formattedCaixa = {
                            id_caixa: current.id_caixa,
                            id_loja: current.id_loja,
                            status: current.status,
                            funcionario_responsavel: current.funcionario_responsavel || {
                                nome: "Não informado"
                            },
                            data_abertura: current.data_abertura,
                            hora_abertura: current.hora_abertura,
                            entradas: 0,
                            saidas: 0,
                            saldo: 0
                        };
                        const x = acc.find({
                            "CashierPage.useCallback[fetchCashiers].uniqueCaixas.x": (item)=>item.id_caixa === formattedCaixa.id_caixa
                        }["CashierPage.useCallback[fetchCashiers].uniqueCaixas.x"]);
                        if (!x) {
                            return acc.concat([
                                formattedCaixa
                            ]);
                        } else {
                            return acc;
                        }
                    }
                }["CashierPage.useCallback[fetchCashiers].uniqueCaixas"], []);
                const caixasComTotaisPromises = uniqueCaixas.map({
                    "CashierPage.useCallback[fetchCashiers].caixasComTotaisPromises": async (caixaOriginal)=>{
                        try {
                            const totaisResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/caixas/${caixaOriginal.id_caixa}/movimentacoes/all`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                },
                                timeout: 10000
                            });
                            if (totaisResponse.data.success) {
                                const { totalEntradas, totalSaidas, saldo } = totaisResponse.data.data;
                                return {
                                    ...caixaOriginal,
                                    entradas: totalEntradas,
                                    saidas: totalSaidas,
                                    saldo: saldo
                                };
                            }
                        } catch (error) {
                            console.error(`Erro ao carregar totais para o caixa ${caixaOriginal.id_caixa}:`, error);
                        }
                        return {
                            ...caixaOriginal,
                            entradas: 0,
                            saidas: 0,
                            saldo: 0
                        };
                    }
                }["CashierPage.useCallback[fetchCashiers].caixasComTotaisPromises"]);
                const caixasAtualizados = await Promise.all(caixasComTotaisPromises);
                const parsedData = JSON.parse(userData);
                const idLoja = parsedData.id_loja;
                setIdloja(idLoja);
                const vendedoresRes = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/funcionarios/loja/${idLoja}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 10000
                });
                if (vendedoresRes.data?.success) {
                    setVendedoresDisponiveis(vendedoresRes.data.data);
                }
                setCaixas(caixasAtualizados);
                setCurrentPage(response.data.page);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.totalItems);
            } catch (error) {
                console.error("Erro ao carregar caixas:", error);
            } finally{
                setLoading(false);
            }
        }
    }["CashierPage.useCallback[fetchCashiers]"], [
        router,
        LIMIT
    ]);
    // NEW: Function to update state after a cashier is deleted
    const handleCashierDeleted = (deletedCashierId)=>{
        setCaixas((currentCaixas)=>currentCaixas.filter((caixa)=>caixa.id_caixa !== deletedCashierId));
    };
    const handleCloseCaixa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[handleCloseCaixa]": ()=>{
            setSelectedCashier(null);
            fetchCashiers(currentPage, filtroStatus, filtroResponsavel);
        }
    }["CashierPage.useCallback[handleCloseCaixa]"], [
        fetchCashiers,
        currentPage,
        filtroStatus,
        filtroResponsavel
    ]);
    const handleApplyFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[handleApplyFilters]": (status, responsavel)=>{
            setFiltroStatus(status);
            setFiltroResponsavel(responsavel);
            fetchCashiers(1, status, responsavel);
        }
    }["CashierPage.useCallback[handleApplyFilters]"], [
        fetchCashiers
    ]);
    const handleBackToList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[handleBackToList]": ()=>{
            setSelectedCashier(null);
            fetchCashiers(currentPage, filtroStatus, filtroResponsavel);
        }
    }["CashierPage.useCallback[handleBackToList]"], [
        fetchCashiers,
        currentPage,
        filtroStatus,
        filtroResponsavel
    ]);
    const handleSaveNewCashier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CashierPage.useCallback[handleSaveNewCashier]": async (newlyCreatedCashier)=>{
            await fetchCashiers(currentPage, filtroStatus, filtroResponsavel);
        }
    }["CashierPage.useCallback[handleSaveNewCashier]"], [
        fetchCashiers,
        currentPage,
        filtroStatus,
        filtroResponsavel
    ]);
    const pushBackToMenu = ()=>{
        router.push("menuPage");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CashierPage.useEffect": ()=>{
            fetchCashiers(1);
        }
    }["CashierPage.useEffect"], [
        fetchCashiers
    ]); // Modified dependency array for correctness
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "d-flex justify-content-between align-items-center flex-column",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "header-panel position-relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primaria position-absolute top-0 end-0 px-3 py-1 shadow",
                            onClick: pushBackToMenu,
                            children: "Voltar"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: "img logo",
                            src: "/vl-store-logo-white.svg",
                            alt: "VL Store Logo"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageContainer,
                children: selectedCashier ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetailsComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    caixa: selectedCashier,
                    onBack: handleBackToList,
                    onUpdateCaixa: handleUpdateCaixa,
                    onCloseCaixa: handleCloseCaixa
                }, void 0, false, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 256,
                    columnNumber: 11
                }, this) : // MODIFIED: Passed down the onDeleteCashier handler and jwtToken
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierListComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    caixas: caixasFiltrados,
                    onSelectCaixa: (caixa)=>setSelectedCashier(caixa),
                    vendedoresDisponiveis: vendedoresDisponiveis,
                    id_loja: idloja,
                    onFilter: handleApplyFilters,
                    onSaveNewCashier: handleSaveNewCashier,
                    onDeleteCashier: handleCashierDeleted,
                    jwtToken: jwtToken
                }, void 0, false, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 264,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(CashierPage, "e6m1uFu2EikN2I+y4qdwGsP2yA8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CashierPage;
const __TURBOPACK__default__export__ = CashierPage;
var _c;
__turbopack_context__.k.register(_c, "CashierPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/cashierPage.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/cashierPage";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/cashierPage.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/cashierPage (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/cashierPage.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__47578f1e._.js.map