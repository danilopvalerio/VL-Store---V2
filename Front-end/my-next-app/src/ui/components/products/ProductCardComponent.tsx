import { ProductCardProps } from "../../../domain/interfaces/products-interface";
const produtoExemplo = {
  nome: "Camisa",
  categoria: "Roupas",
  material: "Algodão",
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="col-12 col-md-3 product-card rounded-5 p-3 d-flex justify-content-center flex-column">
      <p className="mt-2 card-title secondary p-1 m-1">{product.nome}</p>
      <p className="card-title secondary p-1 m-1">
        Categoria: {product.categoria}
      </p>
      <p className="card-title secondary p-1 m-1">
        Material: {product.material}
      </p>
      <p className="card-title secondary p-1 m-1">Preço: R$ 29,90</p>
      <button id="product-detail" className="btn primaria w-100 mt-2">
        Detalhes
      </button>
    </div>
  );
};

export default ProductCard;
