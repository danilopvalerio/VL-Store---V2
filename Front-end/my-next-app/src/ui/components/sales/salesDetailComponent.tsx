const SalesDetail = ({ show, onClose, sale }) => {
  if (!show || !sale) {
    return null;
  }

  const subtotalProdutos = sale.produtos.reduce((sum: number, item) => sum + (item.quantidade * item.precoUnitario), 0);

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-8px">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title"><i className="fas fa-file-invoice-dollar mr-2"></i>Detalhes da Venda - {sale.codigoVenda}</h5>
            <button type="button" className="close text-white" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Código da Venda:</strong> {sale.codigoVenda}</p>
            <p><strong>Data e Hora:</strong> {sale.data}</p>
            <p><strong>Vendedor:</strong> {sale.vendedor}</p>
            <p><strong>Forma de Pagamento:</strong> {sale.pagamento}</p>
            <hr />
            <h6>Produtos:</h6>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Referência</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {sale.produtos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.referencia}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.precoUnitario.toFixed(2)}</td>
                    <td>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <p><strong>Subtotal Produtos:</strong> R$ {subtotalProdutos.toFixed(2)}</p>
            <p><strong>Desconto:</strong> R$ {sale.desconto.toFixed(2)}</p>
            <p><strong>Acréscimo:</strong> R$ {sale.acrescimo.toFixed(2)}</p>
            <h5 className="text-right"><strong>Valor Total:</strong> R$ {sale.total.toFixed(2)}</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary rounded-20px" onClick={onClose}>
              <i className="fas fa-times mr-1"></i>Fechar
            </button>
            <button type="button" className="btn btn-primary rounded-20px">
              <i className="fas fa-print mr-1"></i>Imprimir Recibo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;