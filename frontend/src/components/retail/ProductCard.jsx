const ProductCard = ({product, onClick}) => {
    const isOutOfStock = product.stock === 0;

    return (
            <div className={`pos-card ${isOutOfStock ? "product-card--disabled" : ""}`}
      onClick={() => {
        if (isOutOfStock) return; // 🚫 prevent click
        onClick(product);
      }}
        >
        <div className="pos-card__badge">{product.category}</div>
                <h4 className="pos-card__title">{product.name}</h4>
                <p className="pos-card__price">₱{product.price}</p>
                
                {isOutOfStock && <div className="product-card__badge">Out of Stock</div>}
        </div>
    );
  };

export default ProductCard;