import { useEffect, useState } from "react";

import { getProducts } from "../services/product.js";

import { checkout } from "../services/sales.js";

import ProductCard from "../components/retail/ProductCard.jsx";

const POS = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

const categories = [
  "All",
  ...new Set(products.map((p) => p.category))
];

const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });




        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
    useEffect(() => {
        fetchProducts();
    }, []);

  


    const handleClick = (product) => {
        setCart((prev) => { 
          const exists = prev.find((item) => item.id === product.id);

            // check if stock is 0 before adding to cart
            if (product.stock === 0) {
              alert('Out of stock');
              return prev;
            }

          if (exists) {
            // check stock before increasing quantity
            if (exists.quantity >= product.stock) {
              alert('Not enough stock');
              return prev;
            }
            
            // increase quantity
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );



          } else {
            return [...prev, { ...product, quantity: 1 }];
            
          }
        });
    };

      const getTotal = () => {
            return cart.reduce
            ((total, item) => total + item.price * item.quantity, 0);
    };

const decreaseQty = (id) => {
    setCart((prev) => {

      const exists = prev.find((item) => item.id === id);

      if (!exists) return prev;


      // remove item
      if (exists.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }


      // decrease quantity
      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

       
  const removeItem = (id) => {
    setCart((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleCheckout = async () => {

    // check if cart is empty
    if (cart.length === 0) {
      alert ("Cart is empty");
      return;
    }

    // checkout cart
    try {
      const data = await checkout({
        cart,
        total: getTotal(),
      });

      setCart([]);

      await fetchProducts();

      alert(`Checkout successful! Order ID: ${data.id}`);

    }catch (err) {
      console.error(err);
      alert(err.message);
    }
  };



return (
  <div className="pos-layout">
    
    {/* LEFT: PRODUCTS */}
    <div className="pos-layout__products">
      <div className="pos-page__hero">
        <p className="pos-page__eyebrow">Point Of Sale</p>
        <h1 className="pos-page__title">Products</h1>
      </div>

      <div className="pos-toolbar">
        <div className="pos-search-wrap">
          <input
            type="text"
            className="pos-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="pos-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pos-categories__button ${activeCategory === cat ? "pos-categories__button--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* PRODUCTS GRID */}
      <div className="pos-grid">
        {filteredProducts.map((product) => (
                <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleClick}
                />
        ))}
      </div>
    </div>

    {/* RIGHT: CART */}
    <div className="pos-cart">
      <h2 className="pos-cart__title">Cart</h2>

      {cart.length === 0 && <p className="pos-cart__empty">No items</p>}

      {cart.map((item) => (
        <div key={item.id} className="pos-cart__item">

        <div className="pos-cart__item-name">
             <strong>{item.name}</strong>
        </div>

        <div className="pos-cart__item-total">
            ₱{item.price} x {item.quantity} = ₱{item.price * item.quantity}
        </div>

        <div className="pos-cart__actions">
            <button className="pos-cart__button" onClick={() => decreaseQty(item.id)}>-</button>
            <button className="pos-cart__button" onClick={() => handleClick(item)} disabled={item.quantity >= item.stock}>
                +
            </button>
            <button className="pos-cart__button pos-cart__button--remove" onClick={() => removeItem(item.id)}>x</button>
        </div>

        </div>
      ))}

      <h3>Total: ₱{getTotal()}</h3>

      <button 
          className="pos-cart__checkout"
          onClick={handleCheckout}
          disabled={cart.length === 0}
          >
          Checkout
         
      </button>


    </div>

  </div>
);
};

export default POS
