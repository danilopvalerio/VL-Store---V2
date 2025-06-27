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
"[project]/src/ui/components/sales/salesFormComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/react-fontawesome/index.es.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const SalesForm = ({ onSaleRegistered, jwtToken, vendedoresDisponiveis, produtosDisponiveis })=>{
    _s();
    // Hooks de estado
    const [codigoVenda, setCodigoVenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [vendedorResponsavelId, setVendedorResponsavelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dataVenda, setDataVenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formaPagamento, setFormaPagamento] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [produtoSelecionadoId, setProdutoSelecionadoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [quantidadeProduto, setQuantidadeProduto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [precoUnitario, setPrecoUnitario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [carrinhoVenda, setCarrinhoVenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [descontoVenda, setDescontoVenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("0.00");
    const [acrescimoVenda, setAcrescimoVenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("0.00");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Estados para pesquisa de produto
    const [produtoSearchTerm, setProdutoSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showProductDropdown, setShowProductDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Estados para pesquisa de vendedor
    const [vendedorSearchTerm, setVendedorSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showVendedorDropdown, setShowVendedorDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showMessage = (message, type)=>{
        if (type === "error") {
            setError(message);
            setSuccess("");
            setTimeout(()=>setError(""), 5000);
        } else {
            setSuccess(message);
            setError("");
            setTimeout(()=>setSuccess(""), 5000);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesForm.useEffect": ()=>{
            const generateSaleCode = {
                "SalesForm.useEffect.generateSaleCode": ()=>`VENDA-${Math.floor(Math.random() * 90000) + 10000}`
            }["SalesForm.useEffect.generateSaleCode"];
            setCodigoVenda(generateSaleCode());
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0"); // mês é 0-based
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
            setDataVenda(localDateTime);
        }
    }["SalesForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesForm.useEffect": ()=>{
            if (produtoSelecionadoId) {
                const produto = produtosDisponiveis.find({
                    "SalesForm.useEffect.produto": (p)=>p.id_variacao === produtoSelecionadoId
                }["SalesForm.useEffect.produto"]);
                if (produto && typeof produto.preco_venda === "number") {
                    setPrecoUnitario(produto.preco_venda.toFixed(2));
                }
            } else {
                setPrecoUnitario("");
            }
        }
    }["SalesForm.useEffect"], [
        produtoSelecionadoId,
        produtosDisponiveis
    ]);
    const valorTotalVenda = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SalesForm.useMemo[valorTotalVenda]": ()=>{
            const subtotalProdutos = carrinhoVenda.reduce({
                "SalesForm.useMemo[valorTotalVenda].subtotalProdutos": (sum, item)=>sum + item.quantidade * item.precoUnitario
            }["SalesForm.useMemo[valorTotalVenda].subtotalProdutos"], 0);
            const descontoNum = parseFloat(descontoVenda.replace(",", ".")) || 0;
            const acrescimoNum = parseFloat(acrescimoVenda.replace(",", ".")) || 0;
            return subtotalProdutos - descontoNum + acrescimoNum;
        }
    }["SalesForm.useMemo[valorTotalVenda]"], [
        carrinhoVenda,
        descontoVenda,
        acrescimoVenda
    ]);
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SalesForm.useMemo[filteredProducts]": ()=>{
            if (!produtoSearchTerm.trim()) return produtosDisponiveis;
            const term = produtoSearchTerm.toLowerCase();
            return produtosDisponiveis.filter({
                "SalesForm.useMemo[filteredProducts]": (p)=>p.produto.nome.toLowerCase().includes(term) || p.descricao_variacao.toLowerCase().includes(term) || p.produto.referencia.toLowerCase().includes(term)
            }["SalesForm.useMemo[filteredProducts]"]);
        }
    }["SalesForm.useMemo[filteredProducts]"], [
        produtoSearchTerm,
        produtosDisponiveis
    ]);
    const filteredVendedores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SalesForm.useMemo[filteredVendedores]": ()=>{
            if (!vendedorSearchTerm.trim()) return vendedoresDisponiveis;
            const term = vendedorSearchTerm.toLowerCase();
            return vendedoresDisponiveis.filter({
                "SalesForm.useMemo[filteredVendedores]": (v)=>v.nome.toLowerCase().includes(term) || v.cargo && v.cargo.toLowerCase().includes(term)
            }["SalesForm.useMemo[filteredVendedores]"]);
        }
    }["SalesForm.useMemo[filteredVendedores]"], [
        vendedorSearchTerm,
        vendedoresDisponiveis
    ]);
    const handleAdicionarProdutoVenda = ()=>{
        if (!produtoSelecionadoId) {
            showMessage("Selecione um produto para adicionar.", "error");
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
        setProdutoSearchTerm("");
        setShowProductDropdown(false);
    };
    const handleRemoverProdutoDoCarrinho = (idVariacao)=>{
        setCarrinhoVenda(carrinhoVenda.filter((item)=>item.id_variacao !== idVariacao));
    };
    const handleNumericInputChange = (setter, value)=>{
        const sanitizedValue = value.replace(/[^0-9,.]/g, "").replace(",", ".");
        if (sanitizedValue.split(".").length > 2) {
            return;
        }
        setter(sanitizedValue);
    };
    const resetForm = ()=>{
        const generateSaleCode = ()=>`VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
        setCodigoVenda(generateSaleCode());
        setVendedorResponsavelId("");
        setVendedorSearchTerm("");
        setFormaPagamento("");
        setCarrinhoVenda([]);
        setDescontoVenda("0.00");
        setAcrescimoVenda("0.00");
        setProdutoSelecionadoId("");
        setQuantidadeProduto(1);
        setProdutoSearchTerm("");
    };
    const handleSubmitVenda = async (event)=>{
        event.preventDefault();
        if (!vendedorResponsavelId || !formaPagamento || carrinhoVenda.length === 0) {
            showMessage("Preencha todos os campos obrigatórios.", "error");
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("http://localhost:9700/api/vendas", payload, config);
            if (response.data?.success) {
                showMessage("Venda registrada com sucesso!", "success");
                onSaleRegistered(response.data.data);
                resetForm();
            }
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
            const backendMessage = error.response?.data?.message || "Ocorreu um erro desconhecido.";
            showMessage(`Erro: ${backendMessage}`, "error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "terciary p-4 rounded-5 white-light-small d-flex flex-column w-75 mx-auto h-100",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "alert alert-danger alert-dismissible fade show",
                role: "alert",
                children: [
                    error,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-close",
                        onClick: ()=>setError(""),
                        "aria-label": "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 272,
                columnNumber: 9
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "alert alert-success alert-dismissible fade show",
                role: "alert",
                children: [
                    success,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-close",
                        onClick: ()=>setSuccess(""),
                        "aria-label": "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                    className: "mb-0 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-plus-circle mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, this),
                        "Registrar Nova Venda"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow-1",
                style: {
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    id: "sales-form-content",
                    onSubmit: handleSubmitVenda,
                    noValidate: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6 position-relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "vendedorResponsavel",
                                            className: "form-label text-white-75 small",
                                            children: "Vendedor Responsável"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 312,
                                            columnNumber: 15
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
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 318,
                                            columnNumber: 15
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
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 341,
                                                columnNumber: 21
                                            }, this) : filteredVendedores.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "list-group-item bg-dark text-white cursor-pointer hover-light",
                                                    onClick: ()=>{
                                                        setVendedorResponsavelId(v.id_funcionario);
                                                        setVendedorSearchTerm(`${v.nome}${v.cargo ? ` (${v.cargo})` : ""}`);
                                                        setShowVendedorDropdown(false);
                                                    },
                                                    children: [
                                                        v.nome,
                                                        " ",
                                                        v.cargo && `(${v.cargo})`
                                                    ]
                                                }, v.id_funcionario, true, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 333,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "hidden",
                                            id: "vendedorResponsavelId",
                                            value: vendedorResponsavelId
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "dataVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Data e Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 371,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "datetime-local",
                                            className: "form-control input-form",
                                            id: "dataVenda",
                                            value: dataVenda,
                                            onChange: (e)=>setDataVenda(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-md-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "formaPagamento",
                                        className: "form-label text-white-75 small",
                                        children: "Forma de Pagamento"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "formaPagamento",
                                        className: "form-control custom-select input-form",
                                        value: formaPagamento,
                                        onChange: (e)=>setFormaPagamento(e.target.value),
                                        required: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                disabled: true,
                                                className: "text-gray-500",
                                                children: "Selecione..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DINHEIRO",
                                                className: "text-black",
                                                children: "Dinheiro"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 405,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CARTAO_CREDITO",
                                                className: "text-black",
                                                children: "Cartão de Crédito"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 408,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CARTAO_DEBITO",
                                                className: "text-black",
                                                children: "Cartão de Débito"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PIX",
                                                className: "text-black",
                                                children: "PIX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 414,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                            className: "mb-3 text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-shopping-basket mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, this),
                                "Produtos da Venda"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row align-items-end mb-3 position-relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "produtoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Produto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            placeholder: "Buscar produto...",
                                            value: produtoSearchTerm,
                                            onChange: (e)=>{
                                                setProdutoSearchTerm(e.target.value);
                                                setShowProductDropdown(true);
                                            },
                                            onFocus: ()=>setShowProductDropdown(true),
                                            onBlur: ()=>setTimeout(()=>setShowProductDropdown(false), 200)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        showProductDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm",
                                            style: {
                                                maxHeight: "250px",
                                                overflowY: "auto"
                                            },
                                            children: filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "list-group-item text-white bg-dark",
                                                children: "Nenhum produto encontrado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 454,
                                                columnNumber: 21
                                            }, this) : filteredProducts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "list-group-item bg-dark text-white cursor-pointer hover-light",
                                                    onClick: ()=>{
                                                        setProdutoSelecionadoId(p.id_variacao);
                                                        setProdutoSearchTerm(`${p.produto.nome} - ${p.descricao_variacao}`);
                                                        setShowProductDropdown(false);
                                                    },
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
                                                    lineNumber: 459,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "quantidadeProduto",
                                            className: "form-label text-white-75 small",
                                            children: "Quantidade"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "form-control input-form",
                                            id: "quantidadeProduto",
                                            value: quantidadeProduto,
                                            onChange: (e)=>setQuantidadeProduto(parseInt(e.target.value, 10) || 1),
                                            min: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 485,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "precoUnitario",
                                            className: "form-label text-white-75 small",
                                            children: "Preço Un."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 497,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "precoUnitario",
                                            value: precoUnitario ? `R$ ${precoUnitario}` : "",
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 503,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 496,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn btn-block primaria",
                                        style: {
                                            height: "38px",
                                            marginTop: "6px"
                                        },
                                        onClick: handleAdicionarProdutoVenda,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-plus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 518,
                                                columnNumber: 17
                                            }, this),
                                            " Adicionar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "listaProdutosVenda",
                            className: "mb-4 table-responsive quartenary p-2 rounded-lg",
                            style: {
                                maxHeight: "200px",
                                overflowY: "auto"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "table table-sm table-borderless text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "fine-transparent-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Produto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Qtd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Preço Un."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Ação"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 530,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: carrinhoVenda.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                className: "text-center py-3 text-white-75",
                                                children: "Nenhum produto adicionado."
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 541,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 540,
                                            columnNumber: 19
                                        }, this) : carrinhoVenda.map((item)=>{
                                            const subtotalItem = item.quantidade * item.precoUnitario;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "fine-transparent-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            item.nome,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: [
                                                                    "(",
                                                                    item.descricao_variacao,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                                lineNumber: 554,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: item.quantidade
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            item.precoUnitario.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            subtotalItem.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn btn-delete",
                                                            onClick: ()=>handleRemoverProdutoDoCarrinho(item.id_variacao),
                                                            title: "Remover",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["faTrash"]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                                lineNumber: 568,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 559,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, item.id_variacao, true, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 549,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 528,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 523,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "descontoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Desconto (R$)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 581,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "descontoVenda",
                                            placeholder: "0.00",
                                            value: descontoVenda,
                                            onChange: (e)=>handleNumericInputChange(setDescontoVenda, e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 587,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 580,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "acrescimoVenda",
                                            className: "form-label text-white-75 small",
                                            children: "Acréscimo (R$)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 599,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            id: "acrescimoVenda",
                                            placeholder: "0.00",
                                            value: acrescimoVenda,
                                            onChange: (e)=>handleNumericInputChange(setAcrescimoVenda, e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 605,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 598,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-3 d-flex justify-content-between align-items-center border-top",
                style: {
                    borderColor: "rgba(255,255,255,0.1)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-white mb-0",
                            children: [
                                "Total:",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    lineNumber: 626,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 624,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        form: "sales-form-content",
                        className: "btn primaria px-4 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-check-circle mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 636,
                                columnNumber: 11
                            }, this),
                            "Finalizar Venda"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 631,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 619,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
};
_s(SalesForm, "4hB31A7LyGQI58+8n8pCKUeT+jw=");
_c = SalesForm;
const __TURBOPACK__default__export__ = SalesForm;
var _c;
__turbopack_context__.k.register(_c, "SalesForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ui/components/sales/salesDetailComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const formatCurrency = (value)=>{
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return `R$ ${Number(numValue || 0).toFixed(2)}`;
};
const ModalHeader = ({ title, onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center p-3 fine-transparent-border-bottom",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                className: "modal-title text-white mb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-file-invoice-dollar mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 41,
                        columnNumber: 7
                    }, this),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 40,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "close text-white",
                onClick: onClose,
                "aria-label": "Close",
                style: {
                    fontSize: "1.5rem",
                    background: "none",
                    border: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    "aria-hidden": "true",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                    lineNumber: 51,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this);
_c = ModalHeader;
const SaleInfo = ({ sale })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 text-white-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Data e Hora:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 59,
                        columnNumber: 7
                    }, this),
                    " ",
                    `${new Date(sale.data_hora).toLocaleDateString("pt-BR")} - ${new Date(sale.data_hora).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}`
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 58,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Vendedor:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this),
                    " ",
                    sale.funcionario.nome
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 67,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Forma de Pagamento:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 71,
                        columnNumber: 7
                    }, this),
                    " ",
                    sale.forma_pagamento
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, this);
_c1 = SaleInfo;
const ProductsTable = ({ products })=>{
    _s();
    const [productNames, setProductNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const getProductName = async (referencia, id_loja)=>{
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            if (!jwtToken) return "Token não encontrado";
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/produtos/loja/${id_loja}/referencia/${referencia}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                timeout: 2000
            });
            return response.data.data.nome || "Nome não disponível";
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return "Erro ao carregar";
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductsTable.useEffect": ()=>{
            const fetchProductNames = {
                "ProductsTable.useEffect.fetchProductNames": async ()=>{
                    if (!products) return;
                    const names = {};
                    await Promise.all(products.map({
                        "ProductsTable.useEffect.fetchProductNames": async (item)=>{
                            if (item && item.variacao) {
                                const name = await getProductName(item.variacao.referencia_produto, item.variacao.id_loja || "");
                                names[item.variacao.referencia_produto] = name;
                            }
                        }
                    }["ProductsTable.useEffect.fetchProductNames"]));
                    setProductNames(names);
                }
            }["ProductsTable.useEffect.fetchProductNames"];
            fetchProductNames();
        }
    }["ProductsTable.useEffect"], [
        products
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                className: "text-white",
                children: "Produtos:"
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "table-responsive",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "table table-borderless text-white-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "fine-transparent-border-bottom",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Produto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Referência"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Qtd."
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Valor Unit."
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: (products || []).map((item, index)=>item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "fine-transparent-border-bottom",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: item.variacao && productNames[item.variacao.referencia_produto] || "Carregando..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 148,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: item.variacao?.referencia_produto
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 153,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: item.quantidade
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 154,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: formatCurrency(item.preco_unitario)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: formatCurrency(item.quantidade * parseFloat(item.preco_unitario))
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                            lineNumber: 156,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                    lineNumber: 147,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
};
_s(ProductsTable, "1rN6eKq9bvlIzfI41vlOsNlyQl8=");
_c2 = ProductsTable;
const SaleSummary = ({ sale, subtotalProdutos })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 text-white-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Subtotal Produtos:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 174,
                        columnNumber: 7
                    }, this),
                    " ",
                    formatCurrency(subtotalProdutos)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 173,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Desconto:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 177,
                        columnNumber: 7
                    }, this),
                    " ",
                    formatCurrency(sale.desconto)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 176,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Acréscimo:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 180,
                        columnNumber: 7
                    }, this),
                    " ",
                    formatCurrency(sale.acrescimo)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 179,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                className: "text-right text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Valor Total:"
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 183,
                        columnNumber: 7
                    }, this),
                    " ",
                    formatCurrency(sale.total)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 182,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 172,
        columnNumber: 3
    }, this);
_c3 = SaleSummary;
const ModalFooter = ({ onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-end p-3 fine-transparent-border-top",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "btn primaria mx-2 footerButton",
            onClick: onClose,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fas fa-times mr-1"
                }, void 0, false, {
                    fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                    lineNumber: 195,
                    columnNumber: 7
                }, this),
                "Fechar"
            ]
        }, void 0, true, {
            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
            lineNumber: 190,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 189,
        columnNumber: 3
    }, this);
_c4 = ModalFooter;
const SalesDetail = ({ show, onClose, sale })=>{
    if (!show || !sale) {
        return null;
    }
    const subtotalProdutos = (sale.itens || []).reduce((sum, item)=>{
        if (!item) return sum;
        return sum + item.quantidade * parseFloat(item.preco_unitario);
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal fade show",
        style: {
            display: "block",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        tabIndex: -1,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-dialog modal-lg modal-dialog-centered",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-content quinary small-shadow fine-transparent-border",
                style: {
                    borderRadius: "20px",
                    color: "white"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalHeader, {
                        title: `Detalhes da Venda`,
                        onClose: onClose
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-body p-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SaleInfo, {
                                sale: sale
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                className: "m-0 fine-transparent-border"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductsTable, {
                                products: sale.itens
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                className: "m-0 fine-transparent-border"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SaleSummary, {
                                sale: sale,
                                subtotalProdutos: subtotalProdutos
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalFooter, {
                        onClose: onClose
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
                lineNumber: 221,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
            lineNumber: 220,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/components/sales/salesDetailComponent.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
};
_c5 = SalesDetail;
const __TURBOPACK__default__export__ = SalesDetail;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ModalHeader");
__turbopack_context__.k.register(_c1, "SaleInfo");
__turbopack_context__.k.register(_c2, "ProductsTable");
__turbopack_context__.k.register(_c3, "SaleSummary");
__turbopack_context__.k.register(_c4, "ModalFooter");
__turbopack_context__.k.register(_c5, "SalesDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ui/components/sales/salesListComponent.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesDetailComponent.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/react-fontawesome/index.es.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const ITEMS_PER_PAGE = 5;
const SalesList = ({ salesData = [], idLoja })=>{
    _s();
    const [allSales, setAllSales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSale, setSelectedSale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const jwtToken = localStorage.getItem("jwtToken");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesList.useEffect": ()=>{
            const fetchSales = {
                "SalesList.useEffect.fetchSales": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/vendas/loja/${idLoja}/paginado?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`
                            }
                        });
                        if (response.data?.success) {
                            setAllSales(response.data.data || []);
                            setTotalPages(response.data.totalPages || 1);
                            console.log(response.data);
                        }
                    } catch (err) {
                        console.error("Erro ao buscar vendas:", err);
                        setError("Não foi possível carregar as vendas do servidor.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["SalesList.useEffect.fetchSales"];
            fetchSales();
        }
    }["SalesList.useEffect"], [
        idLoja,
        currentPage,
        jwtToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesList.useEffect": ()=>{
            if (salesData && salesData.length > 0) {
                setAllSales({
                    "SalesList.useEffect": (prevSales)=>{
                        const newSalesToAdd = salesData.filter({
                            "SalesList.useEffect.newSalesToAdd": (newSale)=>!prevSales.some({
                                    "SalesList.useEffect.newSalesToAdd": (s)=>s.id_venda === newSale.id_venda
                                }["SalesList.useEffect.newSalesToAdd"])
                        }["SalesList.useEffect.newSalesToAdd"]);
                        return [
                            ...newSalesToAdd,
                            ...prevSales
                        ];
                    }
                }["SalesList.useEffect"]);
            }
        }
    }["SalesList.useEffect"], [
        salesData
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
    const deleteSale = async (saleId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`http://localhost:9700/api/vendas/${saleId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setAllSales((prevSales)=>prevSales.filter((sale)=>sale.id_venda !== saleId));
        } catch (err) {
            console.error("Erro ao deletar venda:", err);
            setError("Erro ao deletar venda");
            setTimeout(()=>setError(null), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "quinary p-5 pb-4 small-shadow mx-auto rounded-5 w-75",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                    className: "mb-0 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-list-ul mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        "Vendas Registradas"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-white py-4",
                children: "Carregando vendas..."
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-danger py-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 110,
                columnNumber: 17
            }, this),
            !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "table-responsive quartenary p-3 rounded-lg mb-4 ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "table table-sm table-borderless text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "fine-transparent-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Data"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Vendedor"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Valor Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold",
                                                children: "Pagamento"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "small font-weight-bold text-center",
                                                children: "Ações"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: allSales && allSales.length > 0 ? allSales.map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "fine-transparent-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: new Date(sale.data_hora).toLocaleString("pt-BR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: sale.funcionario.nome
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "font-weight-medium",
                                                    children: [
                                                        "R$ ",
                                                        parseFloat(sale.total).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: sale.forma_pagamento
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "btn-group",
                                                        role: "group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn btn-sm",
                                                                style: {
                                                                    backgroundColor: "#dc3545",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "0.375rem 0.5rem",
                                                                    borderRadius: "50%",
                                                                    width: "32px",
                                                                    height: "32px"
                                                                },
                                                                title: "Excluir",
                                                                onClick: ()=>deleteSale(sale.id_venda),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["faTrash"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn btn-sm",
                                                                style: {
                                                                    backgroundColor: "#17a2b8",
                                                                    color: "white",
                                                                    border: "none",
                                                                    padding: "0.375rem 0.5rem",
                                                                    borderRadius: "50%",
                                                                    width: "32px",
                                                                    height: "32px"
                                                                },
                                                                title: "Visualizar",
                                                                onClick: ()=>openModalWithSale(sale),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["faEye"]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, sale.id_venda, true, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 128,
                                            columnNumber: 21
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "text-center py-4 text-white-75",
                                            children: "Nenhuma venda encontrada."
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 184,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 183,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "Navegação de páginas",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "d-flex justify-content-center align-items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2 ${currentPage === 1 ? "btn-secondary" : "btn-outline-light"}`,
                                    onClick: ()=>handlePageChange(currentPage - 1),
                                    disabled: currentPage === 1,
                                    style: {
                                        minWidth: "80px"
                                    },
                                    children: "Anterior"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 196,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mx-3 text-white",
                                    children: [
                                        "Página ",
                                        currentPage,
                                        " de ",
                                        totalPages
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2 ${currentPage === totalPages ? "btn-secondary" : "btn-outline-light"}`,
                                    onClick: ()=>handlePageChange(currentPage + 1),
                                    disabled: currentPage === totalPages,
                                    style: {
                                        minWidth: "80px"
                                    },
                                    children: "Próxima"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 194,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            selectedSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesDetailComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                show: isModalOpen,
                onClose: closeModal,
                sale: selectedSale
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
};
_s(SalesList, "A2ItvrFUW1ujzMhyXL2SKSXJpKs=");
_c = SalesList;
const __TURBOPACK__default__export__ = SalesList;
var _c;
__turbopack_context__.k.register(_c, "SalesList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/salesPage.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SalesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesFormComponent.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ui/components/sales/salesListComponent.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function SalesPage() {
    _s();
    const [registeredSales, setRegisteredSales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [produtosDisponiveis, setProdutosDisponiveis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [vendedoresDisponiveis, setVendedoresDisponiveis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [idloja, setIdloja] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesPage.useEffect": ()=>{
            const jwtToken = localStorage.getItem("jwtToken");
            const userData = localStorage.getItem("userData");
            if (!jwtToken || !userData) {
                router.push("/initialPage");
                return;
            }
            const fetchData = {
                "SalesPage.useEffect.fetchData": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        const parsedData = JSON.parse(userData);
                        const idLoja = parsedData.id_loja;
                        setIdloja(idLoja);
                        const config = {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`
                            }
                        };
                        const [vendedoresRes, produtosRes] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/funcionarios/loja/${idLoja}`, config),
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/produtos/loja/${idLoja}`, config)
                        ]);
                        if (vendedoresRes.data?.success) {
                            setVendedoresDisponiveis(vendedoresRes.data.data);
                        }
                        if (produtosRes.data?.success) {
                            const produtosDaApi = produtosRes.data.data;
                            const variacoesFormatadas = produtosDaApi.flatMap({
                                "SalesPage.useEffect.fetchData.variacoesFormatadas": (produto)=>produto.variacoes.map({
                                        "SalesPage.useEffect.fetchData.variacoesFormatadas": (variacao)=>({
                                                ...variacao,
                                                preco_venda: parseFloat(variacao.valor),
                                                produto: {
                                                    nome: produto.nome,
                                                    referencia: produto.referencia
                                                }
                                            })
                                    }["SalesPage.useEffect.fetchData.variacoesFormatadas"])
                            }["SalesPage.useEffect.fetchData.variacoesFormatadas"]);
                            setProdutosDisponiveis(variacoesFormatadas);
                        }
                    } catch (err) {
                        console.error("Erro ao buscar dados iniciais:", err);
                        setError("Não foi possível carregar os dados do servidor.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["SalesPage.useEffect.fetchData"];
            fetchData();
        }
    }["SalesPage.useEffect"], [
        router
    ]);
    const showCustomMessage = (msg, type = "info")=>{
        alert(`[${type.toUpperCase()}] ${msg}`);
    };
    const handleNewSaleRegistered = (newSale)=>{
        setRegisteredSales((prevSales)=>[
                newSale,
                ...prevSales
            ]);
    };
    const pushBackToMenu = ()=>{
        router.push("menuPage");
    };
    const toggleView = (view)=>{
        setActiveView((current)=>current === view ? null : view);
    };
    const jwtToken = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("jwtToken") : ("TURBOPACK unreachable", undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "d-flex justify-content-between align-items-center flex-column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Registro de Vendas - VL Store"
                }, void 0, false, {
                    fileName: "[project]/src/pages/salesPage.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "header-panel position-relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn primaria position-absolute top-0 end-0 px-3 py-1 shadow",
                        onClick: pushBackToMenu,
                        children: "Voltar"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "img logo",
                        src: "/vl-store-logo-white.svg",
                        alt: "VL Store Logo"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-fluid px-6 pt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col d-flex gap-3 justify-content-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2`,
                                    onClick: ()=>toggleView("form"),
                                    children: activeView === "form" ? "Fechar Formulário" : "Adicionar Venda"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `btn primaria px-4 py-2`,
                                    onClick: ()=>toggleView("list"),
                                    children: activeView === "list" ? "Fechar Lista" : "Listar Vendas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/salesPage.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-white",
                        children: "Carregando dados..."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-danger",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 161,
                        columnNumber: 19
                    }, this),
                    !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            activeView === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesFormComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    onSaleRegistered: handleNewSaleRegistered,
                                    vendedoresDisponiveis: vendedoresDisponiveis,
                                    produtosDisponiveis: produtosDisponiveis,
                                    jwtToken: jwtToken || undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this),
                            activeView === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    idLoja: idloja
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 180,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this),
                            !activeView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-12 text-center py-5 text-center text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "",
                                    children: "Selecione uma opção acima para começar"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/salesPage.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/salesPage.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(SalesPage, "s/TNd9S+2/ECS6oTulRCNJqOp+M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SalesPage;
var _c;
__turbopack_context__.k.register(_c, "SalesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/salesPage.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/salesPage";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/salesPage.tsx [client] (ecmascript)");
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
"[project]/src/pages/salesPage (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/salesPage.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__33b9cf8b._.js.map