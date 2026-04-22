import { useEffect, useState } from "react";
import { getProducts } from "../services/product.js";
import ProductList from "../components/retail/ProductList.jsx";
import ProductForm from "../components/retail/ProductForm.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search , setSearch] = useState('');


  const categories = [
  "All",
  ...new Set(products.map((p) => p.category))
];

//================================
// FILTER PRODUCTS BY CATEGORY
//================================

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

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="products-page">
      <div className="products-page__header">
        <div>
          <p className="products-page__eyebrow">Inventory</p>
          <h1 className="products-page__title">Products</h1>
        </div>
      </div>

        <div tyle={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
           
            <button
                className="products-page__add-button"
                onClick={() => setShowForm(true)}
            >
                Add Product
            </button>

            <input 
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "200px" }}
            />
            
        </div>

      <div className="products-page__tabs" role="tablist" aria-label="Product categories">
        {categories.map((cat) => (
            <button
                key={cat}
                type="button"
                className={`products-page__tab${
                  activeCategory === cat ? " products-page__tab--active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
            >
                {cat}
            </button>
        ))}
      </div>

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchProducts}
        />
      )}

      {editProduct && (
        <ProductForm
          initialData={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={fetchProducts}
        />
      )}

      <ProductList
            products={filteredProducts}
            onEdit={setEditProduct}
            onDelete={fetchProducts}
          />
    </div>
  );
};

export default ProductPage;
