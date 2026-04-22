import { useEffect, useState } from "react";

import { getProducts } from "../services/product.js";

const POS = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect (() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const handleClick = (product) => {
        setCart((prev) => [...prev, product]);
    };


return (
  <div style={{ display: "flex", gap: "20px" }}>
    
    {/* LEFT: PRODUCTS */}
    <div style={{ flex: 2 }}>
      <div className="pos-page__hero">
        <p className="pos-page__eyebrow">Point Of Sale</p>
        <h1 className="pos-page__title">Products</h1>
      </div>

      <div className="pos-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="pos-card"
            onClick={() => handleClick(product)}
          >
            <div className="pos-card__badge">{product.category}</div>
            <h4 className="pos-card__title">{product.name}</h4>
            <p className="pos-card__price">₱{product.price}</p>
            <small className="pos-card__stock">
              {product.stock} in stock
            </small>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT: CART */}
    <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items</p>}

      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ₱{item.price}
        </div>
      ))}
    </div>

  </div>
);
};

export default POS
