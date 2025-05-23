import { ProductCardProps } from "../../../domain/interfaces/products-interface"

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  return (
    <div className="product-card">  
      <p className="product-name">{product.nome}</p>
      <p className="product-info">Categoria: {product.categoria}</p>
      <p className="product-info">Material: {product.material}</p>
      <button className="details-button">Detalhes</button>
    </div>
  );
};

export default ProductCard;