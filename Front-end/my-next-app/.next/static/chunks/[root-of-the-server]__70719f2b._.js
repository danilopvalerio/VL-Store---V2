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
        className: "quinary text-white p-4 rounded-5 white-light-small d-flex flex-column w-75 mx-auto h-100",
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
                            className: "row g-2 align-items-baseline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "d-flex flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "produtoVenda",
                                                className: "form-label text-white-75 small mb-1",
                                                style: {
                                                    height: "20px"
                                                },
                                                children: "Produto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "d-flex align-items-center",
                                                style: {
                                                    height: "38px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "form-control input-form border-end-0",
                                                        placeholder: "Buscar produto...",
                                                        style: {
                                                            height: "100%"
                                                        },
                                                        value: produtoSearchTerm,
                                                        onChange: (e)=>{
                                                            setProdutoSearchTerm(e.target.value);
                                                            setShowProductDropdown(true);
                                                        },
                                                        onFocus: ()=>setShowProductDropdown(true),
                                                        onBlur: ()=>setTimeout(()=>setShowProductDropdown(false), 200)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 433,
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
                                                            lineNumber: 457,
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
                                                                lineNumber: 462,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 432,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "d-flex flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "quantidadeProduto",
                                                className: "form-label text-white-75 small mb-1",
                                                style: {
                                                    height: "20px"
                                                },
                                                children: "Quantidade"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 485,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "form-control input-form",
                                                id: "quantidadeProduto",
                                                value: quantidadeProduto,
                                                style: {
                                                    height: "38px",
                                                    padding: "0.375rem 0.5rem"
                                                },
                                                onChange: (e)=>setQuantidadeProduto(parseInt(e.target.value, 10) || 1),
                                                min: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 491,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "d-flex flex-column",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "precoUnitario",
                                                className: "form-label text-white-75 small mb-1",
                                                style: {
                                                    height: "20px"
                                                },
                                                children: "Preço Un."
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 506,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "form-control input-form",
                                                id: "precoUnitario",
                                                value: precoUnitario ? `R$ ${precoUnitario}` : "",
                                                style: {
                                                    height: "38px",
                                                    padding: "0.375rem 0.5rem"
                                                },
                                                readOnly: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 512,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 504,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-2 d-flex flex-column",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: "20px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 523,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "btn primaria d-flex align-items-center justify-content-center",
                                            style: {
                                                height: "38px",
                                                padding: "0.375rem 0.75rem",
                                                lineHeight: "1.5"
                                            },
                                            onClick: handleAdicionarProdutoVenda,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-plus"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 17
                                                }, this),
                                                " Adicionar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 524,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 522,
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
                                                    lineNumber: 547,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Qtd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Preço Un."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Ação"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 546,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 545,
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
                                                lineNumber: 557,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                            lineNumber: 556,
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
                                                                lineNumber: 570,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: item.quantidade
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 572,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            item.precoUnitario.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: [
                                                            "R$ ",
                                                            subtotalItem.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 574,
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
                                                                lineNumber: 584,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, item.id_variacao, true, {
                                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                                lineNumber: 565,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                lineNumber: 544,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 539,
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
                                            lineNumber: 597,
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
                                            lineNumber: 603,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 596,
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
                                            lineNumber: 615,
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
                                            lineNumber: 621,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                                    lineNumber: 614,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 595,
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
                                    lineNumber: 642,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                            lineNumber: 640,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 639,
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
                                lineNumber: 652,
                                columnNumber: 11
                            }, this),
                            "Finalizar Venda"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                        lineNumber: 647,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesFormComponent.tsx",
                lineNumber: 635,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/react-fontawesome/index.es.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [client] (ecmascript)"); // Importar ícone de busca
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const ITEMS_PER_PAGE = 5;
const SalesList = ({ salesData = [], idLoja, vendedoresDisponiveis = [] })=>{
    _s();
    const [allSales, setAllSales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSale, setSelectedSale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        forma_pagamento: "",
        data_inicio: "",
        data_fim: "",
        vendedor_id: ""
    });
    // --- INÍCIO DAS NOVAS ALTERAÇÕES ---
    // Estados para a busca de vendedor no filtro
    const [vendedorSearchTerm, setVendedorSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [foundVendedores, setFoundVendedores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showVendedorDropdown, setShowVendedorDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // --- FIM DAS NOVAS ALTERAÇÕES ---
    const jwtToken = localStorage.getItem("jwtToken");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesList.useEffect": ()=>{
            const fetchSales = {
                "SalesList.useEffect.fetchSales": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        // --- ALTERAÇÃO AQUI: Correção no filtro de data ---
                        // Garante que o filtro `data_fim` inclua todas as vendas do dia selecionado.
                        const params = new URLSearchParams({
                            page: currentPage.toString(),
                            limit: ITEMS_PER_PAGE.toString(),
                            ...filters.forma_pagamento && {
                                forma_pagamento: filters.forma_pagamento
                            },
                            ...filters.data_inicio && {
                                data_inicio: filters.data_inicio
                            },
                            ...filters.data_fim && {
                                data_fim: `${filters.data_fim}T23:59:59`
                            },
                            ...filters.vendedor_id && {
                                funcionario_id: filters.vendedor_id
                            }
                        });
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:9700/api/vendas/loja/${idLoja}/paginado?${params.toString()}`, {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`
                            }
                        });
                        if (response.data?.success) {
                            setAllSales(response.data.data || []);
                            setTotalPages(response.data.totalPages || 1);
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
        jwtToken,
        filters
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
    // --- INÍCIO DAS NOVAS ALTERAÇÕES ---
    // Função para buscar vendedores no filtro
    const handleVendedorSearch = ()=>{
        const term = vendedorSearchTerm.toLowerCase().trim();
        if (term) {
            const results = vendedoresDisponiveis.filter((v)=>v.nome.toLowerCase().includes(term));
            setFoundVendedores(results);
        } else {
            setFoundVendedores(vendedoresDisponiveis); // Mostra todos se a busca for vazia
        }
        setShowVendedorDropdown(true);
    };
    const handleSelectVendedor = (vendedor)=>{
        setFilters((prev)=>({
                ...prev,
                vendedor_id: vendedor.id_funcionario
            }));
        setVendedorSearchTerm(vendedor.nome); // Preenche o input com o nome selecionado
        setShowVendedorDropdown(false);
    };
    // --- FIM DAS NOVAS ALTERAÇÕES ---
    const handleFilterChange = (e)=>{
        const { name, value } = e.target;
        setFilters((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    // --- ALTERAÇÃO AQUI: Atualiza a função de limpar filtros ---
    const resetFilters = ()=>{
        setFilters({
            forma_pagamento: "",
            data_inicio: "",
            data_fim: "",
            vendedor_id: ""
        });
        setVendedorSearchTerm("");
        setFoundVendedores([]);
        setShowVendedorDropdown(false);
        setCurrentPage(1);
    };
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
    // ... (função sem alterações)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "quinary p-5 pb-4 mb-5 mx-auto white-light-small w-75 rounded-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 mx-auto d-flex justify-content-between align-items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                        className: "mb-0 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-list-ul mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            "Vendas Registradas"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-sm primaria",
                        onClick: ()=>setShowFilters(!showFilters),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["faFilter"],
                                className: "mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            showFilters ? "Ocultar Filtros" : "Filtrar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            showFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "quartenary p-3 rounded-lg mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "row g-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-md-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "form-label text-white-75 small",
                                    children: "Forma de Pagamento"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    name: "forma_pagamento",
                                    className: "form-select input-form",
                                    value: filters.forma_pagamento,
                                    onChange: handleFilterChange,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Todas"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "DINHEIRO",
                                            children: "Dinheiro"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "CARTAO_CREDITO",
                                            children: "Cartão Crédito"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "CARTAO_DEBITO",
                                            children: "Cartão Débito"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "PIX",
                                            children: "PIX"
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-md-3 position-relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "form-label text-white-75 small",
                                    children: "Vendedor"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "input-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control input-form",
                                            placeholder: "Buscar vendedor...",
                                            value: vendedorSearchTerm,
                                            onChange: (e)=>setVendedorSearchTerm(e.target.value),
                                            onBlur: ()=>setTimeout(()=>setShowVendedorDropdown(false), 200)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-secondary",
                                            type: "button",
                                            onClick: handleVendedorSearch,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$index$2e$es$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["faSearch"]
                                            }, void 0, false, {
                                                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                                lineNumber: 228,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this),
                                showVendedorDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-group position-absolute w-100 mt-1 z-index-dropdown bg-dark border border-secondary rounded shadow-sm",
                                    style: {
                                        maxHeight: "150px",
                                        overflowY: "auto"
                                    },
                                    children: foundVendedores.length > 0 ? foundVendedores.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "list-group-item bg-dark text-white cursor-pointer hover-light",
                                            onMouseDown: ()=>handleSelectVendedor(v),
                                            children: v.nome
                                        }, v.id_funcionario, false, {
                                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                            lineNumber: 238,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "list-group-item text-white bg-dark",
                                        children: "Nenhum vendedor encontrado"
                                    }, void 0, false, {
                                        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                        lineNumber: 247,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-md-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "form-label text-white-75 small",
                                    children: "Data Início"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    name: "data_inicio",
                                    className: "form-control input-form",
                                    value: filters.data_inicio,
                                    onChange: handleFilterChange
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-md-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "form-label text-white-75 small",
                                    children: "Data Fim"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    name: "data_fim",
                                    className: "form-control input-form",
                                    value: filters.data_fim,
                                    onChange: handleFilterChange
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 269,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-12 d-flex justify-content-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-sm btn-outline-light",
                                    onClick: resetFilters,
                                    children: "Limpar Filtros"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-sm primaria",
                                    onClick: ()=>setCurrentPage(1),
                                    children: "Aplicar Filtros"
                                }, void 0, false, {
                                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                    lineNumber: 190,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/ui/components/sales/salesListComponent.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
};
_s(SalesList, "3E5kAGC+9CsV7oj1ZUsxKK9I+mw=");
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
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("list"); // Inicia com "list" ativo
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
    const switchToView = (view)=>{
        setActiveView(view);
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
                                    className: `btn primaria text-white px-4 py-2`,
                                    onClick: ()=>switchToView("form"),
                                    disabled: activeView === "form",
                                    children: "Adicionar Venda"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `btn primaria text-white px-4 py-2`,
                                    onClick: ()=>switchToView("list"),
                                    disabled: activeView === "list",
                                    children: "Listar Vendas"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 150,
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
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-danger",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 163,
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
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this),
                            activeView === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$components$2f$sales$2f$salesListComponent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    idLoja: idloja
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/salesPage.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/salesPage.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/salesPage.tsx",
                        lineNumber: 166,
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
_s(SalesPage, "XazxvgYYeVHIV9RbcobAMFHLDSE=", false, function() {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__70719f2b._.js.map