import { useEffect, useState } from "react";
import { getProducts } from "../services/product.js";
import ProductList from "../components/retail/ProductList.jsx";
import ProductForm from "../components/retail/ProductForm.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / rowsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="products-page">
      <div className="products-page__header">
        <div>
          <p className="products-page__eyebrow">Inventory</p>
          <h1 className="products-page__title">Products</h1>
        </div>
      </div>

      <div className="products-page__toolbar">
        <button
          className="products-page__add-button"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>

        <div className="products-page__search-wrap">
          <input
            className="products-page__search-input"
            type="text"
            placeholder="Search product name or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
        products={paginatedProducts}
        onEdit={setEditProduct}
        onDelete={fetchProducts}
      />

      <div className="products-page__pagination">
        <p className="products-page__pagination-text">
          Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}
          {" "}-{" "}
          {Math.min(currentPage * rowsPerPage, filteredProducts.length)} of {filteredProducts.length}
        </p>

        <div className="products-page__pagination-actions">
          <button
            type="button"
            className="products-page__page-button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="products-page__page-indicator">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className="products-page__page-button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
