import React, { useState, useEffect, useMemo } from 'react';
interface Product { id: string; nome: string; referencia: string; preco: number; }
interface CartItem { id: string; nome: string; referencia: string; quantidade: number; precoUnitario: number; }
interface Seller { id: string; nome: string; cargo?: string; }
interface SalePayload { codigoVenda: string; data: string; vendedor: string; vendedorId: string; formaPagamento: string; produtos: CartItem[]; desconto: number; acrescimo: number; valorTotal: number; }
interface SalesFormProps { onSaleRegistered: (sale: SalePayload) => void; showMessage: (message: string, type: 'info' | 'success' | 'warning' | 'danger') => void; }

const produtosDisponiveis: Product[] = [];
const vendedoresDisponiveis: Seller[] = [];


const SalesForm: React.FC<SalesFormProps> = ({ onSaleRegistered, showMessage }) => {
  const generateSaleCode = () => `VENDA-${Math.floor(Math.random() * 90000) + 10000}`;
  const [codigoVenda, setCodigoVenda] = useState<string>(generateSaleCode());
  const [vendedorResponsavelId, setVendedorResponsavelId] = useState<string>('');
  const [dataVenda, setDataVenda] = useState<string>('');
  const [formaPagamento, setFormaPagamento] = useState<string>('');
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<string>('');
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [precoUnitario, setPrecoUnitario] = useState<string>('');
  const [carrinhoVenda, setCarrinhoVenda] = useState<CartItem[]>([]);
  const [descontoVenda, setDescontoVenda] = useState<string>("0.00");
  const [acrescimoVenda, setAcrescimoVenda] = useState<string>("0.00");

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setDataVenda(now.toISOString().slice(0, 16));
  }, []);
  useEffect(() => {
    if (produtoSelecionadoId) {
      const produto = produtosDisponiveis.find(p => p.id === produtoSelecionadoId);
      setPrecoUnitario(produto ? produto.preco.toFixed(2) : '');
    } else {
      setPrecoUnitario('');
    }
  }, [produtoSelecionadoId]);
  const valorTotalVenda = useMemo(() => {
    let subtotalProdutos = carrinhoVenda.reduce((sum, item) => sum + (item.quantidade * item.precoUnitario), 0);
    const descontoNum = parseFloat(descontoVenda) || 0;
    const acrescimoNum = parseFloat(acrescimoVenda) || 0;
    return subtotalProdutos - descontoNum + acrescimoNum;
  }, [carrinhoVenda, descontoVenda, acrescimoVenda]);

  const handleAdicionarProdutoVenda = () => { };
  const handleRemoverProdutoDoCarrinho = (produtoId: string) => { };
  const handleSubmitVenda = (event: React.FormEvent<HTMLFormElement>) => { };
  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => { };


return (
  <div className="terciary p-4 rounded-20px small-shadow d-flex flex-column h-100">
    {/* 1. Título */}
    <div className="mb-3">
      <h5 className="mb-0 text-white"><i className="fas fa-plus-circle mr-2"></i>Registrar Nova Venda</h5>
    </div>
    
    {/* 2. Corpo do Formulário (Rolável) */}
    <div className="flex-grow-1" style={{ overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
      <form id="sales-form-content" onSubmit={handleSubmitVenda}>
        {/* Linha 1: Código da Venda e Vendedor */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="codigoVenda" className="form-label text-white-75 small">Código da Venda</label>
            <input type="text" className="form-control input-form" id="codigoVenda" value={codigoVenda} readOnly />
            <small className="form-text text-white-50">Gerado automaticamente.</small>
          </div>
          <div className="col-md-6">
            <label htmlFor="vendedorResponsavel" className="form-label text-white-75 small">Vendedor Responsável</label>
            <select id="vendedorResponsavel" className="form-control custom-select input-form" value={vendedorResponsavelId} onChange={(e) => setVendedorResponsavelId(e.target.value)} required>
              <option value="" disabled className="text-gray-500">Selecione...</option>
              {vendedoresDisponiveis.map(vendedor => (<option key={vendedor.id} value={vendedor.id} className="text-black">{vendedor.nome} ({vendedor.cargo})</option>))}
            </select>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="dataVenda" className="form-label text-white-75 small">Data e Hora</label>
            <input type="datetime-local" className="form-control input-form" id="dataVenda" value={dataVenda} onChange={(e) => setDataVenda(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="formaPagamento" className="form-label text-white-75 small">Forma de Pagamento</label>
            <select id="formaPagamento" className="form-control custom-select input-form" value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} required>
              <option value="" disabled className="text-gray-500">Selecione...</option>
              <option value="Dinheiro" className="text-black">Dinheiro</option>
              <option value="Cartão de Crédito" className="text-black">Cartão de Crédito</option>
              <option value="Cartão de Débito" className="text-black">Cartão de Débito</option>
              <option value="PIX" className="text-black">PIX</option>
            </select>
          </div>
        </div>

        <h6 className="mb-3 text-white"><i className="fas fa-shopping-basket mr-2"></i>Produtos da Venda</h6>
        
        <div className="row align-items-end mb-3">
          <div className="col-md-5">
            <label htmlFor="produtoVenda" className="form-label text-white-75 small">Produto</label>
            <select id="produtoVenda" className="form-control custom-select input-form" value={produtoSelecionadoId} onChange={(e) => setProdutoSelecionadoId(e.target.value)}>
              <option value="" disabled className="text-gray-500">Selecione...</option>
              {produtosDisponiveis.map(p => (<option key={p.id} value={p.id} className="text-black">{p.nome} (REF: {p.referencia})</option>))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="quantidadeProduto" className="form-label text-white-75 small">Quantidade</label>
            <input type="number" className="form-control input-form" id="quantidadeProduto" value={quantidadeProduto} onChange={(e) => setQuantidadeProduto(parseInt(e.target.value, 10) || 1)} min="1" />
          </div>
          <div className="col-md-2">
            <label htmlFor="precoUnitario" className="form-label text-white-75 small">Preço Un.</label>
            <input type="text" className="form-control input-form" id="precoUnitario" value={precoUnitario ? `R$ ${precoUnitario}` : ''} readOnly />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-block primaria" style={{height: '38px', marginTop: '6px'}} onClick={handleAdicionarProdutoVenda}><i className="fas fa-plus"></i>Adicionar</button>
          </div>
        </div>

        <div id="listaProdutosVenda" className="mb-4 table-responsive quartenary p-2 rounded-lg" style={{ maxHeight: '200px', overflowY: 'auto' }}>
           <table className="table table-sm table-borderless text-white">
            <thead><tr className="fine-transparent-border"><th>Produto</th><th>Qtd</th><th>Preço Un.</th><th>Subtotal</th><th>Ação</th></tr></thead>
            <tbody>
              {carrinhoVenda.length === 0 ? (<tr><td colSpan={5} className="text-center py-3 text-white-75">Nenhum produto adicionado.</td></tr>) : (
                carrinhoVenda.map(item => {
                  const subtotalItem = item.quantidade * item.precoUnitario;
                  return (<tr key={item.id} className="fine-transparent-border"><td>{item.nome}</td><td>{item.quantidade}</td><td>R$ {item.precoUnitario.toFixed(2)}</td><td>R$ {subtotalItem.toFixed(2)}</td><td><button type="button" className="btn btn-delete" onClick={() => handleRemoverProdutoDoCarrinho(item.id)} title="Remover"><i className="fas fa-trash-alt"></i></button></td></tr>);
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="descontoVenda" className="form-label text-white-75 small">Desconto (R$)</label>
            <input type="text" className="form-control input-form" id="descontoVenda" placeholder="0.00" value={descontoVenda} onChange={(e) => handleNumericInputChange(setDescontoVenda, e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="acrescimoVenda" className="form-label text-white-75 small">Acréscimo (R$)</label>
            <input type="text" className="form-control input-form" id="acrescimoVenda" placeholder="0.00" value={acrescimoVenda} onChange={(e) => handleNumericInputChange(setAcrescimoVenda, e.target.value)} />
          </div>
        </div>
      </form>
    </div>

    <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <div>
        <h4 className="text-white mb-0">
          Total: <span className="font-weight-bold" style={{color: '#86efac'}}>R$ {valorTotalVenda.toFixed(2)}</span>
        </h4>
      </div>

      <button type="submit" form="sales-form-content" className="btn primaria px-4 py-2">
        <i className="fas fa-check-circle mr-2"></i>Finalizar Venda
      </button>
    </div>
  </div>
);
}


export default SalesForm;