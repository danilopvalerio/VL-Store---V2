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
  "btnPrimary": "cashierPage-module__jGPq6a__btnPrimary",
  "btnSecondary": "cashierPage-module__jGPq6a__btnSecondary",
  "buttonGroup": "cashierPage-module__jGPq6a__buttonGroup",
  "caixasGrid": "cashierPage-module__jGPq6a__caixasGrid",
  "circleBox": "cashierPage-module__jGPq6a__circleBox",
  "danger": "cashierPage-module__jGPq6a__danger",
  "filterContainer": "cashierPage-module__jGPq6a__filterContainer",
  "filterGrid": "cashierPage-module__jGPq6a__filterGrid",
  "filterGroup": "cashierPage-module__jGPq6a__filterGroup",
  "filterLabel": "cashierPage-module__jGPq6a__filterLabel",
  "flex": "cashierPage-module__jGPq6a__flex",
  "gap4": "cashierPage-module__jGPq6a__gap4",
  "grid": "cashierPage-module__jGPq6a__grid",
  "gridCols3": "cashierPage-module__jGPq6a__gridCols3",
  "inputForm": "cashierPage-module__jGPq6a__inputForm",
  "itemsCenter": "cashierPage-module__jGPq6a__itemsCenter",
  "itemsStart": "cashierPage-module__jGPq6a__itemsStart",
  "justifyBetween": "cashierPage-module__jGPq6a__justifyBetween",
  "mb3": "cashierPage-module__jGPq6a__mb3",
  "mb4": "cashierPage-module__jGPq6a__mb4",
  "mb6": "cashierPage-module__jGPq6a__mb6",
  "pageContainer": "cashierPage-module__jGPq6a__pageContainer",
  "pageSubtitle": "cashierPage-module__jGPq6a__pageSubtitle",
  "pageTitle": "cashierPage-module__jGPq6a__pageTitle",
  "statusBadge": "cashierPage-module__jGPq6a__statusBadge",
  "statusBox": "cashierPage-module__jGPq6a__statusBox",
  "statusIcon": "cashierPage-module__jGPq6a__statusIcon",
  "statusLabel": "cashierPage-module__jGPq6a__statusLabel",
  "statusValue": "cashierPage-module__jGPq6a__statusValue",
  "success": "cashierPage-module__jGPq6a__success",
  "textAccent": "cashierPage-module__jGPq6a__textAccent",
  "textCenter": "cashierPage-module__jGPq6a__textCenter",
  "textDanger": "cashierPage-module__jGPq6a__textDanger",
  "textPrimary": "cashierPage-module__jGPq6a__textPrimary",
  "textSecondary": "cashierPage-module__jGPq6a__textSecondary",
  "textTertiary": "cashierPage-module__jGPq6a__textTertiary",
});
}}),
"[project]/src/ui/components/cashier/cashierDetails.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const CashierDetails = ({ caixa, fecharModal })=>{
    _s();
    const [novaMovimentacao, setNovaMovimentacao] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        tipo: 'ENTRADA',
        valor: '',
        descricao: ''
    });
    const [movimentacoes, setMovimentacoes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            dataHora: '04/06/2025 08:30',
            tipo: 'ENTRADA',
            descricao: 'Venda #001 - Tênis Nike Air',
            valor: 'R$ 350,00',
            responsavel: 'João Silva'
        },
        {
            id: 2,
            dataHora: '04/06/2025 09:15',
            tipo: 'ENTRADA',
            descricao: 'Venda #002 - Camiseta Adidas',
            valor: 'R$ 120,00',
            responsavel: 'Maria Santos'
        },
        {
            id: 3,
            dataHora: '04/06/2025 10:00',
            tipo: 'SAIDA',
            descricao: 'Pagamento de fornecedor',
            valor: 'R$ 150,00',
            responsavel: 'Administrador'
        },
        {
            id: 4,
            dataHora: '04/06/2025 11:30',
            tipo: 'ENTRADA',
            descricao: 'Venda #003 - Calça Jeans',
            valor: 'R$ 180,00',
            responsavel: 'Carlos Oliveira'
        },
        {
            id: 5,
            dataHora: '04/06/2025 14:20',
            tipo: 'ENTRADA',
            descricao: 'Venda #004 - Kit Esportivo',
            valor: 'R$ 1.800,00',
            responsavel: 'Ana Costa'
        }
    ]);
    const handleAdicionarMovimentacao = (e)=>{
        e.preventDefault();
        if (!novaMovimentacao.valor || !novaMovimentacao.descricao) return;
        const novaMov = {
            id: movimentacoes.length + 1,
            dataHora: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            tipo: novaMovimentacao.tipo,
            descricao: novaMovimentacao.descricao,
            valor: `R$ ${parseFloat(novaMovimentacao.valor).toFixed(2).replace('.', ',')}`,
            responsavel: 'Usuário Atual'
        };
        setMovimentacoes([
            ...movimentacoes,
            novaMov
        ]);
        setNovaMovimentacao({
            tipo: 'ENTRADA',
            valor: '',
            descricao: ''
        });
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setNovaMovimentacao({
            ...novaMovimentacao,
            [name]: value
        });
    };
    if (!caixa) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalOverlay,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeButton,
                    onClick: fecharModal,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalTitle,
                    children: [
                        "Detalhes do Caixa #",
                        caixa.id
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadgeContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} ${caixa.status === 'ABERTO' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].danger}`,
                                children: caixa.status
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Data de Abertura"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.dataAbertura
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Hora de Abertura"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.horaAbertura
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Responsável"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: caixa.responsavel
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totaisSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totaisGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Total de Entradas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalValue,
                                        children: caixa.entradas
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Total de Saídas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalValue} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger}`,
                                        children: caixa.saidas
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalLabel,
                                        children: "Saldo Atual"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].totalValue} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textAccent}`,
                                        children: caixa.status === 'ABERTO' ? caixa.saldo : caixa.saldoFinal
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                caixa.status === 'ABERTO' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formSection} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fineTransparentBorderBottom}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: "Adicionar Movimentação"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleAdicionarMovimentacao,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].formGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "tipo",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: novaMovimentacao.tipo,
                                        onChange: handleChange,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ENTRADA",
                                                children: "Entrada"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SAIDA",
                                                children: "Saída"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "valor",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Valor (R$)",
                                        value: novaMovimentacao.valor,
                                        onChange: handleChange,
                                        step: "0.01",
                                        min: "0.01"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "descricao",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Descrição da movimentação",
                                        value: novaMovimentacao.descricao,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary,
                                        disabled: !novaMovimentacao.valor || !novaMovimentacao.descricao,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            "Adicionar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].movimentacoesSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Movimentações"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                            placeholder: "Buscar movimentação..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnIcon,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tableContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].movimentacoesTable,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Data/Hora"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Descrição"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Valor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Responsável"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Ações"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: movimentacoes.map((mov)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: mov.dataHora
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: mov.tipo === 'ENTRADA' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger,
                                                            children: mov.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: mov.descricao
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: mov.valor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: mov.responsavel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnIcon,
                                                            children: "☐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, mov.id, true, {
                                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pagination,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "Anterior"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].active}`,
                                    children: "1"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageButton,
                                    children: "Próximo"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/cashier/cashierDetails.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
