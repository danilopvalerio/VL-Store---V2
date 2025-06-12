import React from 'react';

const formatCurrency = (value) => `R$ ${Number(value || 0).toFixed(2)}`;

const ModalHeader = ({ title, onClose }) => (
  <div className="d-flex justify-content-between align-items-center p-3 fine-transparent-border-bottom">
    <h5 className="modal-title text-white mb-0">
      <i className="fas fa-file-invoice-dollar mr-2"></i>{title}
    </h5>
    <button type="button" className="close text-white" onClick={onClose} aria-label="Close" style={{ fontSize: '1.5rem', background: 'none', border: 'none' }}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

const SaleInfo = ({ sale }) => (
  <div className="p-3 text-white-50">
    <p><strong>Código da Venda:</strong> {sale.id_venda}</p>
    <p><strong>Data e Hora:</strong> {sale.data_hora}</p>
    <p><strong>Vendedor:</strong> {sale.funcionario.nome}</p>
    <p className="mb-0"><strong>Forma de Pagamento:</strong> {sale.forma_pagamento}</p>
  </div>
);

const ProductsTable = ({ products }) => (
  <div className="p-3">
    <h6 className="text-white">Produtos:</h6>
    <div className="table-responsive">
      <table className="table table-borderless text-white-50">
        <thead className="fine-transparent-border-bottom">
          <tr>
            <th>Produto</th>
            <th>Referência</th>
            <th>Qtd.</th>
            <th>Valor Unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {(products || []).map((itens, index) => (
            <tr key={index} className="fine-transparent-border-bottom">
              <td>{itens.nome}</td>
              <td>{itens.variacao.referencia_produto}</td>
              <td>{itens.quantidade}</td>
              <td>{formatCurrency(itens.preco_unitario)}</td>
              <td>{formatCurrency(itens.quantidade * itens.preco_unitario)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SaleSummary = ({ sale, subtotalProdutos }) => (
  <div className="p-3 text-white-50">
    <p><strong>Subtotal Produtos:</strong> {formatCurrency(subtotalProdutos)}</p>
    <p><strong>Desconto:</strong> {formatCurrency(sale.desconto)}</p>
    <p><strong>Acréscimo:</strong> {formatCurrency(sale.acrescimo)}</p>
    <h5 className="text-right text-white">
      <strong>Valor Total:</strong> {formatCurrency(sale.total)}
    </h5>
  </div>
);

const ModalFooter = ({ onClose }) => (
  <div className="d-flex justify-content-end p-3 fine-transparent-border-top">
    <button type="button" className="btn primaria mx-2 footerButton" onClick={onClose}>
      <i className="fas fa-times mr-1"></i>Editar
    </button>
    <button type="button" className="btn primaria mx-2 footerButton" onClick={onClose}>
      <i className="fas fa-times mr-1"></i>Fechar
    </button>
  </div>
);

const SalesDetail = ({ show, onClose, sale }) => {
  if (!show || !sale) {
    return null;
  }

  const subtotalProdutos = (sale.itens || []).reduce((sum, itens) => sum + (itens.quantidade * itens.preco_unitario), 0);

  return (
    <div className="modal fade show" style={{ display: 'block', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content quinary small-shadow fine-transparent-border" style={{ borderRadius: '20px', color: 'white' }}>
          
          <ModalHeader title={`Detalhes da Venda - ${sale.id_venda}`} onClose={onClose} />
          
          <div className="modal-body p-0">
            <SaleInfo sale={sale} />
            <hr className="m-0 fine-transparent-border" />
            <ProductsTable products={sale.itens} />
            <hr className="m-0 fine-transparent-border" />
            <SaleSummary sale={sale} subtotalProdutos={subtotalProdutos} />
          </div>

          <ModalFooter onClose={onClose} />

        </div>
      </div>
    </div>
  );
};

export default SalesDetail;