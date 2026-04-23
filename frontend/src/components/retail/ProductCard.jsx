const ProductCard = ({product, onClick}) => {
    return (
        <div className="pos-card" onClick={() => onClick(product)}
        >
        <div className="pos-card__badge">{product.category}</div>
                <h4 className="pos-card__title">{product.name}</h4>
                <p className="pos-card__price">₱{product.price}</p>
                <small className="pos-card__stock">{product.stock} in stock</small>
        </div>
    );
  };

export default ProductCard;