_s(CashierDetails, "ZT6XQhRDtFEyWdujN5pR7kED1Hc=");
_c = CashierDetails;
const __TURBOPACK__default__export__ = CashierDetails;
var _c;
__turbopack_context__.k.register(_c, "CashierDetails");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/ui/styles/cashierPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetails$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/cashier/cashierDetails.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const CashierPage = ()=>{
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        status: "Todos os status",
        data: "2025-06-10",
        responsavel: ""
    });
    const [modalAberto, setModalAberto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [caixaSelecionado, setCaixaSelecionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const caixasData = [
        {
            id: 1,
            dataAbertura: "2025-06-10",
            horaAbertura: "08:00",
            responsavel: "João Silva",
            status: "ABERTO",
            entradas: "R$ 2.450,00",
            saidas: "R$ 150,00",
            saldo: "R$ 2.300,00",
            statusColor: "success"
        },
        {
            id: 2,
            dataAbertura: "2025-06-09",
            horaAbertura: "09:30",
            responsavel: "Maria Santos",
            status: "ABERTO",
            entradas: "R$ 950,00",
            saidas: "R$ 0,00",
            saldo: "R$ 950,00",
            statusColor: "success"
        },
        {
            id: 3,
            dataAbertura: "2025-06-09",
            horaAbertura: "08:00 - 18:00",
            responsavel: "Carlos Oliveira",
            status: "FECHADO",
            entradas: "R$ 3.200,00",
            saidas: "R$ 300,00",
            saldoFinal: "R$ 2.900,00",
            fechadoEm: "2025-06-09 18:00",
            statusColor: "danger"
        }
    ];
    const StatusBadge = ({ status, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"][color]}`,
            children: status
        }, void 0, false, {
            fileName: "[project]/src/pages/cashierPage.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, this);
    const abrirModal = (caixa)=>{
        setCaixaSelecionado(caixa);
        setModalAberto(true);
    };
    const CaixaCard = ({ caixa })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].circleBox} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fineTransparentBorder} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb4} ${caixa.status === "ABERTO" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].borderLeftSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].borderLeftDanger}`,
            onClick: ()=>abrirModal(caixa),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsStart} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb3}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Data de Abertura"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 76,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.dataAbertura
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 77,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 75,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Hora de Abertura"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 80,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.horaAbertura
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 79,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                            status: caixa.status,
                            color: caixa.statusColor
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 83,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 72,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb3,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                            children: "Responsável"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary,
                            children: caixa.responsavel
                        }, void 0, false, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 88,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gridCols3} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gap4} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb3}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Entradas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 95,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textPrimary,
                                    children: caixa.entradas
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 96,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 94,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: "Saídas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 99,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textDanger,
                                    children: caixa.saidas
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 100,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 98,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textCenter,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textSecondary,
                                    children: caixa.status === "ABERTO" ? "Saldo" : "Saldo Final"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 103,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].textAccent,
                                    children: caixa.status === "ABERTO" ? caixa.saldo : caixa.saldoFinal
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 106,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/cashierPage.tsx",
                            lineNumber: 102,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/cashierPage.tsx",
                    lineNumber: 91,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/cashierPage.tsx",
            lineNumber: 62,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].flex} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].justifyBetween} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemsCenter} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mb6}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle,
                                children: "☐ Gerenciamento de Caixas"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageSubtitle,
                                children: "Visualize e gerencie todos os caixas da loja"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBox,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusIcon,
                                children: "☐"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusLabel,
                                children: "Caixas Ativos"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusValue,
                                children: "2"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterContainer} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].quartenary}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: filters.status,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                status: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Todos os status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "ABERTO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "FECHADO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/cashierPage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Data"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        value: filters.data,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                data: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterLabel,
                                        children: "Responsável"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputForm,
                                        placeholder: "Nome do responsável",
                                        value: filters.responsavel,
                                        onChange: (e)=>setFilters({
                                                ...filters,
                                                responsavel: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filterActions,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/cashierPage.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        "Filtrar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/cashierPage.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    "Abrir Novo Caixa"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnSecondary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/cashierPage.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    "Limpar Filtros"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/cashierPage.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$styles$2f$cashierPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].caixasGrid,
                children: caixasData.map((caixa)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CaixaCard, {
                        caixa: caixa
                    }, caixa.id, false, {
                        fileName: "[project]/src/pages/cashierPage.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            modalAberto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$cashier$2f$cashierDetails$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                caixa: caixaSelecionado,
                fecharModal: ()=>setModalAberto(false)
            }, void 0, false, {
                fileName: "[project]/src/pages/cashierPage.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/cashierPage.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
};
_s(CashierPage, "j0NutobWaP5E7jEPYPa83b4b3q4=");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4abdef8c._.js.map